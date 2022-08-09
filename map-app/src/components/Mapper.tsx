import React from "react";
import { LatLngExpression } from "leaflet";
import {
    MapContainer,
    TileLayer,
    // useMap,
    Circle,
    CircleMarker,
    Polyline,
    // Polygon,
    // Rectangle,
    Popup,
} from "react-leaflet";
import { PathData } from "../static/PathData";

const center: LatLngExpression = [51.505, -0.09];

const polyline: LatLngExpression[] = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
];

const multiPolyline: LatLngExpression[][] = [
    [
        [51.5, -0.1],
        [51.5, -0.12],
        [51.52, -0.12],
    ],
    [
        [51.5, -0.05],
        [51.5, -0.06],
        [51.52, -0.06],
    ],
];
const limeOptions = { color: "lime" };
const fillBlueOptions = { fillColor: "blue" };

const Mapper = () => {
    return (
        <div className="border-4 border-cyan-500/30 m-3 rounded-lg overflow-clip">
            <MapContainer
                className="w-full h-full"
                center={PathData[0]}
                zoom={13}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution=""
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
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

                {/* <Polyline pathOptions={limeOptions} positions={PathData} />
                <Polyline pathOptions={limeOptions} positions={multiPolyline} /> */}
            </MapContainer>
        </div>
    );
};

export default Mapper;
