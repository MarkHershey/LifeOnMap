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
        <div className="m-3 border-5 border-blue-800 w-10 h-10 bg-slate-600">
            {/* <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Polyline pathOptions={limeOptions} positions={polyline} />
                <Polyline pathOptions={limeOptions} positions={multiPolyline} />
            </MapContainer> */}
        </div>
    );
}

export default App;
