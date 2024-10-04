import { useState } from 'react';
import { useRouter } from 'next/router';

const HelpSubmit = () => {
  const router = useRouter();
  const [product_name, setProductName] = useState('');
  const [brands, setBrands] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product_name || !brands || !image) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('product_name', product_name);
    formData.append('brands', brands);
    formData.append('image', image);

    try {
        console.log('Form data being sent:', formData);
      const response = await fetch('/api/submit-product', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccess('Product submitted successfully');
        setError('');
        // Redirect or clear form
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to submit product');
        setSuccess('');
      }
    } catch (error) {
      setError('Something went wrong, please try again later');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Help Us by Uploading Product Details</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="product_name">
              Product Name
            </label>
            <input
              id="product_name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="brands">
              Brands
            </label>
            <input
              id="brands"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={brands}
              onChange={(e) => setBrands(e.target.value)}
              placeholder="Enter product brands"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="image">
              Upload Product Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => {
                if (e.target.files) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpSubmit;
