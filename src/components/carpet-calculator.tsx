"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import CarpetVisualization from "./carpet-visualization";

type CarpetWidth = 12 | 13.5 | 15;

interface CalculationResult {
  primaryLength: number;
  additionalLength: number;
  totalLength: number;
  leftover: number;
  carpetArea: number;
}

const CarpetCalculator = () => {
  const [roomLength, setRoomLength] = useState<number>(0);
  const [roomWidth, setRoomWidth] = useState<number>(0);
  const [carpetWidth, setCarpetWidth] = useState<CarpetWidth>(12);
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    calculateCarpet();
  }, [roomLength, roomWidth, carpetWidth]);

  const calculateCarpet = () => {
    if (roomLength <= 0 || roomWidth <= 0) return;

    let primaryLength = roomLength;
    let additionalLength = 0;
    let totalLength = 0;
    let leftover = 0;
    let carpetArea = 0;

    if (roomWidth > carpetWidth) {
      additionalLength = roomLength / 2 + 0.25; // Adjust for seam allowance.
      totalLength = primaryLength + additionalLength;
    } else {
      totalLength = primaryLength;
    }

    carpetArea = totalLength * carpetWidth;

    // Calculate leftover after cuts.
    const roomArea = roomLength * roomWidth;
    const cutWidth = roomWidth - carpetWidth; // Width of cut pieces.
    const cutArea = cutWidth > 0 ? cutWidth * roomLength : 0; // Total area of cut pieces (A and B).

    leftover = carpetArea - roomArea - cutArea;

    setResult({
      primaryLength: Math.ceil(primaryLength * 100) / 100,
      additionalLength: Math.ceil(additionalLength * 100) / 100,
      totalLength: Math.ceil(totalLength * 100) / 100,
      leftover: Math.ceil(leftover * 100) / 100,
      carpetArea: Math.ceil(carpetArea * 100) / 100,
    });
  };

  return (
    <Card className="w-full max-w-6xl mx-auto my-10 shadow-none rounded-md border-none bg-cyan-50">
      <CardHeader className="p-6">
        <CardTitle className="text-3xl font-bold text-cyan-700 text-center">
          Carpet Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="roomLength" className="text-sm font-medium text-cyan-700">
              Room Length (ft)
            </Label>
            <Input
              id="roomLength"
              type="number"
              value={roomLength || ""}
              onChange={(e) => setRoomLength(parseFloat(e.target.value))}
              placeholder="Enter room length"
              className="mt-1 rounded-md border border-cyan-300 focus:border-cyan-500 focus:ring focus:ring-cyan-200"
            />
          </div>
          <div>
            <Label htmlFor="roomWidth" className="text-sm font-medium text-cyan-700">
              Room Width (ft)
            </Label>
            <Input
              id="roomWidth"
              type="number"
              value={roomWidth || ""}
              onChange={(e) => setRoomWidth(parseFloat(e.target.value))}
              placeholder="Enter room width"
              className="mt-1 rounded-md border border-cyan-300 focus:border-cyan-500 focus:ring focus:ring-cyan-200"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="carpetWidth" className="text-sm font-medium text-cyan-700">
            Carpet Width (ft)
          </Label>
          <Select
            onValueChange={(value) =>
              setCarpetWidth(parseFloat(value) as CarpetWidth)
            }
          >
            <SelectTrigger className="mt-1 rounded-md border border-cyan-300 focus:border-cyan-500 focus:ring focus:ring-cyan-200">
              <SelectValue placeholder="Select carpet width" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12 ft</SelectItem>
              <SelectItem value="13.5">13.5 ft</SelectItem>
              <SelectItem value="15">15 ft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Table */}
        {result && (
          <Table className="w-full mt-6 bg-white rounded-md shadow">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-cyan-100 text-cyan-700">Measurement</TableHead>
                <TableHead className="bg-cyan-100 text-cyan-700">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Primary Carpet Length</TableCell>
                <TableCell>{result.primaryLength.toFixed(2)} ft</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Additional Length for Seams</TableCell>
                <TableCell>{result.additionalLength.toFixed(2)} ft</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Carpet Length</TableCell>
                <TableCell>{result.totalLength.toFixed(2)} ft</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carpet Area</TableCell>
                <TableCell>{result.carpetArea.toFixed(2)} sq ft</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Leftover Carpet</TableCell>
                <TableCell>{result.leftover.toFixed(2)} sq ft</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}

        {/* Carpet Visualization */}
        {result && roomLength > 0 && roomWidth > 0 && (
          <div className="mt-6">
            <CarpetVisualization
              roomLength={roomLength}
              roomWidth={roomWidth}
              carpetWidth={carpetWidth}
              additionalLength={result?.additionalLength || 0}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CarpetCalculator;
