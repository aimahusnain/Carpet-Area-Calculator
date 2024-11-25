import React from 'react'

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
      {/* <Rectangle
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
      )} */}
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
    </div>
  )
}

const verticalTextStyle = `
  .vertical-text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }
`;

export default CarpetVisualization

export { verticalTextStyle }

