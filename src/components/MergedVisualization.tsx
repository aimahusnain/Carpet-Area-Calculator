import React from 'react'

interface MergedVisualizationProps {
  roomLength: number
  roomWidth: number
  carpetWidth: number
  additionalLength: number
  scale: number
}

const MergedVisualization: React.FC<MergedVisualizationProps> = ({
  roomLength,
  roomWidth,
  carpetWidth,
  additionalLength,
  scale,
}) => (
  <div className="relative mt-24">
    <div className="text-sm font-semibold mb-4">Merged Visualization</div>
    <div className="flex">
      <div className="relative">
        <div
          className="relative border-2 border-blue-500 bg-blue-200 flex items-center justify-center"
          style={{
            width: `${roomLength * scale}px`,
            height: `${roomWidth * scale}px`,
          }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-sm">
            {`${roomLength}'`}
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white px-1 text-sm">
            {`${roomLength}'`}
          </div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white px-1 text-sm vertical-text">
            {`${roomWidth}'`}
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white px-1 text-sm vertical-text">
            {`${roomWidth}'`}
          </div>
          <div className="text-lg font-bold text-gray-700 text-center">
            Room
          </div>

          {/* Main Carpet Section */}
          <div
            className="absolute bottom-0 left-0 border-2 border-green-500 bg-green-200 flex items-center justify-center"
            style={{
              width: `${roomLength * scale}px`,
              height: `${carpetWidth * scale}px`,
            }}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-sm">
              {`${roomLength}'`}
            </div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white px-1 text-sm vertical-text">
              {`${carpetWidth}'`}
            </div>
            <div className="text-lg font-bold text-gray-700 text-center">
              Main Carpet
            </div>
          </div>

          {/* First Cut Piece Section */}
          {additionalLength > 0 && (
            <div
              className="absolute top-0 left-0 border-2 border-red-500 bg-red-200 flex items-center justify-center"
              style={{
                width: `${(roomLength / 2) * scale}px`,
                height: `${(roomWidth - carpetWidth) * scale}px`,
              }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-sm">
                {`${(roomLength / 2).toFixed(2)}'`}
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white px-1 text-sm vertical-text">
                {`${(roomWidth - carpetWidth).toFixed(2)}'`}
              </div>
              <div className="text-lg font-bold text-gray-700 text-center">
                Cut Piece 1
              </div>
            </div>
          )}

          {/* Second Cut Piece Section */}
          {additionalLength > 0 && (
            <div
              className="absolute top-0 right-0 border-2 border-purple-500 bg-purple-200 flex items-center justify-center"
              style={{
                width: `${(roomLength / 2) * scale}px`,
                height: `${(roomWidth - carpetWidth) * scale}px`,
              }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-sm">
                {`${(roomLength / 2).toFixed(2)}'`}
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white px-1 text-sm vertical-text">
                {`${(roomWidth - carpetWidth).toFixed(2)}'`}
              </div>
              <div className="text-lg font-bold text-gray-700 text-center">
                Cut Piece 2
              </div>
            </div>
          )}
        </div>

        {/* Leftover Piece */}
        {additionalLength > 0 && (
          <div
            className="absolute border-2 border-yellow-500 bg-yellow-200 flex items-center justify-center"
            style={{
              width: `${additionalLength * scale}px`,
              height: `${carpetWidth * scale}px`,
              top: '0px',
              left: `${roomLength * scale}px`,
            }}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-sm">
              {`${additionalLength.toFixed(2)}'`}
            </div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white px-1 text-sm vertical-text">
              {`${carpetWidth}'`}
            </div>
            <div className="text-lg font-bold text-gray-700 text-center">
              Leftover
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)

export default MergedVisualization
