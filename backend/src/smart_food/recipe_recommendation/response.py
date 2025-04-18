import openai
from config import API_KEY


openai.api_key = API_KEY


def format_food_dict(food_dict):
    return "\n".join(
        f"{food}: {vals[1]}{vals[2]} - {vals[0]} kcal, Protein: {vals[3]}g, Fat: {vals[4]}g, Carbs: {vals[5]}g"
        for food, vals in food_dict.items()
    )





def dict_to_response(list_of_dicts):
    
    food_data = {}

    for dictionary in list_of_dicts:
        food_data['name'] = [dictionary["nutriments"]["energy-kcal"], #kalorie
                             dictionary["nutriments"]["energy-kcal"]/dictionary["nutriments"]["energy-kcal_100g"]*100, # waga (g)
                             dictionary["nutriments"]["proteins"], #białko
                             dictionary["nutriments"]["fat"], #tłuszcz
                             dictionary["nutriments"]["carbohydrates"] #węglowodany
                             ] 
        
    prompt = f"""
    I have the following ingredients available with their nutritional info:

    {format_food_dict(food_data)}

    Can you suggest a healthy recipe using these ingredients (not necesarilly the 
    whole amount availible and not necesarilly every product)? Include instructions a
    nd optionally a name for the recipe. Try to use mostly what’s available.
    Start with the name of the recipie, followed by ingredients and so on. 
    """

    response = openai.chat.completions.create(
    model="gpt-4",  
    messages = [{"role": "user", "content": prompt}])  
    
    return str(response.choices[0].message.content)                      