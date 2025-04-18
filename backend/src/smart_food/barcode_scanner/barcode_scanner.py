import logging

from smart_food.barcode_scanner.get_product_info import get_product_info

logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s', datefmt='%Y-%m-%d %H:%M:%S')


def barcode_scanner(barcode: str):
    try:
        product_info = get_product_info(barcode)
        return product_info
    except Exception as e:
        logging.error(f'Error retrieving product info: {e}')
        return {}
