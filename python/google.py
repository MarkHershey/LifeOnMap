import requests
from typing import Tuple
import json
from utils import decode_polyline
import os
import random
from pathlib import Path

API_KEY = ""


def query_route(origin: Tuple[float, float], destination: Tuple[float, float]) -> str:
    """
    Query Google Maps API for route between two points (in lat,lng representation).

    Args:
        origin: (lat,lng) of origin point
        destination: (lat,lng) of destination point

    Returns:
        Encoded Polyline string
    """
    ORIGIN = f"{origin[0]},{origin[1]}"
    DESTINATION = f"{destination[0]},{destination[1]}"
    MODE = "walking"

    url = f"https://maps.googleapis.com/maps/api/directions/json?origin={ORIGIN}&destination={DESTINATION}&mode={MODE}&key={API_KEY}"

    headers = {}
    payload = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    if response.status_code == 200:
        response_str = str(response.text)
        response_json = json.loads(response_str)
        status = response_json.get("status")
        if status == "OK":
            routes = response_json.get("routes")
            if routes:
                route = routes[0]
                overview_polyline = route.get("overview_polyline")
                encoded_polyline_str = overview_polyline.get("points")
                return encoded_polyline_str
            else:
                print("[ERROR] No routes found")
        else:
            print(f"[ERROR] Response Payload Status: {status}")
    else:
        print(f"[ERROR] HTTP Status: {response.status_code}")

    return None


def main():
    for filename in os.listdir("./data"):
        export_path = f"./data/routes_{filename}"

        if not filename.endswith(".json"):
            continue

        if Path(export_path).exists():
            print(f"[SKIP] {export_path} already exists")
            continue

        with open(f"./data/{filename}", "r") as f:
            data: dict = json.load(f)

        routes = []
        for sample_number in data:
            sample_routes = {
                "coordinates": [],
                "ploylines": [],
            }
            points = data.get(sample_number)
            random.shuffle(points)
            while points:
                origin = points.pop()
                destination = points.pop()
                origin = (origin["lat"], origin["lng"])
                destination = (destination["lat"], destination["lng"])

                encoded_polyline_str = query_route(origin, destination)
                if encoded_polyline_str:
                    coords = decode_polyline(encoded_polyline_str)
                    sample_routes["coordinates"].append(coords)
                    sample_routes["ploylines"].append(encoded_polyline_str)

            routes.append(sample_routes)

        with open(export_path, "w") as f:
            json.dump(routes, f)
            print(f"Saved routes to {export_path}")
            return

    return


def test():
    encoded_polyline_str = query_route(
        (1.3379086820190478, 103.92383799919686),
        (1.3349850399548961, 103.9197125504436),
    )
    coords = decode_polyline(encoded_polyline_str)
    print(coords)


if __name__ == "__main__":
    main()
