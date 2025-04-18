from fastapi import APIRouter
from fastapi import FastAPI
import uvicorn

from smart_food.api import router


app = FastAPI()
app.include_router(router)

router = APIRouter()


if __name__ == '__main__':
    uvicorn.run('smart_food.serve:app', host='0.0.0.0', port=8000, reload=True)
