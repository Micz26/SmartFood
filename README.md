# SmartFood

## Installation

### Backend installation steps

0.  Go to backend/

    ```
    cd backend/
    ```

1.  Create new virtual environment:

    If you use _conda_

    ```
    conda create --name smart_food python=3.10
    ```

    Alternatively use any other virtual enviroment manager of your choice.

2.  Activate environment

    ```
    conda activate smart_food
    ```

3.  Make sure you use recent _pip_ version

    ```
    python -m pip install --upgrade pip
    ```

4.  Install packages

    ```
    python -m pip install -e .
    ```

## Development

### Backend development

Add needed dependencies (libraries) to dependencies in backend/pyproject.toml dependencies and run `python -m pip install -e .` again
