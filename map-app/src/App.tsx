import { LatLngExpression } from "leaflet";
import {
    MapContainer,
    TileLayer,
    // useMap,
    // Circle,
    // CircleMarker,
    Polyline,
    // Polygon,
    // Rectangle,
    // Popup,
} from "react-leaflet";

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

function App() {
    return (
        <div className="w-full h-full">
            <MapContainer
                className=" border border-red-500 w-full h-full"
                style={{ height: "500px", width: "500px" }}
                center={center}
                zoom={13}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution="OpenStreetMap"
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                />

                <Polyline pathOptions={limeOptions} positions={polyline} />
                <Polyline pathOptions={limeOptions} positions={multiPolyline} />
            </MapContainer>
        </div>
    );
}

export default App;
