// server.js
//run dev server for just server
//run dev:all to run both server and frontend

import express from "express";
import axios from "axios";
import cors from "cors";
import xml2js from "xml2js";


const app = express();

app.use(cors());
app.use(express.json());
app.use((req, _res, next) => { console.log("[server]", req.method, req.url); next(); });


function parseAndSortSoils(reportJSON) {
  try {
    const tbody = reportJSON?.section?.table?.[0]?.tbody?.[0];
    const rows = tbody?.tr || [];
    const soils = [];
    for (const row of rows) {
      if (row.$?.class === "mapunit") {
        const cell = row.td?.[0];
        const text = cell?.para?.[0]?._ || "";
        const symbol = text.split("--")[0]?.trim();
        const desc = text.split("--")[1]?.trim() || "";
        const acresText = row.td?.[1]?.para?.[0]?._ || "";
        const acres = parseFloat(acresText.replace(/,/g, "")) || 0;
        soils.push({ symbol, desc, acres });
      }
    }
    soils.sort((a, b) => b.acres - a.acres);
    return soils.length ? soils : null;
  } catch {
    return null;
  }
}

app.get("/", (_req, res) => res.send("Soil API running"));

// ✅ Use client-provided GeoJSON
app.post("/soil", async (req, res) => {
  try {
    const geojson = req.body?.geojson;
    if (!geojson) {
      return res.status(400).json({ error: "Missing body.geojson" });
    }

    // Optional: quick sanity checks
    // - polygon rings must be [ [lng,lat], ... ] and closed
    // - FeatureCollection with one Polygon
    const url = "https://sdmdataaccess.sc.egov.usda.gov/Tabular/post.rest";

    // 1) Create AOI from client GeoJSON
    const aoiResp = await axios.post(
      url,
      { SERVICE: "aoi", REQUEST: "create", AOICOORDS: JSON.stringify(geojson) },
      { headers: { "Content-Type": "application/json" } }
    );
    const AOIID = aoiResp.data?.id;
    if (!AOIID) return res.status(502).json({ error: "AOI creation failed", raw: aoiResp.data });

    // 2) Get catalog and pick "Component Legend"
    const catalog = await axios.post(
      url,
      { SERVICE: "report", REQUEST: "getcatalog", AOIID },
      { headers: { "Content-Type": "application/json" } }
    );
    const folders = catalog.data?.tables?.[0]?.folders;
    if (!folders) return res.status(502).json({ error: "Invalid catalog format", raw: catalog.data });

    let selected = null;
    for (const folder of folders) {
      const found = folder.reports.find(r =>
        r.reportname.toLowerCase().includes("component legend")
      );
      if (found) { selected = found; break; }
    }
    if (!selected) selected = folders[0].reports[0];
    const REPORTID = selected.reportid;

    // 3) Get report data (short form)
    const reportDataResp = await axios.post(
      url,
      { SERVICE: "report", REQUEST: "getreportdata", REPORTID, AOIID, FORMAT: "short" },
      { headers: { "Content-Type": "application/json" } }
    );
    const REPORTDATA = reportDataResp.data;
    if (!REPORTDATA) return res.status(502).json({ error: "Failed to fetch report data", raw: reportDataResp.data });

    // 4) Run report -> XML
    const reportResp = await axios.post(
      url,
      { SERVICE: "report", REQUEST: "getreport", SHORTFORMDATA: JSON.stringify(REPORTDATA) },
      { headers: { "Content-Type": "application/json" } }
    );
    const REPORTXML = reportResp.data;
    if (!REPORTXML) return res.status(502).json({ error: "Failed to fetch report", raw: reportResp.data });

    // 5) XML->JSON, parse soils and return
    const REPORTJSON = await xml2js.parseStringPromise(REPORTXML);
    const soils = parseAndSortSoils(REPORTJSON);
    if (!soils) return res.status(502).json({ error: "Failed to parse soils" });

    // Always return JSON the client can consume
    res.status(200).json({ topSoil: soils[0], soils });
  } catch (err) {
    const details = err.response?.data || err.message || String(err);
    console.error("SDA ERROR:", details);
    res.status(500).json({ error: "Server error", details });
  }
});

app.get("/soil", (_req, res) => {
  // just a test endpoint so GET /soil returns 200
  res.json({ ok: true, via: "proxy", method: "GET" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

