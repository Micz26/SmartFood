import logging

from pydantic import BaseModel
from langchain_openai import ChatOpenAI

from smart_food.recipe_recommendation.config import API_KEY

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

llm = ChatOpenAI(model='gpt-4o-mini', api_key=API_KEY, temperature=0.3, max_tokens=5000)


class RecipeRecommendation(BaseModel):
    name: str
    ingredients: list[str]
    steps: list[str]
    calories: int
    protein: int
    carbo: int
    fats: int


class RecipeRecommendations(BaseModel):
    recipes: list[RecipeRecommendation]


structured_llm = llm.with_structured_output(RecipeRecommendations)


def format_food_dict(food_dict):
    return '\n'.join(
        f'{food}: {vals[1]:.1f}g - {vals[0]} kcal, Białko: {vals[2]}g, Tłuszcz: {vals[3]}g, Węglowodany: {vals[4]}g, Sól: {vals[5]}g, Stopień przetworzenia: {vals[6]}g'
        for food, vals in food_dict.items()
    )


def dict_to_response(list_of_dicts, nutrition_input):
    food_data = {}

    for dictionary in list_of_dicts:
        name = dictionary.get('name', 'Nieznany produkt')
        nutr = dictionary.get('nutriments', {})

        try:
            energy_kcal = nutr.get('energy-kcal', 0)
            energy_kcal_100g = nutr.get('energy-kcal_100g', 100) or 100
            weight = energy_kcal / energy_kcal_100g * 100
            proteins = nutr.get('proteins', 0)
            fat = nutr.get('fat', 0)
            carbs = nutr.get('carbohydrates', 0)
            sodium = nutr.get('sodium', 0)
            nova_score = nutr.get('nova-group', 0)

            food_data[name] = [energy_kcal, weight, proteins, fat, carbs, sodium, nova_score]

        except Exception as e:
            logger.warning(f"Błąd przetwarzania produktu '{name}': {e}")
            continue

    prompt = f"""
    Mam następujące składniki dostępne wraz z ich wartością odżywczą:

    {format_food_dict(food_data)}

    Użytkownik chce przygotować posiłek o orientacyjnej wartości odżywczej:
    - {nutrition_input.calories} kcal
    - {nutrition_input.protein} g białka
    - {nutrition_input.carbo} g węglowodanów
    - {nutrition_input.fats} g tłuszczów

    Zaproponuj jeden lub więcej zdrowych przepisów z wykorzystaniem tych składników 
    (niekoniecznie wszystkich ani w całości)

    Ograniczenia dietetyczne („zdrowy posiłek”):
        Przepis uznaje się za zdrowy, jeśli spełnia następujące kryteria:
            1.Zawiera co najmniej jeden składnik o wysokiej wartości odżywczej (np. warzywa, rośliny strączkowe, produkty pełnoziarniste).
            2.Nie zawiera składników wysokoprzetworzonych lub o wysokiej zawartości nasyconych kwasów tłuszczowych i sodu.


    Staraj się możliwie jak najlepiej dopasować do wskazanych wartości odżywczych. 
    Odpowiedź sformułuj w języku polskim.
    """

    response = structured_llm.invoke(prompt)

    return response
