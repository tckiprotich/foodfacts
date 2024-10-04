import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Set desired size limit
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { barcode, product_name, brands, image } = req.body;

    // Log incoming request data
    console.log('Incoming request data:', {
      barcode,
      product_name,
      brands,
      image,
    });

    if (!barcode || !product_name || !brands || !image) {
      console.log('Validation error: All fields are required');
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const formData = new FormData();
      formData.append('code', barcode);
      formData.append('product_name', product_name);
      formData.append('brands', brands);
      formData.append('image_front', image); // Front image of the product

      // Log FormData content
      console.log('Form data being sent:', formData);

      const response = await axios.post(
        'https://world.openfoodfacts.org/cgi/product_jqm2.pl',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        }
      );

      // Log response from Open Food Facts
      console.log('Response from Open Food Facts:', response.data);

      if (response.status === 200) {
        res.status(200).json({ message: 'Product successfully submitted' });
      } else {
        console.log('Failed to submit product:', response.data);
        res.status(500).json({ error: 'Failed to submit product' });
      }
    } catch (error: any) {
      // Log detailed error information
      console.error('Error submitting product:', error.message);
      if (axios.isAxiosError(error)) {
        console.error('Axios error data:', error.response?.data);
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    console.log('Method not allowed:', req.method);
    res.status(405).json({ error: 'Method not allowed' });
  }
}