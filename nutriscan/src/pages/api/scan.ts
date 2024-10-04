import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
  product_name: string;
  brands: string;
  ingredients_text: string;
  nutriments: {
    energy: string | number;
    energy_unit: string;
    fat: number;
    saturated_fat: number;
    carbohydrates: number;
    sugars: number;
    fiber: number;
    proteins: number;
    salt: number;
    sodium: number;
  };
  image_url: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  if (req.method === 'POST') {
    try {
      // req.body.text contains the string from the barcode scanner
      const barcodeText = req.body.text;

      // Split the string by the colon and trim any whitespace
      const barcodeNumber = barcodeText.split(':')[1].trim();

      // Log the barcode number
      console.log(barcodeNumber);
      const data = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcodeNumber}.json`
      );

      if (!data.data || !data.data.product) {
        return res.status(404).json({ error: "Product not found" });
        // Client-side redirect in case of 404
        router.push('/help-submit');
      }
      

      const product = data.data.product;

      // Safely access the nutriments object with default values
      const nutriments = product.nutriments || {};

      // Extract relevant details with fallback values
      const importantDetails = {
        product_name: product.product_name || 'N/A',
        brands: product.brands || 'N/A',
        ingredients_text: product.ingredients_text || 'N/A',
        nutriments: nutriments,
        image_url: product.image_url || 'N/A'
      };

      res.status(200).json(importantDetails);

    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}