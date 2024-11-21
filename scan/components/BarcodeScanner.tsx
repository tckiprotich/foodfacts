'use client'

import { useEffect } from 'react'
import { useZxing } from 'react-zxing'
import { XMarkIcon } from '@heroicons/react/24/solid'

interface BarcodeScannerProps {
  onScan: (barcode: string) => void
  onClose: () => void
}

export function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const { ref } = useZxing({
    onDecodeResult(result) {
      onScan(result.getText())
    },
  })

  useEffect(() => {
    return () => {
      // Clean up any resources if needed
    }
  }, [])

  return (
    <div className="relative">
      <video ref={ref} className="w-full h-64 object-cover rounded-lg" />
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-white rounded-full p-1"
        aria-label="Close scanner"
      >
        <XMarkIcon className="h-6 w-6 text-gray-600" />
      </button>
      <p className="mt-4 text-center text-gray-600">
        Position the barcode within the camera view to scan.
      </p>
    </div>
  )
}

