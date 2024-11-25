import CarpetCalculator from "@/components/carpet-calculator";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-green-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
          Carpet Calculator
        </h1>
        <CarpetCalculator />
      </div>
      <div>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Carpet Calculation Guide</h1>
          <p className="mb-4">
            If the room width exceeds the selected carpet width, we need to
            account for multiple pieces to fully cover the area, with seams
            aligned along the wider side of the room.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            1. Calculating Extra Length for Seams:
          </h2>
          <p className="mb-4">
            When the room is wider than the selected carpet width, we&apos;ll
            need an additional section to cover the full width with a seam.
            Calculate the extra carpet by dividing the room length in half and
            then adding <span className="font-bold">3 inches</span> for seaming
            purposes.
          </p>
          <p className="mb-4">
            <span className="font-semibold">Example:</span> If the room is 10
            feet long, we would add 5 feet + 3 inches to the main carpet order
            length.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            2. Displaying Carpet Format:
          </h2>
          <p className="mb-4">
            I would like the spreadsheet to display the calculated carpet
            lengths in a format matching the attached sheet. Additionally,
            include a field showing any leftover carpet after cutting to the
            needed dimensions, so users can see waste amounts.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            3. Summary of Needed Fields:
          </h2>
          <ul className="list-disc list-inside mb-4">
            <li>
              <span className="font-bold">Room Dimensions:</span> User inputs
              for length and width.
            </li>
            <li>
              <span className="font-bold">Carpet Width Selection:</span>{" "}
              Dropdown to select carpet width.
            </li>
            <li>
              <span className="font-bold">Primary Carpet Length:</span> Main
              piece required based on room dimensions.
            </li>
            <li>
              <span className="font-bold">Additional Length for Seams:</span>{" "}
              Calculation for extra length, including the 3-inch seam allowance.
            </li>
            <li>
              <span className="font-bold">Leftover Carpet:</span> Display the
              remaining carpet length after cuts, if any.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-2">4. Display:</h2>
          <p>
            There is no need to include the square feet of the room display;
            leave only the carpet area square.
          </p>
        </div>
        <Image
          src="/Prposed Corrections_Page2.jpg"
          alt="Requirements Image"
          width={1000}
          height={1500}
        />
      </div>
      
    </main>
  );
}
