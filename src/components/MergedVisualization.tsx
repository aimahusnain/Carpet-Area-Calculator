import React from 'react'
import MergedVisualization from './MergedVisualization'

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
  const scale = 800 / maxDimension

  const Rectangle = ({ width, height, color, label }: { width: number, height: number, color: string, label: string }) => (
    <div className="relative mb-16">
      <div
        className={`border-2 ${color} opacity-50 flex items-center justify-center`}
        style={{
          width: `${width * (scale / 4)}px`,
          height: `${height * (scale / 4)}px`,
        }}
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-xs">
          {`${width}'`}
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white px-1 text-xs">
          {`${width}'`}
        </div>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white px-1 text-xs vertical-text">
          {`${height}'`}
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white px-1 text-xs vertical-text">
          {`${height}'`}
        </div>
        <div className="text-xs font-bold text-gray-700 text-center">
          {label}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-16">
      <Rectangle
        width={roomLength}
        height={roomWidth}
        color="border-blue-500 bg-blue-200"
        label="Room"
      />
      <Rectangle
        width={roomLength}
        height={carpetWidth}
        color="border-green-500 bg-green-200"
        label="Carpet"
      />
      {additionalLength > 0 && (
        <Rectangle
          width={additionalLength}
          height={carpetWidth}
          color="border-red-500 bg-red-200"
          label="Cut Piece"
        />
      )}
      
      {/* Merged Visualization */}
      <MergedVisualization
        roomLength={roomLength}
        roomWidth={roomWidth}
        carpetWidth={carpetWidth}
        additionalLength={additionalLength}
        scale={25}
      />
    </div>
  )
}

export default CarpetVisualization
