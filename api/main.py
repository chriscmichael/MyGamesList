from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
from routers import games, mgls, accounts
import os


app = FastAPI()

origins = [
    os.environ.get("REACT_APP_API_HOST", None),
    os.environ.get("PUBLIC_URL", None),
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
