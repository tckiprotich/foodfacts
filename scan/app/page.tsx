import { FoodScanner } from '../components/FoodScanner'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">Food Product Scanner</h1>
        <p className="text-lg text-green-700 mb-8 text-center">
          Scan food product barcodes to get detailed nutritional information and ingredients. 
          Make informed decisions about your diet with just a quick scan!
        </p>
        <FoodScanner />
      </div>
    </main>
  )
}

