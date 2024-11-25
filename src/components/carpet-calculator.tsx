'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useEffect, useState } from 'react'
import CarpetVisualization, { verticalTextStyle } from './carpet-visualization'

type CarpetWidth = 12 | 13.5 | 15

interface CalculationResult {
  primaryLength: number
  additionalLength: number
  totalLength: number
  leftover: number
  carpetArea: number
}

const CarpetCalculator = () => {
  const [roomLength, setRoomLength] = useState<number>(0)
  const [roomWidth, setRoomWidth] = useState<number>(0)
  const [carpetWidth, setCarpetWidth] = useState<CarpetWidth>(12)
  const [result, setResult] = useState<CalculationResult | null>(null)

  useEffect(() => {
    calculateCarpet()
  }, [roomLength, roomWidth, carpetWidth])

  const calculateCarpet = () => {
    if (roomLength <= 0 || roomWidth <= 0) return

    let primaryLength = roomLength
    let additionalLength = 0
    let totalLength = 0
    let leftover = 0
    let carpetArea = 0

    if (roomWidth > carpetWidth) {
      primaryLength = roomLength
      additionalLength = roomLength / 2 + 0.25 // 3 inches = 0.25 feet
      totalLength = primaryLength + additionalLength
    } else {
      totalLength = primaryLength
    }

    carpetArea = Math.ceil(totalLength * carpetWidth)
    leftover = carpetArea - (roomLength * roomWidth)

    setResult({
      primaryLength: Math.ceil(primaryLength * 100) / 100,
      additionalLength: Math.ceil(additionalLength * 100) / 100,
      totalLength: Math.ceil(totalLength * 100) / 100,
      leftover: Math.ceil(leftover * 100) / 100,
      carpetArea: carpetArea
    })
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <style>{verticalTextStyle}</style>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Carpet Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="roomLength">Room Length (ft)</Label>
                <Input
                  id="roomLength"
                  type="number"
                  value={roomLength || ''}
                  onChange={(e) => setRoomLength(parseFloat(e.target.value))}
                  placeholder="Enter room length"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="roomWidth">Room Width (ft)</Label>
                <Input
                  id="roomWidth"
                  type="number"
                  value={roomWidth || ''}
                  onChange={(e) => setRoomWidth(parseFloat(e.target.value))}
                  placeholder="Enter room width"
                  className="mt-1"
                />
              </div>
              <Separator className="my-2" />
              <div>
                <Label htmlFor="carpetWidth">Carpet Width (ft)</Label>
                <Select onValueChange={(value) => setCarpetWidth(parseFloat(value) as CarpetWidth)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select carpet width" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 ft</SelectItem>
                    <SelectItem value="13.5">13.5 ft</SelectItem>
                    <SelectItem value="15">15 ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {result && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Measurement</TableHead>
                    <TableHead>Value</TableHead>
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
          </div>

          <div className="space-y-14">
            {/* Carpet Visualization */}
            <CarpetVisualization
              roomLength={roomLength}
              roomWidth={roomWidth}
              carpetWidth={carpetWidth}
              additionalLength={result?.additionalLength || 0}
            />

          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CarpetCalculator
