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

  // Conversion helper functions
  const convertToFeet = (value: number, unit: Unit): number => {
    return unit === 'in' ? value / 12 : value;
  };

  useEffect(() => {
    calculateCarpet();
  }, [roomLength, roomWidth, roomLengthUnit, roomWidthUnit, carpetWidth]);

  const calculateCarpet = () => {
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
    <div className="bg-cyan-50 min-h-screen px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto rounded-2xl border-none">
        <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6">
          <CardTitle className="text-3xl font-extrabold text-white text-center tracking-tight">
            Carpet Calculator
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8 bg-white">
          {/* Measurement Inputs */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Room Length Input */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-cyan-700">
                Room Length
              </Label>
              <div className="flex space-x-3">
                <div className="flex-grow">
                  <Input
                    type="number"
                    value={roomLength || ""}
                    onChange={(e) => setRoomLength(parseFloat(e.target.value))}
                    placeholder="Enter length"
                    className="border-cyan-300 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 ease-in-out"
                  />
                </div>
                <Select 
                  value={roomLengthUnit}
                  onValueChange={(value: Unit) => setRoomLengthUnit(value)}
                >
                  <SelectTrigger className="w-24 border-cyan-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ft">Feet</SelectItem>
                    <SelectItem value="in">Inches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {roomLength > 0 && (
                <div className="text-sm text-cyan-600 mt-1 animate-fade-in">
                  Converted: {roomLengthUnit === 'ft' 
                    ? `${(roomLength * 12).toFixed(0)} inches` 
                    : `${(roomLength / 12).toFixed(2)} feet`}
                </div>
              )}
            </div>

            {/* Room Width Input */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-cyan-700">
                Room Width
              </Label>
              <div className="flex space-x-3">
                <div className="flex-grow">
                  <Input
                    type="number"
                    value={roomWidth || ""}
                    onChange={(e) => setRoomWidth(parseFloat(e.target.value))}
                    placeholder="Enter width"
                    className="border-cyan-300 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 ease-in-out"
                  />
                </div>
                <Select 
                  value={roomWidthUnit}
                  onValueChange={(value: Unit) => setRoomWidthUnit(value)}
                >
                  <SelectTrigger className="w-24 border-cyan-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ft">Feet</SelectItem>
                    <SelectItem value="in">Inches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {roomWidth > 0 && (
                <div className="text-sm text-cyan-600 mt-1 animate-fade-in">
                  Converted: {roomWidthUnit === 'ft' 
                    ? `${(roomWidth * 12).toFixed(0)} inches` 
                    : `${(roomWidth / 12).toFixed(2)} feet`}
                </div>
              )}
            </div>
          </div>

          {/* Carpet Width Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-cyan-700">
              Carpet Width
            </Label>
            <Select
              onValueChange={(value) =>
                setCarpetWidth(parseFloat(value) as CarpetWidth)
              }
            >
              <SelectTrigger className="border-cyan-300 focus:ring-cyan-500">
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
            <div className="bg-cyan-50 rounded-xl p-6 shadow-inner">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-cyan-100 text-cyan-800">Measurement</TableHead>
                    <TableHead className="bg-cyan-100 text-cyan-800">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["Primary Carpet Length", `${carpetWidth} x ${result.primaryLength.toFixed(2)} ft`],
                    ["Additional Length for Seams", `${carpetWidth} x ${result.additionalLength.toFixed(2)} ft`],
                    ["Total Carpet Length", `${carpetWidth} x ${result.totalLength.toFixed(2)} ft`],
                    ["Carpet Area", `${result.carpetArea.toFixed(2)} sq ft`],
                    ["Leftover Carpet", `${result.leftover.toFixed(2)} sq ft`]
                  ].map(([label, value], index) => (
                    <TableRow key={index} className="hover:bg-cyan-50 transition-colors">
                      <TableCell className="font-medium text-cyan-700">{label}</TableCell>
                      <TableCell className="text-cyan-900">{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Carpet Visualization */}
          {result && roomLength > 0 && roomWidth > 0 && (
            <div className="mt-8">
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
    </div>
  );
};

export default CarpetCalculator;