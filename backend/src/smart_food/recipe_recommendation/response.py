import openai
import logging
from smart_food.recipe_recommendation.config import API_KEY

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

openai.api_key = API_KEY


def format_food_dict(food_dict):
    return '\n'.join(
        f'{food}: {vals[1]:.1f}g - {vals[0]} kcal, Protein: {vals[2]}g, Fat: {vals[3]}g, Carbs: {vals[4]}g'
        for food, vals in food_dict.items()
    )


def dict_to_response(list_of_dicts):
    food_data = {}

    for dictionary in list_of_dicts:
        name = dictionary.get('name', 'Unknown Product')
        nutr = dictionary.get('nutriments', {})

        try:
            energy_kcal = nutr.get('energy-kcal', 0)
            energy_kcal_100g = nutr.get('energy-kcal_100g', 100) or 100  # zapobiega dzieleniu przez 0
            weight = energy_kcal / energy_kcal_100g * 100
            proteins = nutr.get('proteins', 0)
            fat = nutr.get('fat', 0)
            carbs = nutr.get('carbohydrates', 0)

            food_data[name] = [energy_kcal, weight, proteins, fat, carbs]

        except Exception as e:
            logger.warning(f"Error parsing product '{name}': {e}")
            continue

    prompt = f"""
    I have the following ingredients available with their nutritional info:

    {format_food_dict(food_data)}

    Can you suggest a healthy recipe using these ingredients (not necessarily the 
    whole amount available and not necessarily every product)? Include instructions and 
    optionally a name for the recipe. Try to use mostly what’s available.
    Start with the name of the recipe, followed by ingredients and so on. 
    """

    response = openai.chat.completions.create(model='gpt-4', messages=[{'role': 'user', 'content': prompt}])

    return str(response.choices[0].message.content)
