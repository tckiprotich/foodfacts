import { Request, Response } from "express";
import axios from "axios";
import path from "path";

const Scan = async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../FoodScan/Views/scan.html'));
};

const ScanBarCode = async (req: Request, res: Response) => {
    try {
        const bordy = req.body;
        console.log(bordy);
        const { barcode } = req.body;

        // Validate barcode input
        if (!barcode || typeof barcode !== 'string') {
            return res.status(400).json({ error: "Invalid barcode provided" });
        }

        console.log(`Scanned barcode: ${barcode}`);

        // Fetch product data from OpenFoodFacts API
        const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json?lc=en`);

        // Check if product data exists
        if (!response.data || !response.data.product) {
            return res.status(404).json({ error: "Product not found" });
        }

        const product = response.data.product;

        // Safely access the nutriments object with default values
        const nutriments = product.nutriments || {};

        // Extract relevant details with fallback values
        const importantDetails = {
            product_name: product.product_name || 'N/A',
            brands: product.brands || 'N/A',
            ingredients_text: product.ingredients_text || 'N/A',
            nutriments: {
                energy: nutriments.energy || 'N/A',
                energy_unit: nutriments.energy_unit || 'N/A',
                fat: nutriments.fat || 0,
                saturated_fat: nutriments['saturated-fat'] || 0,
                carbohydrates: nutriments.carbohydrates || 0,
                sugars: nutriments.sugars || 0,
                fiber: nutriments.fiber || 0,
                proteins: nutriments.proteins || 0,
                salt: nutriments.salt || 0,
                sodium: nutriments.sodium || 0
            },
            image_url: product.image_url || 'N/A'
        };

        console.log(importantDetails);
        
        res.json(importantDetails);
    } catch (error: any) {
        console.error('Error fetching product data:', error.message);

        // Handle specific error cases
        if (axios.isAxiosError(error)) {
            return res.status(error.response?.status || 500).json({ error: error.response?.data?.error || "Error fetching product data" });
        }

        res.status(500).json({ error: "Internal server error" });
    }
};

const Hero = async (req: Request, res: Response) => {
    console.log(__dirname);
    res.sendFile('index.html');
};

// Export all functions as default
export default { ScanBarCode, Hero, Scan };
