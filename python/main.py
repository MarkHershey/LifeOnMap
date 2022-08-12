import json
from pathlib import Path
from typing import *

import osmnx as ox

from utils import utmToLatLng


def main(
    place: str = "Piedmont, California, USA",
    northernHemisphere: bool = True,
    outpath: Optional[Union[str, Path]] = None,
    num_points: int = 256,
    num_samples: int = 20,
) -> None:
    """
    Args:
        place: str
            Place to search for
        northernHemisphere: bool
            True if northern hemisphere, False if southern
        outpath: Optional[Union[str, Path]]
            Path to output file, if None, output name is same as place
        num_points: int
            Number of points to sample, default is 256
        num_samples: int
            Number of samples to take, default is 20

    Returns:
        None

    Raises:
        None
    """

    if outpath is None:
        outpath = Path(__file__).parent / "data" / f"{place}.json"
    else:
        outpath = Path(outpath)

    if outpath.parent.exists() is False:
        outpath.parent.mkdir(parents=True)

    # assert outpath.is_file() == False, f"{outpath} already exists"
    if outpath.is_file():
        print(f"[SKIP] {outpath} already exists")
        return None

    # check if graph is already cached
    cache_file = Path(__file__).parent / "data" / f"{place}.graphml"
    if cache_file.is_file():
        print(f"Loading cached graph from {cache_file}")
        G = ox.load_graphml(cache_file)
    else:
        try:
            print(f"Query graph for: {place}")
            G = ox.graph_from_place(place)
            # save the graph to disk
            ox.save_graphml(G, cache_file)
        except Exception as e:
            print("[ERROR]", e)
            return None

    Gp = ox.project_graph(G)

    # visualize the graph
    # fig, ax = ox.plot_graph(G)

    samples = {}

    for i in range(num_samples):
        points = ox.utils_geo.sample_points(ox.get_undirected(Gp), num_points)

        crs = str(points.crs)
        assert "utm" in crs
        zone = int(crs.split()[1].split("=")[-1])
        # print("zone:", zone)

        points_list = []

        for point in points:
            coords = point.coords[:][0]
            easting, northing = coords
            lat, lng = utmToLatLng(
                zone=zone,
                easting=easting,
                northing=northing,
                northernHemisphere=northernHemisphere,
            )
            points_list.append({"lat": lat, "lng": lng})

        samples[i] = points_list

    # Write to file
    with outpath.open(mode="w") as f:
        json.dump(samples, f)
        print("Result saved to", outpath)

    return None


if __name__ == "__main__":
    ...
    # main()
    # main(place="Pulau Ubin, Singapore", northernHemisphere=True)
    # main(place="Bedok, Singapore", northernHemisphere=True)
    # main(place="Punggol, Singapore", northernHemisphere=True)
    # main(place="Paya Lebar, Singapore", northernHemisphere=True)
    # main(place="Jurong East, Singapore", northernHemisphere=True)
    # main(place="Zhonghe District, New Taipei City, Taiwan", northernHemisphere=True)
    # main(place="Luzhou District, New Taipei City, Taiwan", northernHemisphere=True)
    # main(place="Mong Kok, Hong Kong", northernHemisphere=True)
    # main(place="Causeway Bay, Hong Kong", northernHemisphere=True)
    # main(place="Hong Kong", northernHemisphere=True)
    # main(place="Singapore", northernHemisphere=True)
    # main(place="Tokyo", northernHemisphere=True)
    # main(place="Shanghai", northernHemisphere=True)
    # main(place="Perth, Australia", northernHemisphere=False)
    main(
        place="Singapore",
        num_points=128,
        num_samples=6,
        outpath=Path(__file__).parent / "data" / f"SG.json",
    )
