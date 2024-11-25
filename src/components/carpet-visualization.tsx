"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Ruler } from 'lucide-react'

interface CarpetVisualizationProps {
  roomLength: number
  roomWidth: number
  carpetWidth: number
  additionalLength: number
}

const CarpetVisualization: React.FC<CarpetVisualizationProps> = ({
  roomLength,
  roomWidth,
  carpetWidth,
  additionalLength,
}) => {
  const maxDimension = Math.max(roomLength, roomWidth, carpetWidth, additionalLength)
  const maxViewDimension = Math.min(window.innerWidth, window.innerHeight) * 0.8; // Use 80% of available space
  const scale = maxViewDimension / maxDimension;
  
  // Adjust leftover width based on cuts
  const leftoverWidth = roomWidth > carpetWidth ? carpetWidth - (roomWidth - carpetWidth) * 2 : carpetWidth

  const isVisible = (dimension: number): boolean => dimension > 0.01;

  const DimensionLabel: React.FC<{ dimension: number; className?: string; isVisible: boolean }> = ({ dimension, className, isVisible }) => (
    isVisible ? (
      <Badge
        variant="secondary"
        className={`absolute z-10 ${className} ${
          dimension < 3 ? 'scale-75 opacity-75' : ''
        }`}
      >
        <Ruler className="w-4 h-4 mr-1" />
        {dimension.toFixed(2)}'
      </Badge>
    ) : null
  );

  return (
    <TooltipProvider>
      <Card className="w-full max-w-3xl mx-auto border-none shadow-none">
        <CardHeader>
          <CardTitle>Carpet Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative" style={{ width: `${roomWidth * scale}px`, height: `${roomLength * scale}px` }}>
            {/* Room */}
            <div
              className="absolute inset-0 border-2 border-primary bg-primary/10 flex items-center justify-center"
              style={{
                width: `${roomWidth * scale}px`,
                height: `${roomLength * scale}px`,
              }}
            >
              <DimensionLabel 
                dimension={roomWidth} 
                className="top-0 left-1/2 -translate-x-1/2 -translate-y-full" 
                isVisible={isVisible(roomWidth)}
              />
              <DimensionLabel 
                dimension={roomWidth} 
                className="bottom-0 left-1/2 -translate-x-1/2 translate-y-full" 
                isVisible={isVisible(roomWidth)}
              />
              <DimensionLabel
                dimension={roomLength}
                className="left-0 top-1/2 -translate-y-1/2 -translate-x-full -rotate-90"
                isVisible={isVisible(roomLength)}
              />
              <DimensionLabel
                dimension={roomLength}
                className="right-0 top-1/2 -translate-y-1/2 translate-x-full rotate-90"
                isVisible={isVisible(roomLength)}
              />
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-lg font-bold text-primary">Room</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Room dimensions: {roomWidth}' x {roomLength}'
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Main Carpet */}
            <div
              className="absolute bottom-0 left-0 border-2 border-green-500 bg-green-200 flex items-center justify-center"
              style={{
                width: `${carpetWidth * scale}px`,
                height: `${roomLength * scale}px`,
              }}
            >
              <DimensionLabel dimension={carpetWidth} className="top-0 left-1/2 -translate-x-1/2 -translate-y-full" isVisible={isVisible(carpetWidth)} />
              <DimensionLabel dimension={carpetWidth} className="bottom-0 left-1/2 -translate-x-1/2 translate-y-full" isVisible={isVisible(carpetWidth)} />
              <DimensionLabel
                dimension={roomLength}
                className="left-0 top-1/2 -translate-y-1/2 -translate-x-full -rotate-90"
                isVisible={isVisible(roomLength)}
              />
              <DimensionLabel
                dimension={roomLength}
                className="right-0 top-1/2 -translate-y-1/2 translate-x-full rotate-90"
                isVisible={isVisible(roomLength)}
              />
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-lg font-bold text-green-700">Main Carpet</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Main carpet dimensions: {carpetWidth}' x {roomLength}'
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Cut Piece A */}
            {additionalLength > 0 && (
              <div
                className="absolute top-0 right-0 border-2 border-purple-500 bg-purple-200 flex items-center justify-center"
                style={{
                  width: `${(roomWidth - carpetWidth) * scale}px`,
                  height: `${(roomLength / 2) * scale}px`,
                }}
              >
                <DimensionLabel
                  dimension={roomWidth - carpetWidth}
                  className="top-0 left-1/2 -translate-x-full -translate-y-full"
                  isVisible={isVisible(roomWidth - carpetWidth)}
                />
                <DimensionLabel
                  dimension={roomWidth - carpetWidth}
                  className="bottom-0 left-1/2 -translate-x-full translate-y-full"
                  isVisible={isVisible(roomWidth - carpetWidth)}
                />
                <DimensionLabel
                  dimension={roomLength / 2}
                  className="right-0 top-1/2 -translate-y-1/2 translate-x-full rotate-90"
                  isVisible={isVisible(roomLength / 2)}
                />
                <DimensionLabel
                  dimension={roomLength / 2}
                  className="left-0 top-1/2 -translate-y-1/2 -translate-x-full -rotate-90"
                  isVisible={isVisible(roomLength / 2)}
                />
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-lg font-bold text-purple-700">A</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Cut piece A dimensions: {(roomWidth - carpetWidth).toFixed(2)}' x {(roomLength / 2).toFixed(2)}'
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}

            {/* Cut Piece B */}
            {additionalLength > 0 && (
              <div
                className="absolute top-1/2 right-0 border-2 border-orange-500 bg-orange-200 flex items-center justify-center"
                style={{
                  width: `${(roomWidth - carpetWidth) * scale}px`,
                  height: `${(roomLength / 2) * scale}px`,
                }}
              >
                <DimensionLabel
                  dimension={roomWidth - carpetWidth}
                  className="top-0 left-1/2 -translate-x-full -translate-y-full"
                  isVisible={isVisible(roomWidth - carpetWidth)}
                />
                <DimensionLabel
                  dimension={roomWidth - carpetWidth}
                  className="bottom-0 left-1/2 -translate-x-full translate-y-full"
                  isVisible={isVisible(roomWidth - carpetWidth)}
                />
                <DimensionLabel
                  dimension={roomLength / 2}
                  className="right-0 top-1/2 -translate-y-1/2 translate-x-full rotate-90"
                  isVisible={isVisible(roomLength / 2)}
                />
                <DimensionLabel
                  dimension={roomLength / 2}
                  className="left-0 top-1/2 -translate-y-1/2 -translate-x-full -rotate-90"
                  isVisible={isVisible(roomLength / 2)}
                />
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-lg font-bold text-orange-700">B</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Cut piece B dimensions: {(roomWidth - carpetWidth).toFixed(2)}' x {(roomLength / 2).toFixed(2)}'
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}

            {/* Leftover Piece */}
            {additionalLength > 0 && (
              <div
                className="absolute border-2 border-yellow-500 bg-yellow-200 flex items-center justify-center"
                style={{
                  width: `${leftoverWidth * scale}px`,
                  height: `${additionalLength * scale}px`,
                  top: `${roomLength * scale}px`,
                  left: "0px",
                }}
              >
                <DimensionLabel
                  dimension={leftoverWidth}
                  className="top-0 left-1/2 -translate-x-full -translate-y-full"
                  isVisible={isVisible(leftoverWidth)}
                />
                <DimensionLabel
                  dimension={leftoverWidth}
                  className="bottom-0 left-1/2 -translate-x-full translate-y-full"
                  isVisible={isVisible(leftoverWidth)}
                />
                <DimensionLabel
                  dimension={additionalLength}
                  className="right-0 top-1/2 -translate-y-1/2 translate-x-full rotate-90"
                  isVisible={isVisible(additionalLength)}
                />
                <DimensionLabel
                  dimension={additionalLength}
                  className="left-0 top-1/2 -translate-y-1/2 -translate-x-full -rotate-90"
                  isVisible={isVisible(additionalLength)}
                />
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-lg font-bold text-yellow-700">Leftover</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Leftover piece dimensions: {leftoverWidth.toFixed(2)}' x {additionalLength.toFixed(2)}'
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

export default CarpetVisualization

