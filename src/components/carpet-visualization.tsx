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
  const scale = 200 / maxDimension

  const Rectangle = ({ width, height, color, label, dimensions }: { width: number, height: number, color: string, label: string, dimensions: string }) => (
    <div className="relative mb-16">
      <div
        className={`border-2 ${color} opacity-50`}
        style={{
          width: `${width * scale}px`,
          height: `${height * scale}px`,
        }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-gray-700">
          {label}
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xs text-gray-600">
          {`${width}'`}
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 text-xs text-gray-600">
          {`${width}'`}
        </div>
        <div className="absolute left-0 top-1/2 transform -translate-x-6 -translate-y-1/2 text-xs text-gray-600 vertical-text">
          {`${height}'`}
        </div>
        <div className="absolute right-0 top-1/2 transform translate-x-6 -translate-y-1/2 text-xs text-gray-600 vertical-text">
          {`${height}'`}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-16">
      <Rectangle
        width={roomLength}
        height={roomWidth}
        color="border-blue-500 bg-blue-100"
        label="Room"
        dimensions={`${roomLength}' x ${roomWidth}'`}
      />
      <Rectangle
        width={roomLength}
        height={carpetWidth}
        color="border-green-500 bg-green-100"
        label="Carpet"
        dimensions={`${roomLength}' x ${carpetWidth}'`}
      />
      {additionalLength > 0 && (
        <Rectangle
          width={additionalLength}
          height={carpetWidth}
          color="border-red-500 bg-red-100"
          label="Seam"
          dimensions={`${additionalLength.toFixed(2)}' x ${carpetWidth}'`}
        />
      )}
      <div className="relative mt-24">
        <div className="text-sm font-semibold mb-4">Merged Visualization</div>
        <div
          className="border-2 border-blue-500 bg-blue-100 opacity-50"
          style={{
            width: `${roomLength * scale}px`,
            height: `${roomWidth * scale}px`,
          }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xs text-gray-600">
            {`${roomLength}'`}
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 text-xs text-gray-600">
            {`${roomLength}'`}
          </div>
          <div className="absolute left-0 top-1/2 transform -translate-x-6 -translate-y-1/2 text-xs text-gray-600 vertical-text">
            {`${roomWidth}'`}
          </div>
          <div className="absolute right-0 top-1/2 transform translate-x-6 -translate-y-1/2 text-xs text-gray-600 vertical-text">
            {`${roomWidth}'`}
          </div>
          <div
            className="absolute bottom-0 left-0 border-2 border-green-500 bg-green-100 opacity-50"
            style={{
              width: `${roomLength * scale}px`,
              height: `${carpetWidth * scale}px`,
            }}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xs text-gray-600">
              {`${roomLength}'`}
            </div>
            <div className="absolute left-0 top-1/2 transform -translate-x-6 -translate-y-1/2 text-xs text-gray-600 vertical-text">
              {`${carpetWidth}'`}
            </div>
          </div>
          {additionalLength > 0 && (
            <div
              className="absolute bottom-0 right-0 border-2 border-red-500 bg-red-100 opacity-50"
              style={{
                width: `${additionalLength * scale}px`,
                height: `${carpetWidth * scale}px`,
              }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-xs text-gray-600">
                {`${additionalLength.toFixed(2)}'`}
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 text-xs text-gray-600">
                {`${additionalLength.toFixed(2)}'`}
              </div>
            </div>
          )}
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

