import json
import os
import random
import time
from pathlib import Path
from typing import *

import requests
from puts import get_logger

from utils import decode_polyline

LOG = get_logger()

# get API key from environment variable
API_KEY = os.environ.get("GOOGLE_API_KEY") or ""

if not API_KEY:
    LOG.error("[ERROR] API Key not set")
    exit(1)


def query_route(
    origin: Tuple[float, float], destination: Tuple[float, float]
) -> Tuple[str, dict]:
    """
    Query Google Maps API for route between two points (in lat,lng representation).

    Args:
        origin: (lat,lng) of origin point
        destination: (lat,lng) of destination point

    Returns:
        Encoded Polyline string
        Metadata dict
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
            routes: List[dict] = response_json.get("routes")
            if routes:
                route: dict = routes[0]
                overview_polyline = route.get("overview_polyline")
                encoded_polyline_str = overview_polyline.get("points")
                # get metadata about this route
                meta = {}
                legs: List[dict] = route.get("legs")
                if legs:
                    leg: dict = legs[0]
                else:
                    leg = {}
                meta["distance"] = leg.get("distance")
                meta["duration"] = leg.get("duration")
                meta["end_address"] = leg.get("end_address")
                meta["end_location"] = leg.get("end_location")
                meta["start_address"] = leg.get("start_address")
                meta["start_location"] = leg.get("start_location")

                return encoded_polyline_str, meta
            else:
                LOG.error("[ERROR] No routes found")
        else:
            LOG.error(f"[ERROR] Response Payload Status: {status}")
    else:
        LOG.error(f"[ERROR] HTTP Status: {response.status_code}")

    return (None, None)


def main():
    for filename in os.listdir("./data"):
        export_path = f"./data/routes_{filename}"

        if not filename.endswith(".json"):
            continue

        if filename.startswith("routes_"):
            continue

        if Path(export_path).exists():
            LOG.info(f"[SKIP] {export_path} already exists")
            continue

        with open(f"./data/{filename}", "r") as f:
            LOG.info(f"[PROCESSING] {filename}")
            data: dict = json.load(f)

        routes = []
        for sample_number in data:
            sample_routes = {
                "coordinates": [],
                "ploylines": [],
                "metadata": [],
            }
            points = data.get(sample_number)
            random.shuffle(points)
            while points:
                origin = points.pop()
                destination = points.pop()
                origin = (origin["lat"], origin["lng"])
                destination = (destination["lat"], destination["lng"])

                encoded_polyline_str, meta = query_route(origin, destination)
                if encoded_polyline_str:
                    coords = decode_polyline(encoded_polyline_str)
                    sample_routes["coordinates"].append(coords)
                    sample_routes["ploylines"].append(encoded_polyline_str)
                    sample_routes["metadata"].append(meta)

            routes.append(sample_routes)

        with open(export_path, "w") as f:
            json.dump(routes, f)
            LOG.info(f"Saved routes to {export_path}")
            # sleep for a while to avoid Google API rate limit
            time.sleep(60)

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
