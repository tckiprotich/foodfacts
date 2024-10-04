import BarcodeScanner from '@/components/BarcodeScanner'
import { TextResult } from 'dynamsoft-javascript-barcode/dist/types/interface/textresult';
import Head from 'next/head'
import React from 'react';
import homeStyles from '../styles/Home.module.css';

export async function getServerSideProps() {
  let license: string | undefined = process.env.DBRLicense;
  return { props: { license: license } };
}

export default function Home(props: any) {
  const [isActive, setIsActive] = React.useState(false);
  const [initialized, setInitialized] = React.useState(false);
  const [scannedData, setScannedData] = React.useState<any>(null);

  const toggleScanning = () => {
    setIsActive(!isActive);
  }

  const onScanned = (results: TextResult[]) => {
    if (results.length > 0) {
      let text = "";
      for (let index = 0; index < results.length; index++) {
        const result = results[index];
        text += `${result.barcodeFormatString}: ${result.barcodeText}\n`;
      }
  
      alert(text);
  
      // Send the text to /api/scan
      fetch('/api/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text }) // Ensure you're sending the correct key
      })
        .then(response => {
          if (response.status === 404) {
            alert('Product not found');
            // Redirect to the help-submit page if product is not found
            window.location.href = '/help-submit';
          } else {
            return response.json(); // Proceed if no 404
          }
        })
        .then(data => {
          if (data) {
            console.log(data);
            setScannedData(data); // Store the fetched data
          }
        })
        .catch(error => console.error('Error:', error));
  
      // Stop scanning
      setIsActive(false);
    }
  };
  

  const formatLabel = (label: string) => {
    return label.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const groupNutriments = (nutriments: any) => {
    const grouped: { [key: string]: any } = {};
    for (const key in nutriments) {
      const category = key.split('_')[0];
      if (!grouped[category]) {
        grouped[category] = {};
      }
      grouped[category][key] = nutriments[key];
    }
    return grouped;
  };

  const DisplayScannedData = ({ data }: { data: any }) => {
    if (!data) return null;

    const groupedNutriments = groupNutriments(data.nutriments);

    return (
      <div className="mt-4 p-6 border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Scanned Data</h3>
        <div className="flex flex-col md:flex-row md:justify-between mb-4">
          <div className="flex-1 mb-4 md:mb-0">
            <p className="text-gray-700 mb-2"><strong>Product Name:</strong> {data.product_name}</p>
            <p className="text-gray-700 mb-2"><strong>Brands:</strong> {data.brands}</p>
            <p className="text-gray-700"><strong>Ingredients:</strong> {data.ingredients_text}</p>
          </div>
          {data.image_url && (
            <div className="flex-shrink-0 md:ml-4">
              <img src={data.image_url} alt="Product" className="rounded-lg shadow-md transition-transform transform hover:scale-105" />
            </div>
          )}
        </div>

        <h4 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Nutriments:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(groupedNutriments).map((category) => (
            <div key={category} className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
              <h5 className="text-lg font-semibold text-gray-700 mb-2">{formatLabel(category)}</h5>
              <ul className="list-none space-y-1 text-gray-600">
                {Object.keys(groupedNutriments[category]).map((key) => (
                  <li key={key} className="flex justify-between">
                    <span>{formatLabel(key)}:</span>
                    <span>{groupedNutriments[category][key]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Nutriscan</title>
        <meta name="description" content="Nutriscan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
            Barcode Scanner
          </h2>

          {initialized ? (
            <button
              onClick={toggleScanning}
              className={`w-full px-6 py-3 text-lg font-medium text-white rounded-lg focus:outline-none transition-all duration-300 ease-in-out ${isActive ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                }`}
            >
              {isActive ? "Stop Scanning" : "Start Scanning"}
            </button>
          ) : (
            <div className="text-center text-gray-500">Initializing...</div>
          )}

          <div className="mt-6">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <div className={homeStyles.barcodeScanner}>
                <BarcodeScanner
                  license={props.license}
                  onInitialized={() => setInitialized(true)}
                  isActive={isActive}
                  onScanned={(results) => onScanned(results)}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <DisplayScannedData data={scannedData} />
          </div>
        </div>
      </main>

    </>
  )
}