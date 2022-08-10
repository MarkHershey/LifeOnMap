import math


def utmToLatLng(zone, easting, northing, northernHemisphere=True):
    """
    UTM to Lat/Long conversion
    :param zone: UTM zone
    :param easting: Easting (X) in meters
    :param northing: Northing (Y) in meters
    :param northernHemisphere: True if northern hemisphere, False if southern

    Ref: https://stackoverflow.com/a/344083
    """
    if not northernHemisphere:
        northing = 10000000 - northing

    a = 6378137
    e = 0.081819191
    e1sq = 0.006739497
    k0 = 0.9996

    arc = northing / k0
    mu = arc / (
        a
        * (
            1
            - math.pow(e, 2) / 4.0
            - 3 * math.pow(e, 4) / 64.0
            - 5 * math.pow(e, 6) / 256.0
        )
    )

    ei = (1 - math.pow((1 - e * e), (1 / 2.0))) / (1 + math.pow((1 - e * e), (1 / 2.0)))

    ca = 3 * ei / 2 - 27 * math.pow(ei, 3) / 32.0

    cb = 21 * math.pow(ei, 2) / 16 - 55 * math.pow(ei, 4) / 32
    cc = 151 * math.pow(ei, 3) / 96
    cd = 1097 * math.pow(ei, 4) / 512
    phi1 = (
        mu
        + ca * math.sin(2 * mu)
        + cb * math.sin(4 * mu)
        + cc * math.sin(6 * mu)
        + cd * math.sin(8 * mu)
    )

    n0 = a / math.pow((1 - math.pow((e * math.sin(phi1)), 2)), (1 / 2.0))

    r0 = a * (1 - e * e) / math.pow((1 - math.pow((e * math.sin(phi1)), 2)), (3 / 2.0))
    fact1 = n0 * math.tan(phi1) / r0

    _a1 = 500000 - easting
    dd0 = _a1 / (n0 * k0)
    fact2 = dd0 * dd0 / 2

    t0 = math.pow(math.tan(phi1), 2)
    Q0 = e1sq * math.pow(math.cos(phi1), 2)
    fact3 = (5 + 3 * t0 + 10 * Q0 - 4 * Q0 * Q0 - 9 * e1sq) * math.pow(dd0, 4) / 24

    fact4 = (
        (61 + 90 * t0 + 298 * Q0 + 45 * t0 * t0 - 252 * e1sq - 3 * Q0 * Q0)
        * math.pow(dd0, 6)
        / 720
    )

    lof1 = _a1 / (n0 * k0)
    lof2 = (1 + 2 * t0 + Q0) * math.pow(dd0, 3) / 6.0
    lof3 = (
        (5 - 2 * Q0 + 28 * t0 - 3 * math.pow(Q0, 2) + 8 * e1sq + 24 * math.pow(t0, 2))
        * math.pow(dd0, 5)
        / 120
    )
    _a2 = (lof1 - lof2 + lof3) / math.cos(phi1)
    _a3 = _a2 * 180 / math.pi

    latitude = 180 * (phi1 - fact1 * (fact2 + fact3 + fact4)) / math.pi

    if not northernHemisphere:
        latitude = -latitude

    longitude = ((zone > 0) and (6 * zone - 183.0) or 3.0) - _a3

    return (latitude, longitude)


def decode_polyline(polyline_str):
    """Decodes a polyline string into a list of lat/lon pairs

    Ref: https://stackoverflow.com/a/33557535
    """
    index, lat, lng = 0, 0, 0
    coordinates = []
    changes = {"latitude": 0, "longitude": 0}

    # Coordinates have variable length when encoded, so just keep
    # track of whether we've hit the end of the string. In each
    # while loop iteration, a single coordinate is decoded.
    while index < len(polyline_str):
        # Gather lat/lon changes, store them in a dictionary to apply them later
        for unit in ["latitude", "longitude"]:
            shift, result = 0, 0

            while True:
                byte = ord(polyline_str[index]) - 63
                index += 1
                result |= (byte & 0x1F) << shift
                shift += 5
                if not byte >= 0x20:
                    break

            if result & 1:
                changes[unit] = ~(result >> 1)
            else:
                changes[unit] = result >> 1

        lat += changes["latitude"]
        lng += changes["longitude"]

        coordinates.append((lat / 100000.0, lng / 100000.0))

    return coordinates


if __name__ == "__main__":
    coords = decode_polyline(
        "whdG_shyRD`@n@MzBk@dCk@l@lCHt@nAWFFR`AF^JB\\JTLVb@Nd@T?f@?Pr@Af@GRETC\\DX`@bABP@X@^?dAGn@?NDPBDm@JM@{@@"
    )
    print(coords)
