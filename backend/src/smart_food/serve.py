from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import random
import uvicorn

app = FastAPI()


@app.post('/fridge/add')
async def add_to_fridge(file: UploadFile = File(...)):
    return {'message': 'Added product to fridge'}


@app.get('/recipes/recommend')
async def recommend_recipes():
    return {'recommended_recipes': ['Makaron z serem', 'Pizza']}


if __name__ == '__main__':
    uvicorn.run('smart_food.serve:app', host='0.0.0.0', port=8000, reload=True)
