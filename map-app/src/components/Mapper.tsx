import React from "react";
import { PathOptions } from "leaflet";
import {
    MapContainer,
    TileLayer,
    // useMap,
    // Circle,
    CircleMarker,
    Polyline,
    // Polygon,
    // Rectangle,
    Popup,
} from "react-leaflet";
import { PathData } from "../static/PathData";
import { multiPolyline0 } from "../static/routes/RoutesPulau";

const polyLineOptions: PathOptions = {
    color: "#54a9ff",
    opacity: 0.15,
    weight: 2,
};
const fillBlueOptions = { fillColor: "blue" };

// get API KEY from environment variable
const API_KEY = process.env.STADIA_API_KEY || "";

const Mapper = () => {
    return (
        <div className="m-3 rounded-full overflow-clip ring-4 ring-cyan-500/20 hover:ring-cyan-500">
            <MapContainer
                className="w-full h-full"
                center={multiPolyline0[0][0]}
                zoom={13}
                scrollWheelZoom={false}
                zoomControl={true}
                dragging={true}
                inertia={true}
            >
                <TileLayer
                    attribution=""
                    url={
                        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=" +
                        API_KEY
                    }
                />

                {PathData.map((point, index) => {
                    // random radius
                    const radius = Math.random() * (20 - 1) + 1;
                    return (
                        <CircleMarker
                            key={index}
                            center={point}
                            pathOptions={fillBlueOptions}
                            radius={radius}
                        >
                            <Popup>Popup in CircleMarker</Popup>
                        </CircleMarker>
                    );
                })}

                {/* <Polyline pathOptions={limeOptions} positions={PathData} /> */}
                {/* <Polyline
                    pathOptions={limeOptions}
                    positions={multiPolyline0}
                /> */}

                {multiPolyline0.map((ployLine, index) => {
                    return (
                        <Polyline
                            key={index}
                            pathOptions={polyLineOptions}
                            positions={ployLine}
                        />
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default Mapper;
