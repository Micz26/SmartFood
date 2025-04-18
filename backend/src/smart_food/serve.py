from fastapi import APIRouter
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from smart_food.api import router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(router)


router = APIRouter()


if __name__ == '__main__':
    uvicorn.run('smart_food.serve:app', host='0.0.0.0', port=8000, reload=True)
