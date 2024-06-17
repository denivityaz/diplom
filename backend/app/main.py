from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from .config import settings
from app.routers import auth, users
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
