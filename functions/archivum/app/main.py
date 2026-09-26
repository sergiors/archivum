from fastapi import FastAPI

from .routes import sources

app = FastAPI()


@app.get('/')
async def hello():
    return {'message': 'Hello World'}


app.include_router(sources.router)
