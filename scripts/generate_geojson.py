#!/usr/bin/env python3
"""
Generate Bihar GeoJSON files:
1. bihar-districts.geojson - All 38 district polygons with properties
2. bihar-outline.geojson - State boundary outline

Coordinates are [longitude, latitude] (GeoJSON standard).
Bihar bounding box: ~83.3-88.2°E, ~24.0-27.5°N

Districts are defined with 5-8 vertex simplified polygons that approximate
actual district boundaries. Adjacent districts share approximate boundary
segments. The overall shape represents Bihar accurately.
"""

import json
import os

# ============================================================
# District definitions: id, name, nameHi, division, population
# (Census 2011), area (sq km), and simplified polygon coords.
# ============================================================

districts = [
    # ==================== TIRHUT DIVISION ====================
    {
        "id": "west-champaran",
        "name": "West Champaran",
        "nameHi": "पश्चिम चम्पारण",
        "division": "Tirhut",
        "population": 3935042,
        "area": 5228,
        "coords": [
            [83.72, 27.10], [84.18, 27.52], [84.68, 27.32],
            [84.82, 26.88], [84.62, 26.52], [84.28, 26.38],
            [83.82, 26.40], [83.55, 26.72], [83.72, 27.10]
        ]
    },
    {
        "id": "east-champaran",
        "name": "East Champaran",
        "nameHi": "पूर्वी चम्पारण",
        "division": "Tirhut",
        "population": 5099371,
        "area": 3968,
        "coords": [
            [84.62, 26.52], [84.82, 26.88], [84.68, 27.32],
            [85.18, 27.10], [85.32, 26.78], [85.28, 26.40],
            [84.95, 26.22], [84.62, 26.32], [84.62, 26.52]
        ]
    },
    {
        "id": "sitamarhi",
        "name": "Sitamarhi",
        "nameHi": "सीतामढ़ी",
        "division": "Tirhut",
        "population": 3423574,
        "area": 2199,
        "coords": [
            [85.28, 26.40], [85.32, 26.78], [85.18, 27.10],
            [85.52, 26.95], [85.85, 26.82], [85.95, 26.55],
            [85.78, 26.32], [85.50, 26.30], [85.28, 26.40]
        ]
    },
    {
        "id": "sheohar",
        "name": "Sheohar",
        "nameHi": "शिवहर",
        "division": "Tirhut",
        "population": 656916,
        "area": 443,
        "coords": [
            [85.28, 26.40], [85.50, 26.30], [85.55, 26.52],
            [85.50, 26.62], [85.32, 26.58], [85.28, 26.40]
        ]
    },
    {
        "id": "muzaffarpur",
        "name": "Muzaffarpur",
        "nameHi": "मुज़फ़्फ़रपुर",
        "division": "Tirhut",
        "population": 4801062,
        "area": 3173,
        "coords": [
            [85.05, 25.88], [84.95, 26.22], [85.28, 26.40],
            [85.55, 26.52], [85.50, 26.30], [85.78, 26.32],
            [85.72, 25.98], [85.42, 25.82], [85.05, 25.88]
        ]
    },
    {
        "id": "vaishali",
        "name": "Vaishali",
        "nameHi": "वैशाली",
        "division": "Tirhut",
        "population": 3495021,
        "area": 2036,
        "coords": [
            [84.88, 25.62], [84.95, 26.22], [85.05, 25.88],
            [85.42, 25.82], [85.38, 25.60], [85.18, 25.52],
            [84.88, 25.62]
        ]
    },

    # ==================== SARAN DIVISION ====================
    {
        "id": "gopalganj",
        "name": "Gopalganj",
        "nameHi": "गोपालगंज",
        "division": "Saran",
        "population": 2562012,
        "area": 2033,
        "coords": [
            [83.82, 26.40], [84.28, 26.38], [84.32, 26.18],
            [84.18, 25.98], [83.78, 25.92], [83.58, 26.12],
            [83.82, 26.40]
        ]
    },
    {
        "id": "siwan",
        "name": "Siwan",
        "nameHi": "सिवान",
        "division": "Saran",
        "population": 3330464,
        "area": 2219,
        "coords": [
            [84.18, 25.98], [84.32, 26.18], [84.28, 26.38],
            [84.62, 26.32], [84.62, 26.08], [84.52, 25.88],
            [84.28, 25.82], [84.18, 25.98]
        ]
    },
    {
        "id": "saran",
        "name": "Saran",
        "nameHi": "सारण",
        "division": "Saran",
        "population": 3951862,
        "area": 2641,
        "coords": [
            [84.52, 25.88], [84.62, 26.08], [84.62, 26.32],
            [84.95, 26.22], [84.88, 25.62], [84.60, 25.58],
            [84.52, 25.88]
        ]
    },

    # ==================== DARBHANGA DIVISION ====================
    {
        "id": "darbhanga",
        "name": "Darbhanga",
        "nameHi": "दरभंगा",
        "division": "Darbhanga",
        "population": 3937385,
        "area": 2279,
        "coords": [
            [85.72, 25.98], [85.78, 26.32], [85.95, 26.55],
            [86.22, 26.38], [86.25, 26.08], [86.08, 25.85],
            [85.72, 25.98]
        ]
    },
    {
        "id": "madhubani",
        "name": "Madhubani",
        "nameHi": "मधुबनी",
        "division": "Darbhanga",
        "population": 4487379,
        "area": 3501,
        "coords": [
            [85.95, 26.55], [85.85, 26.82], [86.10, 26.88],
            [86.52, 26.72], [86.72, 26.48], [86.60, 26.15],
            [86.25, 26.08], [86.22, 26.38], [85.95, 26.55]
        ]
    },
    {
        "id": "samastipur",
        "name": "Samastipur",
        "nameHi": "समस्तीपुर",
        "division": "Darbhanga",
        "population": 4261566,
        "area": 2904,
        "coords": [
            [85.42, 25.82], [85.72, 25.98], [86.08, 25.85],
            [86.12, 25.58], [85.90, 25.42], [85.55, 25.38],
            [85.38, 25.60], [85.42, 25.82]
        ]
    },

    # ==================== KOSI DIVISION ====================
    {
        "id": "supaul",
        "name": "Supaul",
        "nameHi": "सुपौल",
        "division": "Kosi",
        "population": 2229076,
        "area": 2410,
        "coords": [
            [86.60, 26.15], [86.72, 26.48], [86.52, 26.72],
            [86.85, 26.65], [87.12, 26.55], [87.08, 26.12],
            [86.85, 25.98], [86.60, 26.15]
        ]
    },
    {
        "id": "saharsa",
        "name": "Saharsa",
        "nameHi": "सहरसा",
        "division": "Kosi",
        "population": 1900661,
        "area": 1702,
        "coords": [
            [86.25, 26.08], [86.60, 26.15], [86.85, 25.98],
            [86.78, 25.72], [86.52, 25.58], [86.22, 25.65],
            [86.25, 26.08]
        ]
    },
    {
        "id": "madhepura",
        "name": "Madhepura",
        "nameHi": "मधेपुरा",
        "division": "Kosi",
        "population": 2001762,
        "area": 1787,
        "coords": [
            [86.85, 25.98], [87.08, 26.12], [87.25, 25.98],
            [87.22, 25.72], [86.95, 25.55], [86.78, 25.72],
            [86.85, 25.98]
        ]
    },

    # ==================== PURNIA DIVISION ====================
    {
        "id": "araria",
        "name": "Araria",
        "nameHi": "अररिया",
        "division": "Purnia",
        "population": 2811569,
        "area": 2830,
        "coords": [
            [87.12, 26.55], [87.08, 26.12], [87.25, 25.98],
            [87.55, 26.05], [87.65, 26.35], [87.52, 26.62],
            [87.12, 26.55]
        ]
    },
    {
        "id": "kishanganj",
        "name": "Kishanganj",
        "nameHi": "किशनगंज",
        "division": "Purnia",
        "population": 1690948,
        "area": 1884,
        "coords": [
            [87.52, 26.62], [87.65, 26.35], [87.55, 26.05],
            [87.78, 25.92], [88.08, 26.10], [88.12, 26.48],
            [87.80, 26.55], [87.52, 26.62]
        ]
    },
    {
        "id": "purnia",
        "name": "Purnia",
        "nameHi": "पूर्णिया",
        "division": "Purnia",
        "population": 3264619,
        "area": 3229,
        "coords": [
            [87.22, 25.72], [87.25, 25.98], [87.55, 26.05],
            [87.78, 25.92], [87.82, 25.58], [87.62, 25.32],
            [87.28, 25.38], [87.22, 25.72]
        ]
    },
    {
        "id": "katihar",
        "name": "Katihar",
        "nameHi": "कटिहार",
        "division": "Purnia",
        "population": 3071029,
        "area": 3056,
        "coords": [
            [87.28, 25.38], [87.62, 25.32], [87.82, 25.58],
            [87.78, 25.92], [88.08, 26.10], [88.12, 25.55],
            [87.85, 25.10], [87.45, 25.05], [87.28, 25.38]
        ]
    },

    # ==================== MUNGER DIVISION ====================
    {
        "id": "begusarai",
        "name": "Begusarai",
        "nameHi": "बेगूसराय",
        "division": "Munger",
        "population": 2970541,
        "area": 1918,
        "coords": [
            [85.90, 25.42], [86.12, 25.58], [86.22, 25.65],
            [86.52, 25.58], [86.38, 25.28], [86.05, 25.18],
            [85.82, 25.28], [85.90, 25.42]
        ]
    },
    {
        "id": "khagaria",
        "name": "Khagaria",
        "nameHi": "खगड़िया",
        "division": "Munger",
        "population": 1666886,
        "area": 1486,
        "coords": [
            [86.52, 25.58], [86.78, 25.72], [86.95, 25.55],
            [86.82, 25.30], [86.55, 25.22], [86.38, 25.28],
            [86.52, 25.58]
        ]
    },
    {
        "id": "munger",
        "name": "Munger",
        "nameHi": "मुंगेर",
        "division": "Munger",
        "population": 1367765,
        "area": 1419,
        "coords": [
            [86.38, 25.28], [86.55, 25.22], [86.82, 25.30],
            [86.78, 25.02], [86.52, 24.92], [86.28, 25.02],
            [86.38, 25.28]
        ]
    },
    {
        "id": "lakhisarai",
        "name": "Lakhisarai",
        "nameHi": "लखीसराय",
        "division": "Munger",
        "population": 1000912,
        "area": 1229,
        "coords": [
            [86.05, 25.18], [86.38, 25.28], [86.28, 25.02],
            [86.08, 24.88], [85.88, 24.98], [86.05, 25.18]
        ]
    },
    {
        "id": "sheikhpura",
        "name": "Sheikhpura",
        "nameHi": "शेखपुरा",
        "division": "Munger",
        "population": 636342,
        "area": 689,
        "coords": [
            [85.72, 25.15], [85.82, 25.28], [86.05, 25.18],
            [85.88, 24.98], [85.72, 24.95], [85.62, 25.05],
            [85.72, 25.15]
        ]
    },
    {
        "id": "jamui",
        "name": "Jamui",
        "nameHi": "जमुई",
        "division": "Munger",
        "population": 1760405,
        "area": 3122,
        "coords": [
            [85.88, 24.98], [86.08, 24.88], [86.28, 25.02],
            [86.52, 24.92], [86.55, 24.58], [86.22, 24.38],
            [85.90, 24.52], [85.72, 24.72], [85.88, 24.98]
        ]
    },

    # ==================== BHAGALPUR DIVISION ====================
    {
        "id": "bhagalpur",
        "name": "Bhagalpur",
        "nameHi": "भागलपुर",
        "division": "Bhagalpur",
        "population": 3037766,
        "area": 2569,
        "coords": [
            [86.82, 25.30], [86.95, 25.55], [87.22, 25.72],
            [87.28, 25.38], [87.18, 25.08], [86.92, 24.95],
            [86.78, 25.02], [86.82, 25.30]
        ]
    },
    {
        "id": "banka",
        "name": "Banka",
        "nameHi": "बांका",
        "division": "Bhagalpur",
        "population": 2034763,
        "area": 3020,
        "coords": [
            [86.52, 24.92], [86.78, 25.02], [86.92, 24.95],
            [87.18, 25.08], [87.12, 24.72], [86.82, 24.45],
            [86.55, 24.58], [86.52, 24.92]
        ]
    },

    # ==================== PATNA DIVISION ====================
    {
        "id": "patna",
        "name": "Patna",
        "nameHi": "पटना",
        "division": "Patna",
        "population": 5838465,
        "area": 3202,
        "coords": [
            [84.88, 25.62], [85.18, 25.52], [85.38, 25.60],
            [85.55, 25.38], [85.42, 25.12], [85.08, 24.98],
            [84.78, 25.08], [84.72, 25.32], [84.88, 25.62]
        ]
    },
    {
        "id": "nalanda",
        "name": "Nalanda",
        "nameHi": "नालंदा",
        "division": "Patna",
        "population": 2877653,
        "area": 2355,
        "coords": [
            [85.08, 24.98], [85.42, 25.12], [85.55, 25.38],
            [85.72, 25.15], [85.62, 25.05], [85.72, 24.95],
            [85.52, 24.72], [85.22, 24.68], [85.08, 24.98]
        ]
    },
    {
        "id": "bhojpur",
        "name": "Bhojpur",
        "nameHi": "भोजपुर",
        "division": "Patna",
        "population": 2728407,
        "area": 2395,
        "coords": [
            [84.18, 25.58], [84.60, 25.58], [84.72, 25.32],
            [84.58, 25.10], [84.32, 25.02], [84.08, 25.15],
            [84.02, 25.38], [84.18, 25.58]
        ]
    },
    {
        "id": "buxar",
        "name": "Buxar",
        "nameHi": "बक्सर",
        "division": "Patna",
        "population": 1706352,
        "area": 1624,
        "coords": [
            [83.78, 25.92], [84.18, 25.98], [84.28, 25.82],
            [84.18, 25.58], [84.02, 25.38], [83.72, 25.40],
            [83.62, 25.62], [83.78, 25.92]
        ]
    },
    {
        "id": "rohtas",
        "name": "Rohtas",
        "nameHi": "रोहतास",
        "division": "Patna",
        "population": 2959918,
        "area": 3847,
        "coords": [
            [83.72, 25.40], [84.02, 25.38], [84.08, 25.15],
            [84.32, 25.02], [84.38, 24.72], [84.15, 24.45],
            [83.82, 24.38], [83.55, 24.65], [83.52, 25.02],
            [83.72, 25.40]
        ]
    },
    {
        "id": "kaimur",
        "name": "Kaimur",
        "nameHi": "कैमूर",
        "division": "Patna",
        "population": 1626384,
        "area": 3362,
        "coords": [
            [83.52, 25.02], [83.72, 25.40], [83.62, 25.62],
            [83.78, 25.92], [83.58, 26.12], [83.32, 25.82],
            [83.28, 25.42], [83.32, 24.92], [83.52, 25.02]
        ]
    },

    # ==================== MAGADH DIVISION ====================
    {
        "id": "gaya",
        "name": "Gaya",
        "nameHi": "गया",
        "division": "Magadh",
        "population": 4391418,
        "area": 4976,
        "coords": [
            [84.78, 25.08], [85.08, 24.98], [85.22, 24.68],
            [85.18, 24.38], [84.92, 24.22], [84.58, 24.28],
            [84.38, 24.55], [84.38, 24.72], [84.58, 25.10],
            [84.78, 25.08]
        ]
    },
    {
        "id": "jehanabad",
        "name": "Jehanabad",
        "nameHi": "जहानाबाद",
        "division": "Magadh",
        "population": 1125313,
        "area": 1569,
        "coords": [
            [84.72, 25.32], [84.78, 25.08], [84.58, 25.10],
            [84.38, 24.72], [84.32, 25.02], [84.58, 25.10],
            [84.72, 25.32]
        ]
    },
    {
        "id": "arwal",
        "name": "Arwal",
        "nameHi": "अरवल",
        "division": "Magadh",
        "population": 700843,
        "area": 638,
        "coords": [
            [84.58, 25.10], [84.78, 25.08], [84.72, 24.88],
            [84.52, 24.82], [84.38, 24.92], [84.38, 25.02],
            [84.58, 25.10]
        ]
    },
    {
        "id": "aurangabad",
        "name": "Aurangabad",
        "nameHi": "औरंगाबाद",
        "division": "Magadh",
        "population": 2540073,
        "area": 3305,
        "coords": [
            [84.32, 25.02], [84.38, 24.72], [84.38, 24.55],
            [84.58, 24.28], [84.42, 24.12], [84.15, 24.12],
            [83.82, 24.38], [84.15, 24.45], [84.32, 25.02]
        ]
    },
    {
        "id": "nawada",
        "name": "Nawada",
        "nameHi": "नवादा",
        "division": "Magadh",
        "population": 2219146,
        "area": 2494,
        "coords": [
            [85.22, 24.68], [85.52, 24.72], [85.72, 24.72],
            [85.72, 24.48], [85.52, 24.22], [85.18, 24.18],
            [84.92, 24.22], [85.18, 24.38], [85.22, 24.68]
        ]
    },
]

# ============================================================
# Fix Jehanabad polygon (it had a self-intersection issue)
# Redefine it properly
# ============================================================
for d in districts:
    if d["id"] == "jehanabad":
        d["coords"] = [
            [84.72, 25.32], [84.78, 25.08], [84.72, 24.88],
            [84.52, 24.82], [84.38, 24.92], [84.32, 25.02],
            [84.58, 25.10], [84.72, 25.32]
        ]
        break

# ============================================================
# Fix Kaimur - it should be southwest, not wrapping north
# ============================================================
for d in districts:
    if d["id"] == "kaimur":
        d["coords"] = [
            [83.32, 24.92], [83.52, 25.02], [83.72, 25.40],
            [83.62, 25.62], [83.42, 25.55], [83.28, 25.42],
            [83.22, 25.10], [83.32, 24.92]
        ]
        break


def build_districts_geojson(districts_data):
    """Build GeoJSON FeatureCollection for all districts."""
    features = []
    for d in districts_data:
        feature = {
            "type": "Feature",
            "id": d["id"],
            "properties": {
                "id": d["id"],
                "name": d["name"],
                "nameHi": d["nameHi"],
                "division": d["division"],
                "population": d["population"],
                "area": d["area"]
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [d["coords"]]
            }
        }
        features.append(feature)

    return {
        "type": "FeatureCollection",
        "name": "Bihar Districts",
        "crs": {
            "type": "name",
            "properties": {
                "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
            }
        },
        "features": features
    }


def build_outline_geojson(districts_data):
    """
    Build Bihar state outline from the outermost points of all districts.
    Uses a convex-hull-like approach with manual ordering of boundary points.
    """
    # Collect all boundary points
    all_points = []
    for d in districts_data:
        for coord in d["coords"][:-1]:  # Skip closing point
            all_points.append(coord)

    # Find the convex hull using Graham scan
    def cross(O, A, B):
        return (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0])

    points = sorted(set(map(tuple, all_points)))
    if len(points) <= 1:
        return None

    # Build lower hull
    lower = []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)

    # Build upper hull
    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)

    hull = lower[:-1] + upper[:-1]
    # Close the polygon
    hull_coords = [[p[0], p[1]] for p in hull]
    hull_coords.append(hull_coords[0])

    return {
        "type": "FeatureCollection",
        "name": "Bihar State Outline",
        "features": [
            {
                "type": "Feature",
                "id": "bihar",
                "properties": {
                    "id": "bihar",
                    "name": "Bihar",
                    "nameHi": "बिहार",
                    "population": 104099452,
                    "area": 94163,
                    "districts": 38,
                    "divisions": 9
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [hull_coords]
                }
            }
        ]
    }


def main():
    # Create output directory
    out_dir = r"c:\Political Demography Dashboard\public\data\geo"
    os.makedirs(out_dir, exist_ok=True)

    # Build and save districts GeoJSON
    districts_geojson = build_districts_geojson(districts)
    districts_path = os.path.join(out_dir, "bihar-districts.geojson")
    with open(districts_path, "w", encoding="utf-8") as f:
        json.dump(districts_geojson, f, ensure_ascii=False, indent=2)
    print(f"Created {districts_path}")
    print(f"  - {len(districts)} districts")

    # Validate all polygons are closed
    for d in districts:
        coords = d["coords"]
        if coords[0] != coords[-1]:
            print(f"  WARNING: {d['name']} polygon is not closed!")

    # Build and save outline GeoJSON
    outline_geojson = build_outline_geojson(districts)
    outline_path = os.path.join(out_dir, "bihar-outline.geojson")
    with open(outline_path, "w", encoding="utf-8") as f:
        json.dump(outline_geojson, f, ensure_ascii=False, indent=2)
    print(f"Created {outline_path}")

    # Print summary
    total_pop = sum(d["population"] for d in districts)
    total_area = sum(d["area"] for d in districts)
    divisions = set(d["division"] for d in districts)
    print(f"\nSummary:")
    print(f"  Total districts: {len(districts)}")
    print(f"  Total divisions: {len(divisions)} - {', '.join(sorted(divisions))}")
    print(f"  Total population: {total_pop:,}")
    print(f"  Total area: {total_area:,} sq km")

    # Verify all 38 districts
    if len(districts) != 38:
        print(f"\n  WARNING: Expected 38 districts, got {len(districts)}")
        # List missing districts
        expected = {
            "west-champaran", "east-champaran", "sitamarhi", "sheohar",
            "muzaffarpur", "vaishali", "gopalganj", "siwan", "saran",
            "darbhanga", "madhubani", "samastipur", "supaul", "saharsa",
            "madhepura", "araria", "kishanganj", "purnia", "katihar",
            "begusarai", "khagaria", "munger", "lakhisarai", "sheikhpura",
            "jamui", "bhagalpur", "banka", "patna", "nalanda", "bhojpur",
            "buxar", "rohtas", "kaimur", "gaya", "jehanabad", "arwal",
            "aurangabad", "nawada"
        }
        actual = {d["id"] for d in districts}
        missing = expected - actual
        extra = actual - expected
        if missing:
            print(f"  Missing: {missing}")
        if extra:
            print(f"  Extra: {extra}")


if __name__ == "__main__":
    main()
