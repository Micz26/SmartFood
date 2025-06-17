from pydantic import BaseModel


class BarcodeRequest(BaseModel):
    ean: str


class NutritionInput(BaseModel):
    calories: int
    protein: int
    carbo: int
    fats: int
