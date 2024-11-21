import { ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'

interface ProductDisplayProps {
  product: any
  onBack: () => void
}

export function ProductDisplay({ product, onBack }: ProductDisplayProps) {
  const nutriscoreGrade = product.nutriscore_grade?.toUpperCase() || 'Unknown'
  const ecoscore = product.ecoscore_grade?.toUpperCase() || 'Unknown'
  const novaGroup = product.nova_group || 'Unknown'

  const allergens = product.allergens_tags?.map((allergen: string) => allergen.replace('en:', '')) || []
  const traces = product.traces_tags?.map((trace: string) => trace.replace('en:', '')) || []

  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="flex items-center text-green-600 hover:text-green-700 transition duration-300 ease-in-out"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Scanner
      </button>
      
      <div className="flex items-center space-x-4">
        {product.image_front_small_url && (
          <img
            src={product.image_front_small_url}
            alt={product.product_name}
            className="w-32 h-32 object-cover rounded-lg"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{product.product_name}</h2>
          <p className="text-gray-600">{product.brands}</p>
          <p className="text-sm text-gray-500">{product.quantity}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <ScoreCard title="Nutri-Score" score={nutriscoreGrade} />
        <ScoreCard title="Eco-Score" score={ecoscore} />
        <ScoreCard title="NOVA Group" score={novaGroup.toString()} />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Nutrition Facts (per 100g)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <NutrientCard title="Energy" value={`${product.nutriments?.energy_100g || 'N/A'} kcal`} />
          <NutrientCard title="Fat" value={`${product.nutriments?.fat_100g || 'N/A'} g`} />
          <NutrientCard title="Saturated Fat" value={`${product.nutriments?.['saturated-fat_100g'] || 'N/A'} g`} />
          <NutrientCard title="Carbohydrates" value={`${product.nutriments?.carbohydrates_100g || 'N/A'} g`} />
          <NutrientCard title="Sugars" value={`${product.nutriments?.sugars_100g || 'N/A'} g`} />
          <NutrientCard title="Fiber" value={`${product.nutriments?.fiber_100g || 'N/A'} g`} />
          <NutrientCard title="Proteins" value={`${product.nutriments?.proteins_100g || 'N/A'} g`} />
          <NutrientCard title="Salt" value={`${product.nutriments?.salt_100g || 'N/A'} g`} />
          <NutrientCard title="Sodium" value={`${product.nutriments?.sodium_100g || 'N/A'} g`} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredients</h3>
        <p className="text-gray-600">{product.ingredients_text || 'No ingredient information available.'}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Allergens and Traces</h3>
        {(allergens.length > 0 || traces.length > 0) ? (
          <div className="space-y-4">
            {allergens.length > 0 && (
              <div>
                <h4 className="text-lg font-medium text-red-600 flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                  Contains:
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  {allergens.map((allergen, index) => (
                    <li key={index}>{allergen}</li>
                  ))}
                </ul>
              </div>
            )}
            {traces.length > 0 && (
              <div>
                <h4 className="text-lg font-medium text-yellow-600">May contain traces of:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {traces.map((trace, index) => (
                    <li key={index}>{trace}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-600">No allergen information available.</p>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Additional Information</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Categories: {product.categories || 'N/A'}</li>
          <li>Packaging: {product.packaging || 'N/A'}</li>
          <li>Countries: {product.countries || 'N/A'}</li>
          <li>Labels: {product.labels || 'None'}</li>
          <li>Food groups: {product.food_groups || 'N/A'}</li>
        </ul>
      </div>
    </div>
  )
}

function ScoreCard({ title, score }: { title: string; score: string }) {
  const getScoreColor = (score: string) => {
    const colors: { [key: string]: string } = {
      A: 'bg-green-500',
      B: 'bg-light-green-500',
      C: 'bg-yellow-500',
      D: 'bg-orange-500',
      E: 'bg-red-500',
    }
    return colors[score] || 'bg-gray-500'
  }

  return (
    <div className="bg-gray-100 rounded-lg p-4 flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-full ${getScoreColor(score)} flex items-center justify-center`}>
        <span className="text-white font-bold text-xl">{score}</span>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <p className="text-lg font-semibold text-gray-800">{score}</p>
      </div>
    </div>
  )
}

function NutrientCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h4 className="text-sm font-medium text-gray-500">{title}</h4>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  )
}

