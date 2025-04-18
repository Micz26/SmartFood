import openai
from config import API_KEY


openai.api_key = API_KEY

food_data = {
    "chicken breast": [165, 200, "g", 31, 3.6, 0],
    "broccoli": [55, 150, "g", 3.7, 0.6, 11.2],
    "rice": [130, 100, "g", 2.7, 0.3, 28],
    "olive oil": [119, 10, "ml", 0, 13.5, 0],
    "sour-patch kids": [300, 400, "g", 0, 10, 80]
}

def format_food_dict(food_dict):
    return "\n".join(
        f"{food}: {vals[1]}{vals[2]} - {vals[0]} kcal, Protein: {vals[3]}g, Fat: {vals[4]}g, Carbs: {vals[5]}g"
        for food, vals in food_dict.items()
    )

# Generate the prompt
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

print(prompt)
print(response.choices[0].message.content)