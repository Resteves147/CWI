import  { useEffect } from 'react';
import './map.css';
import { Link } from "react-router-dom";
import { useState } from "react";



async function fetchSoil(geojson){
    const url = '/soil';
    console.log("[fetchSoil] origin:", window.location.origin, "url:", url);

    let res;
    try{
        res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ geojson }),
        });
    } catch(err){
        console.error("[fetchSoil] Network error:", err);
        throw err;
    }
    
    const text = await res.text();
    if(!res.ok){
        console.error("[fetchSoil] HTTP error:", res.status, res.statusText, text);
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    try{
        return JSON.parse(text);
    } catch(err){
        console.error("[fetchSoil] JSON parse error:", err);
        throw new Error(`Invalid JSON: ${text}`);
    }
}

const Map = () =>{
    const [rectangleData, setRectangleData] = useState(null);
        const [topSoil, setTopSoil] = useState("");
   
    useEffect(() => {
        
        const L = window.L;
        if(!L) return;
        
        const map = L.map('map').setView([36.7378, -119.7871], 12);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

    
        const drawnItems = L.featureGroup().addTo(map);

        const drawPolygon = new L.Control.Draw({
            draw: {
                    rectangle: {
                        shapeOptions: {
                            color: 'blue',
                            weight: 2,
                            fillOpacity: 0.2,
                        },
                    },
                    polygon: false,
                    polyline: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                },
            edit: {
                featureGroup: drawnItems,
                edit: true,
                remove: true,
            }
        });

        map.addControl(drawPolygon);

        map.on("draw:drawstart", () => {
            console.log("Drawing started");
        });

        map.on("draw:drawstop", () => {
            console.log("Drawing stopped");
        });

        map.on("draw:created", async (e) => {
            const layer = e.layer;
            drawnItems.addLayer(layer);
            
            if(e.layerType !== 'rectangle') return;

            const b = layer.getBounds();
            const sw = b.getSouthWest();
            const ne = b.getNorthEast();
            const nw = L.latLng(ne.lat, sw.lng);
            const se = L.latLng(sw.lat, ne.lng);
               
            const longMeters = nw.distanceTo(ne); // meters
            const shortMeters = nw.distanceTo(se); // meters

            const longSide = longMeters * 3.28084; // feet
            const shortSide = shortMeters * 3.28084; // feet

            const area = longSide * shortSide;
            const areaAcres = area / 43560;

            const fmt = (p) => `${p.lat.toFixed(6)}, ${p.lng.toFixed(6)}`;
            setRectangleData({
                longSide,
                shortSide,
                areaAcres,

            });
            const corners = [nw, ne, se, sw];
            console.log("corners: ", corners);

            const ring =[...corners, nw].map(p => [p.lng, p.lat]);

            const geojson = {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        properties: { 
                        name: "Rectangle",
                        longSide,
                        shortSide,
                        areaAcres,
                        },
                        geometry: { type: "Polygon", coordinates: [ring] }
                    }
                ]
            };

            //POST
            try{
                const data = await fetchSoil(geojson);
                console.log("[map] Received data:", data);
                const topSoilObj = data.topSoil || data.topsoil;
                const topSoil = topSoilObj?.symbol || (typeof topSoilObj === 'string' ? topSoilObj : 'Unknown');
                //set the top soil
                setTopSoil(topSoilObj);
                const html = `
                <b>Rectangle</b><br/>
                Long: ${longSide.toFixed(1)} ft<br/>
                Short: ${shortSide.toFixed(1)} ft<br/>
                Area: ${areaAcres.toFixed(2)} acres<br/>
                Soil: <b>${topSoil}</b><br/><br/>
                <b>Corners</b><br/>
                NW: ${fmt(nw)}<br/>
                NE: ${fmt(ne)}<br/>
                SE: ${fmt(se)}<br/>
                SW: ${fmt(sw)}
                `; 
                layer.bindPopup(html).openPopup();
            } catch(err) {
                    console.error("[map] Error fetching soil:", err);
                    const errorMsg = err.message || "Soil lookup failed";
                    layer.bindPopup(`<b>Error</b><br/>${errorMsg}`).openPopup();
                }

            

            drawPolygon._toolbars.draw._modes.rectangle.handler.disable();
        });

        map.on("draw:edited", (e) =>{
            console.log("edited", drawnItems.toGeoJSON());
        });
        map.on("draw:deleted", (e) =>{
            console.log("deleted", drawnItems.toGeoJSON());
        });

        return () => map?.remove();

    }, []);

    return (
        <div>
            <h1>Map</h1>
            <p>This is an interactive map that allows you to draw a rectangle on your desired property and get the soil type and acreage of the area.</p>
            <p>Please use the mouse to click and draw to your desired property.</p>
            <p>The square button on the side will allow you to draw a rectangle anywhere on the map.</p>
            <p>Once you drawn the rectangle, please click the button at the bottom of the map to continue the process.</p>
            <div id="map" />
            <Link to="/form"
                state ={ {rectangleData, topSoil}}>
                <button className="calc">
                    Continue
                </button>
            </Link>
            
        </div>
    );
};

export default Map;