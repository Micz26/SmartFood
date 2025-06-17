import os
from dotenv import load_dotenv

# Zakładamy, że .env jest w katalogu /app (czyli WORKDIR)
load_dotenv(dotenv_path='/app/.env')

API_KEY = os.getenv('OPENAI_KEY')

if API_KEY is None:
    raise ValueError('API_KEY not found in environment variables!')
