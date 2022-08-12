import React from "react";
import {
    MapContainer,
    TileLayer,
    CircleMarker,
    Polyline,
    // Popup,
} from "react-leaflet";

import {
    multiPolyline0,
    multiPolyline1,
    multiPolyline2,
    multiPolyline3,
    multiPolyline4,
    multiPolyline5,
} from "../assets/routes/RoutesSG";
import { PointsSG } from "../assets/points/PointsSG";

const multiPolyLines = [
    multiPolyline0,
    multiPolyline1,
    multiPolyline2,
    multiPolyline3,
    multiPolyline4,
    multiPolyline5,
];

function shuffle(array: any[]): any[] {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}

// get API KEY from environment variable
const API_KEY = process.env.STADIA_API_KEY || "";

const Mapper = () => {
    let commutePolyLines =
        multiPolyLines[Math.floor(Math.random() * multiPolyLines.length)];
    commutePolyLines = shuffle(commutePolyLines);
    commutePolyLines = commutePolyLines.slice(0, commutePolyLines.length / 2);

    let walkingPolyLines =
        multiPolyLines[Math.floor(Math.random() * multiPolyLines.length)];
    walkingPolyLines = shuffle(walkingPolyLines);
    walkingPolyLines = walkingPolyLines.slice(0, walkingPolyLines.length / 3);

    let drivingPolyLines =
        multiPolyLines[Math.floor(Math.random() * multiPolyLines.length)];
    drivingPolyLines = shuffle(drivingPolyLines);
    drivingPolyLines = drivingPolyLines.slice(0, drivingPolyLines.length / 4);

    let points = shuffle(PointsSG);
    points = points.slice(0, points.length / 8);

    return (
        <div
            className="m-3 rounded-full overflow-clip ring-4 ring-cyan-500/20 hover:ring-cyan-500"
            style={{ minHeight: 500 }}
        >
            <MapContainer
                className="w-full h-full"
                center={[1.3599654500769531, 103.81338414844132]}
                zoom={12}
                scrollWheelZoom={true}
                zoomControl={false}
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

                {points.map((point, index) => {
                    // random radius
                    const radius = Math.random() * (20 - 1) + 1;
                    return (
                        <CircleMarker
                            key={index}
                            center={point}
                            pathOptions={{
                                fillColor: "blue",
                            }}
                            radius={radius}
                        >
                            {/* <Popup>Popup in CircleMarker</Popup> */}
                        </CircleMarker>
                    );
                })}

                {commutePolyLines.map((ployLine, index) => {
                    return (
                        <Polyline
                            key={index}
                            pathOptions={{
                                color: "#3a86ff", // blue
                                opacity: 0.3,
                                weight: 3,
                            }}
                            positions={ployLine}
                        />
                    );
                })}

                {walkingPolyLines.map((ployLine, index) => {
                    return (
                        <Polyline
                            key={index}
                            pathOptions={{
                                color: "#fb5607", // orange
                                opacity: 0.3,
                                weight: 3,
                            }}
                            positions={ployLine}
                        />
                    );
                })}

                {drivingPolyLines.map((ployLine, index) => {
                    return (
                        <Polyline
                            key={index}
                            pathOptions={{
                                color: "#8338ec", // purple
                                opacity: 0.3,
                                weight: 3,
                            }}
                            positions={ployLine}
                        />
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default Mapper;
