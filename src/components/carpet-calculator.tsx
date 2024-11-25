"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface CarpetCalculatorState {
  roomLengthFt: number;
  roomLengthIn: number;
  roomWidthFt: number;
  roomWidthIn: number;
  carpetWidth: CarpetWidth;
}

interface CalculationResult {
  primaryLength: number;
  additionalLength: number;
  totalLength: number;
  leftover: number;
  carpetArea: number;
}

const CarpetCalculator = () => {
  const [state, setState] = useState<CarpetCalculatorState>({
    roomLengthFt: 0,
    roomLengthIn: 0,
    roomWidthFt: 0,
    roomWidthIn: 0,
    carpetWidth: 12
  });

  const [result, setResult] = useState<CalculationResult | null>(null);

  // Calculate total length in feet
  const calculateTotalLength = (feet: number, inches: number): number => {
    return feet + (inches / 12);
  };

  // Update state for a specific field
  const updateField = (field: keyof CarpetCalculatorState, value: number) => {
    setState(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  useEffect(() => {
    calculateCarpet();
  }, [
    state.roomLengthFt, 
    state.roomLengthIn, 
    state.roomWidthFt, 
    state.roomWidthIn, 
    state.carpetWidth
  ]);

  const calculateCarpet = () => {
    // Calculate total room dimensions
    const roomLength = calculateTotalLength(state.roomLengthFt, state.roomLengthIn);
    const roomWidth = calculateTotalLength(state.roomWidthFt, state.roomWidthIn);

    if (roomLength <= 0 || roomWidth <= 0) return;

    const primaryLength = roomLength;
    const additionalLength = roomWidth > state.carpetWidth ? roomLength / 2 + 0.25 : 0;
    const totalLength = primaryLength + additionalLength;
    const carpetArea = totalLength * state.carpetWidth;

    const roomArea = roomLength * roomWidth;
    const cutWidth = roomWidth - state.carpetWidth;
    const cutArea = cutWidth > 0 ? cutWidth * roomLength : 0;

    const leftover = carpetArea - roomArea - cutArea;

    setResult({
      primaryLength: Math.ceil(primaryLength * 100) / 100,
      additionalLength: Math.ceil(additionalLength * 100) / 100,
      totalLength: Math.ceil(totalLength * 100) / 100,
      leftover: Math.ceil(leftover * 100) / 100,
      carpetArea: Math.ceil(carpetArea * 100) / 100,
    });
  };

  // Total length calculation for display
  const getTotalRoomLength = () => {
    return calculateTotalLength(state.roomLengthFt, state.roomLengthIn);
  };

  const getTotalRoomWidth = () => {
    return calculateTotalLength(state.roomWidthFt, state.roomWidthIn);
  };

  return (
    <div className="bg-cyan-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 border-none">
      <Card className="w-full max-w-4xl mx-auto rounded-2xl border-none">
        <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6">
          <CardTitle className="text-3xl font-extrabold text-white text-center tracking-tight">
            Carpet Calculator
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8 bg-white border-none">
          {/* Room Length Inputs */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-cyan-700">
              Room Length
            </Label>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm text-cyan-600">Feet</Label>
                <Input
                  type="number"
                  value={state.roomLengthFt || ""}
                  onChange={(e) => updateField('roomLengthFt', parseFloat(e.target.value) || 0)}
                  placeholder="Enter feet"
                  className="border-cyan-300 focus:ring-cyan-500"
                />
              </div>
              <div>
                <Label className="text-sm text-cyan-600">Inches</Label>
                <Input
                  type="number"
                  value={state.roomLengthIn || ""}
                  onChange={(e) => updateField('roomLengthIn', parseFloat(e.target.value) || 0)}
                  placeholder="Enter inches"
                  className="border-cyan-300 focus:ring-cyan-500"
                />
              </div>
              <div>
                <Label className="text-sm text-cyan-600 font-bold">Total Length</Label>
                <Input
                  type="text"
                  value={`${getTotalRoomLength().toFixed(2)} ft`}
                  readOnly
                  className="bg-cyan-50 border-cyan-300 text-cyan-800 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Room Width Inputs */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-cyan-700">
              Room Width
            </Label>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm text-cyan-600">Feet</Label>
                <Input
                  type="number"
                  value={state.roomWidthFt || ""}
                  onChange={(e) => updateField('roomWidthFt', parseFloat(e.target.value) || 0)}
                  placeholder="Enter feet"
                  className="border-cyan-300 focus:ring-cyan-500"
                />
              </div>
              <div>
                <Label className="text-sm text-cyan-600">Inches</Label>
                <Input
                  type="number"
                  value={state.roomWidthIn || ""}
                  onChange={(e) => updateField('roomWidthIn', parseFloat(e.target.value) || 0)}
                  placeholder="Enter inches"
                  className="border-cyan-300 focus:ring-cyan-500"
                />
              </div>
              <div>
                <Label className="text-sm text-cyan-600 font-bold">Total Width</Label>
                <Input
                  type="text"
                  value={`${getTotalRoomWidth().toFixed(2)} ft`}
                  readOnly
                  className="bg-cyan-50 border-cyan-300 text-cyan-800 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Carpet Width Selection */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-cyan-700">
              Carpet Width
            </Label>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <select
                  value={state.carpetWidth}
                  onChange={(e) => updateField('carpetWidth', parseFloat(e.target.value) as CarpetWidth)}
                  className="w-full p-2 border border-cyan-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="12">12 ft</option>
                  <option value="13.5">13.5 ft</option>
                  <option value="15">15 ft</option>
                </select>
              </div>
            </div>
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
                    ["Total Room Length", `${getTotalRoomLength().toFixed(2)} ft`],
                    ["Total Room Width", `${getTotalRoomWidth().toFixed(2)} ft`],
                    ["Primary Carpet Length", `${state.carpetWidth} x ${result.primaryLength.toFixed(2)} ft`],
                    ["Additional Length for Seams", `${state.carpetWidth} x ${result.additionalLength.toFixed(2)} ft`],
                    ["Total Carpet Length", `${state.carpetWidth} x ${result.totalLength.toFixed(2)} ft`],
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
          {result && (
            <div className="mt-8">
              <CarpetVisualization
                roomLength={getTotalRoomLength()}
                roomWidth={getTotalRoomWidth()}
                carpetWidth={state.carpetWidth}
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