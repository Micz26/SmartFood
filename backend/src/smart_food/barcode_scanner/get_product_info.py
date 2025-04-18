import requests
import logging


logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s', datefmt='%Y-%m-%d %H:%M:%S')


def get_product_info(barcode):
    url = f'https://world.openfoodfacts.org/api/v0/product/{barcode}.json'
    response = requests.get(url)

    if response.status_code != 200:
        logging.error(f'HTTP error {response.status_code} while fetching data for barcode: {barcode}')
        raise Exception(f'Failed to retrieve product data (HTTP status: {response.status_code})')

    product_data = response.json()
    if not product_data.get('product'):
        logging.warning(f'No product data found for barcode: {barcode}')
        raise ValueError(f'Product with barcode {barcode} not found in the database.')

    product = product_data['product']
    name = product.get('product_name', 'No name available')
    brand = product.get('brands', 'No brand information')
    ingredients = product.get('ingredients_text', 'No ingredient list')
    nutrition = product.get('nutriments', {})

    logging.info(f'Product name: {name}')
    logging.info(f'Brand: {brand}')
    logging.info(f'Ingredients: {ingredients}')
    logging.info(f'Nutrition facts: {nutrition}')

    return {'name': name, 'brand': brand, 'ingredients': ingredients, 'nutrition': nutrition}
