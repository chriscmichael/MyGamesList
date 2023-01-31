from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.authenticator import authenticator
from routers import games, accounts, mgls
import os


app = FastAPI()

origins = [
    "https://localhost:3000",
    os.environ.get("CORS_HOST", None),
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(games.router)
app.include_router(mgls.router)
