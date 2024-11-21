'use client'

import { useState } from 'react'
import { BarcodeScanner } from './BarcodeScanner'
import { ProductDisplay } from './ProductDisplay'
import { QrCodeIcon } from '@heroicons/react/24/solid'

export function FoodScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [productData, setProductData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleBarcodeScan = async (barcode: string) => {
    setIsScanning(false)
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
      const data = await response.json()

      if (data.status === 1) {
        setProductData(data.product)
        console.log(data.product)
      } else {
        setError('Product not found. Please try again.')
      }
    } catch (err) {
      setError('An error occurred while fetching product data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {!isScanning && !productData && (
        <button
          onClick={() => setIsScanning(true)}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out flex items-center justify-center"
        >
          <QrCodeIcon className="h-6 w-6 mr-2" />
          Scan Barcode
        </button>
      )}
      {isScanning && (
        <BarcodeScanner onScan={handleBarcodeScan} onClose={() => setIsScanning(false)} />
      )}
      {isLoading && <p className="text-center text-gray-600">Loading product information...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {productData && <ProductDisplay product={productData} onBack={() => setProductData(null)} />}
    </div>
  )
}

