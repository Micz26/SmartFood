from dotenv import load_dotenv
import os
from pathlib import Path
# Load environment variables from .env file

# Get the API key from environment variables
env_path = Path(__file__).resolve().parents[3] / '.env'  # Assuming the .env is in the root directory

load_dotenv(dotenv_path=env_path)
API_KEY = os.getenv('OPENAI_KEY')


if API_KEY is None:
    raise ValueError('API_KEY not found in environment variables!')
