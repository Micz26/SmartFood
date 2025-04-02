# SmartFood

## Installation

1.  Clone repository

    ```
    git clone https://github.com/Micz26/SmartFood.git
    ```

### Backend installation steps

2.  Go to backend/

    ```
    cd backend/
    ```

3.  Create new virtual environment:

    If you use _conda_

    ```
    conda create --name smart_food python=3.10
    ```

    Alternatively use any other virtual enviroment manager of your choice.

4.  Activate environment

    ```
    conda activate smart_food
    ```

5.  Make sure you use recent _pip_ version

    ```
    python -m pip install --upgrade pip
    ```

6.  Install packages

    ```
    python -m pip install -e .
    ```

## Development

### Backend development

Add needed dependencies (libraries) to dependencies in backend/pyproject.toml dependencies and run `python -m pip install -e .` again
