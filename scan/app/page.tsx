import Image from 'next/image'
import { FoodScanner } from '../components/FoodScanner'
import { CheckCircleIcon, ShieldCheckIcon, ChartBarIcon, LightBulbIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-green-800 mb-6">
            Discover What's in Your Food
          </h1>
          <p className="text-xl text-green-700 mb-10">
            Scan food product barcodes to get detailed nutritional information and ingredients. 
            Make informed decisions about your diet with just a quick scan!
          </p>
          <div className="max-w-xl mx-auto">
            <FoodScanner />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Empower Your Food Choices
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<CheckCircleIcon className="h-8 w-8 text-green-500" />}
              title="Instant Information"
              description="Get comprehensive nutritional data and ingredient lists in seconds."
            />
            <FeatureCard
              icon={<ShieldCheckIcon className="h-8 w-8 text-green-500" />}
              title="Allergen Alerts"
              description="Quickly identify potential allergens and dietary restrictions."
            />
            <FeatureCard
              icon={<ChartBarIcon className="h-8 w-8 text-green-500" />}
              title="Nutritional Insights"
              description="Understand Nutri-Score, NOVA groups, and other health indicators."
            />
            <FeatureCard
              icon={<LightBulbIcon className="h-8 w-8 text-green-500" />}
              title="Informed Choices"
              description="Make better decisions for your health and the environment."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <StepCard
              number="1"
              title="Scan Barcode"
              description="Use your device's camera to scan the product barcode."
            />
            <StepCard
              number="2"
              title="Process Data"
              description="Our app quickly fetches detailed product information."
            />
            <StepCard
              number="3"
              title="View Results"
              description="Get comprehensive nutritional data and make informed choices."
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Making Healthier Choices Today
          </h2>
          <p className="text-xl text-green-100 mb-10">
            Join thousands of users who are taking control of their diet and making informed decisions about their food.
          </p>
          <div className="max-w-xl mx-auto">
            <FoodScanner />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2023 Food Product Scanner. All rights reserved.</p>
          <p className="mt-2">Powered by Open Food Facts database.</p>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center max-w-xs">
      <div className="inline-block bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

