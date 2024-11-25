import React from "react";

interface CarpetVisualizationProps {
  roomLength: number;
  roomWidth: number;
  carpetWidth: number;
  additionalLength: number;
}

const CarpetVisualization: React.FC<CarpetVisualizationProps> = ({
  roomLength,
  roomWidth,
  carpetWidth,
  additionalLength,
}) => {
  const maxDimension = Math.max(
    roomLength,
    roomWidth,
    carpetWidth,
    additionalLength
  );
  const scale = 700 / maxDimension;

  // Adjust leftover width based on cuts
  const leftoverWidth =
    roomWidth > carpetWidth
      ? carpetWidth - (roomWidth - carpetWidth) * 2
      : carpetWidth;

  return (
    <div className="space-y-16">
      <div className="text-sm font-semibold mb-4">Merged Visualization</div>
      <div className="flex">
        <div className="relative">
          {/* Room */}
          <div
            className="relative border-2 border-blue-500 bg-blue-200 flex items-center justify-center"
            style={{
              width: `${roomWidth * scale}px`,
              height: `${roomLength * scale}px`,
            }}
          >
            {/* Room Width Labels */}
            <div className="z-50 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-sm">
              {`${roomWidth}'`}
            </div>
            <div className="z-50 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white px-1 text-sm">
              {`${roomWidth}'`}
            </div>
            {/* Room Length Labels */}
            <div className="z-50 absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white px-1 text-sm vertical-text">
              {`${roomLength}'`}
            </div>
            <div className="z-50 absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white px-1 text-sm vertical-text">
              {`${roomLength}'`}
            </div>
            <div className="text-lg font-bold text-gray-700 text-center">
              Room
            </div>

            {/* Main Carpet */}
            <div
              className="absolute bottom-0 left-0 border-2 border-green-500 bg-green-200 flex items-center justify-center"
              style={{
                width: `${carpetWidth * scale}px`,
                height: `${roomLength * scale}px`,
              }}
            >
              {/* Main Carpet Width Label */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-sm">
                {`${carpetWidth}'`}
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white px-1 text-sm">
                {`${carpetWidth}'`}
              </div>
              {/* Main Carpet Length Label */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white px-1 text-sm vertical-text">
                {`${roomLength}'`}
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white px-1 text-sm vertical-text">
                {`${roomLength}'`}
              </div>
              <div className="text-lg font-bold text-gray-700 text-center">
                Main Carpet
              </div>
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
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-sm">
                  {`${(roomWidth - carpetWidth).toFixed(2)}'`}
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white px-1 text-sm">
                  {`${(roomWidth - carpetWidth).toFixed(2)}'`}
                </div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white px-1 text-sm vertical-text">
                  {`${(roomLength / 2).toFixed(2)}'`}
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white px-1 text-sm vertical-text">
                  {`${(roomLength / 2).toFixed(2)}'`}
                </div>
                <div className="text-lg font-bold text-gray-700 text-center">
                  A
                </div>
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
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-sm">
                  {`${leftoverWidth.toFixed(2)}'`}
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white px-1 text-sm">
                  {`${leftoverWidth.toFixed(2)}'`}
                </div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white px-1 text-sm vertical-text">
                  {`${additionalLength.toFixed(2)}'`}
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white px-1 text-sm vertical-text">
                  {`${additionalLength.toFixed(2)}'`}
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
  );
};

const verticalTextStyle = `
  .vertical-text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }
`;

export default CarpetVisualization;

export { verticalTextStyle };
