from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
import uvicorn

from smart_food.barcode_scanner import scanner
from smart_food.db.db_scripts import (
    init_db,
    add_product_to_fridge,
    read_fridge,
    delete_product_from_fridge,
    get_product_from_fridge,
)
from smart_food.recipe_recommendation.response import dict_to_response
from smart_food.api.models import BarcodeRequest, NutritionInput

router = APIRouter()


@router.post('/fridge/scan-barcode')
async def scan_barcode(payload: BarcodeRequest):
    ean = payload.ean
    product_info = scanner(ean)
    if not product_info or product_info == {}:
        return JSONResponse(status_code=404, content={'message': f'Could not find product for EAN: {ean}'})
    init_db()
    try:
        add_product_to_fridge(ean, product_info)
    except Exception as e:
        raise f'Couldnt add product with ean: {ean}, {e}' from e

    return {'message': f'Product "{ean}" added to fridge'}


@router.get('/fridge/products')
async def get_fridge_products():
    init_db()
    products = read_fridge()
    return {'fridge_products': products}


@router.post('/fridge/product_info')
async def get_product_info(payload: BarcodeRequest):
    init_db()
    ean = payload.ean

    product = get_product_from_fridge(ean)
    if not product:
        raise HTTPException(status_code=404, detail='Product not found')

    return product


@router.delete('/fridge/delete_product')
async def delete_product(payload: BarcodeRequest):
    init_db()
    ean = payload.ean

    product = get_product_from_fridge(ean)
    if not product:
        raise HTTPException(status_code=404, detail='Product doesnt exist in database')

    delete_product_from_fridge(ean)
    return {'message': f'Product with EAN {ean} has been deleted'}


@router.post('/recipes/recommend')
async def recommend_recipes(data: NutritionInput):
    init_db()
    products = read_fridge()
    recipies = dict_to_response(products, data)
    return {'recipies': recipies}


if __name__ == '__main__':
    uvicorn.run('smart_food.serve:app', host='0.0.0.0', port=8000, reload=True)
