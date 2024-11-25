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
type Unit = 'ft' | 'in';

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
  const [roomLengthUnit, setRoomLengthUnit] = useState<Unit>('ft');
  const [roomWidthUnit, setRoomWidthUnit] = useState<Unit>('ft');
  const [carpetWidth, setCarpetWidth] = useState<CarpetWidth>(12);
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Conversion helper function
  const convertToFeet = (value: number, unit: Unit): number => {
    return unit === 'in' ? value / 12 : value;
  };

  useEffect(() => {
    calculateCarpet();
  }, [roomLength, roomWidth, roomLengthUnit, roomWidthUnit, carpetWidth]);

  const calculateCarpet = () => {
    // Convert inputs to feet
    const roomLengthFt = convertToFeet(roomLength, roomLengthUnit);
    const roomWidthFt = convertToFeet(roomWidth, roomWidthUnit);

    if (roomLengthFt <= 0 || roomWidthFt <= 0) return;

    const primaryLength = roomLengthFt;
    const additionalLength = roomWidthFt > carpetWidth ? roomLengthFt / 2 + 0.25 : 0;
    const totalLength = primaryLength + additionalLength;
    const carpetArea = totalLength * carpetWidth;

    const roomArea = roomLengthFt * roomWidthFt;
    const cutWidth = roomWidthFt - carpetWidth;
    const cutArea = cutWidth > 0 ? cutWidth * roomLengthFt : 0;

    const leftover = carpetArea - roomArea - cutArea;

    setResult({
      primaryLength: Math.ceil(primaryLength * 100) / 100,
      additionalLength: Math.ceil(additionalLength * 100) / 100,
      totalLength: Math.ceil(totalLength * 100) / 100,
      leftover: Math.ceil(leftover * 100) / 100,
      carpetArea: Math.ceil(carpetArea * 100) / 100,
    });
  };

  return (
    <Card className="w-full max-w-6xl mx-auto my-10 shadow-none rounded-md border-none">
      <CardHeader className="p-6">
        <CardTitle className="text-3xl font-bold text-cyan-700 text-center">
          Carpet Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="roomLength" className="text-sm font-medium text-cyan-700">
              Room Length
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="roomLength"
                type="number"
                value={roomLength || ""}
                onChange={(e) => setRoomLength(parseFloat(e.target.value))}
                placeholder="Enter room length"
                className="mt-1 rounded-md border border-cyan-300 focus:border-cyan-500 focus:ring focus:ring-cyan-200"
              />
              <Select 
                value={roomLengthUnit}
                onValueChange={(value: Unit) => setRoomLengthUnit(value)}
              >
                <SelectTrigger className="w-24 mt-1">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ft">Feet</SelectItem>
                  <SelectItem value="in">Inches</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="roomWidth" className="text-sm font-medium text-cyan-700">
              Room Width
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="roomWidth"
                type="number"
                value={roomWidth || ""}
                onChange={(e) => setRoomWidth(parseFloat(e.target.value))}
                placeholder="Enter room width"
                className="mt-1 rounded-md border border-cyan-300 focus:border-cyan-500 focus:ring focus:ring-cyan-200"
              />
              <Select 
                value={roomWidthUnit}
                onValueChange={(value: Unit) => setRoomWidthUnit(value)}
              >
                <SelectTrigger className="w-24 mt-1">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ft">Feet</SelectItem>
                  <SelectItem value="in">Inches</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                <TableCell>{carpetWidth} x {result.primaryLength.toFixed(2)} ft</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Additional Length for Seams</TableCell>
                <TableCell>{carpetWidth} x {result.additionalLength.toFixed(2)} ft</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Carpet Length</TableCell>
                <TableCell>{carpetWidth} x {result.totalLength.toFixed(2)} ft</TableCell>
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

        {/* Carpet Visualization - pass converted values */}
        {result && roomLength > 0 && roomWidth > 0 && (
          <div className="mt-6">
            <CarpetVisualization
              roomLength={convertToFeet(roomLength, roomLengthUnit)}
              roomWidth={convertToFeet(roomWidth, roomWidthUnit)}
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
