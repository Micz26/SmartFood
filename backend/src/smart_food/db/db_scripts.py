import sqlite3
import json
import os

DB_PATH = 'database/fridge.db'

os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)


def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS fridge_products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            brand TEXT,
            ingredients TEXT,
            nutriments TEXT,
            ean TEXT UNIQUE
        )
    """)
    conn.commit()
    conn.close()


def add_product_to_fridge(ean, product_info):
    name = product_info.get('name', 'Unknown')
    brand = product_info.get('brand', 'Unknown')
    ingredients = product_info.get('ingredients', '')

    # 🟡 Zmieniamy dict na JSON string
    nutriments_dict = product_info.get('nutrition', {})
    nutriments_json = json.dumps(nutriments_dict)

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT OR IGNORE INTO fridge_products (name, brand, ingredients, nutriments, ean)
            VALUES (?, ?, ?, ?, ?)
        """,
            (name, brand, ingredients, nutriments_json, ean),
        )
        conn.commit()
    finally:
        conn.close()


def read_fridge():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute('SELECT name, brand, ingredients, nutriments, ean FROM fridge_products')
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            'name': row[0],
            'brand': row[1],
            'ingredients': row[2],
            'nutriments': json.loads(row[3]) if row[3] else {},
            'ean': row[4],
        }
        for row in rows
    ]
