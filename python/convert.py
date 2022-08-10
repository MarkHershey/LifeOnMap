import json
from pathlib import Path
import os

project_root = Path(__file__).resolve().parent.parent


def points():
    OBJ_NAME = "PathData"
    OUTFILE = f"{OBJ_NAME}.ts"

    with open("data/Bedok, Singapore.json") as f:
        data = json.load(f)

    for idx, sample in data.items():
        obj = []
        for point in sample:
            lat, lng = point["lat"], point["lng"]
            obj.append([lat, lng])

        obj_str = json.dumps(obj)

        long_string = """import { LatLngExpression } from "leaflet";\n\n"""
        long_string = (
            long_string
            + f"""export const {OBJ_NAME}: LatLngExpression[] = {obj_str};"""
        )

        with open(OUTFILE, "w") as f:
            f.write(long_string)

        return


def routes():
    data_dir = project_root / "python/data"
    routes_dir: Path = project_root / "map-app/src/static/routes"
    routes_dir.mkdir(exist_ok=True)

    long_string = """import { LatLngExpression } from "leaflet";\n\n"""

    file_counter = 0

    for filename in os.listdir(data_dir):
        if not filename.startswith("routes_"):
            continue

        file_counter += 1
        area = filename.split()[0]
        area = area[7:]
        area = area.strip(",")

        routefile = data_dir / filename
        outfile = routes_dir / f"Routes{area}.ts"

        with open(routefile, "r") as f:
            data = json.load(f)

        for idx, sample in enumerate(data):
            OBJ_NAME = f"multiPolyline{idx}"
            coords = sample["coordinates"]
            obj_str = json.dumps(coords)
            long_string = (
                long_string
                + f"export const {OBJ_NAME}: LatLngExpression[][] = {obj_str};\n\n"
            )

        with open(outfile, "w") as f:
            f.write(long_string)
            print("Saved routes to", outfile)


if __name__ == "__main__":
    routes()
