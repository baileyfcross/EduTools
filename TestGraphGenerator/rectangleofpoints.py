#!/usr/bin/env python3
# METAL Project, Jim Teresco, 2021
"""Generate Travel Mapping Graph (.tmg) files for testing purposes.

(c) 2021, Jim Teresco

"""

import argparse

# Execution code starts here

# argument parsing
parser = argparse.ArgumentParser(description="Generate Travel Mapping Graph (.tmg) files for testing purposes.")
parser.add_argument("-w", "--west", type=float, default=-74.5, help="western longitude limit")
parser.add_argument("-e", "--east", type=float, default=-73.5, help="eastern longitude limit")
parser.add_argument("-n", "--north", type=float, default=43.1, help="northern latitude limit")
parser.add_argument("-s", "--south", type=float, default=42.5, help="southern latitude limit")
parser.add_argument("-p", "--points-only",
                    help="supress generation of graph edges",
                    action="store_true")
parser.add_argument("-c", "--complete-graph",
                    help="generate all possible graph edges",
                    action="store_true")
parser.add_argument("rows", help="number of rows of points", type=int)
parser.add_argument("columns", help="number of columns of points", type=int)
args = parser.parse_args()

# compute the list of latitudes
lats = []
latrange = args.north-args.south
for latnum in range(0, args.rows):
    lats.append(args.south + latnum*latrange/(args.rows-1))

# compute the list of longitudes
lons = []
lonrange = args.east-args.west
for lonnum in range(0, args.columns):
    lons.append(args.west + lonnum*lonrange/(args.columns-1))

# compute and report our numbers of vertices and edges
verts = args.rows*args.columns
edges = (args.rows - 1) * args.columns + args.rows * (args.columns - 1)
if args.complete_graph:
    edges = verts * (verts - 1) // 2
elif args.points_only:
    edges = 0
print("TMG 1.0 collapsed")
print(str(verts) + " " + str(edges))

# write our vertices, tracking the edges we'll need (if any) as we go
for latnum in range(len(lats)):
    for lonnum in range(len(lons)):
        print(str(latnum) + "/" + str(lonnum) + " " + str(lats[latnum]) +
              " " + str(lons[lonnum]))
