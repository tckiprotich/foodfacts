declare module 'openfoodfacts-nodejs' {
    export function getProduct(barcode: string): Promise<any>;
}