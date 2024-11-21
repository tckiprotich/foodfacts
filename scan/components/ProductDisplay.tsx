import { ArrowLeftIcon } from '@heroicons/react/24/solid'

interface ProductDisplayProps {
  product: any
  onBack: () => void
}

export function ProductDisplay({ product, onBack }: ProductDisplayProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-green-600 hover:text-green-700 transition duration-300 ease-in-out"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Scanner
      </button>
      <div className="flex items-center space-x-4">
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-24 h-24 object-cover rounded-lg"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{product.product_name}</h2>
          <p className="text-gray-600">{product.brands}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <InfoCard title="Nutrition Grade" value={product.nutrition_grade_fr?.toUpperCase() || 'N/A'} />
        <InfoCard title="Calories" value={`${product.nutriments?.energy_100g || 'N/A'} kcal`} />
        <InfoCard title="Fat" value={`${product.nutriments?.fat_100g || 'N/A'} g`} />
        <InfoCard title="Carbs" value={`${product.nutriments?.carbohydrates_100g || 'N/A'} g`} />
        <InfoCard title="Protein" value={`${product.nutriments?.proteins_100g || 'N/A'} g`} />
        <InfoCard title="Salt" value={`${product.nutriments?.salt_100g || 'N/A'} g`} />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredients</h3>
        <p className="text-gray-600">{product.ingredients_text || 'No ingredient information available.'}</p>
      </div>
    </div>
  )
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  )
}

