from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from .database import SessionLocal
from .utils import verify_access_token
from . import crud

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_db():
    async with SessionLocal() as session:
        yield session

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    payload = verify_access_token(token)
    username: str = payload.get("sub")
    if username is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await crud.get_user(db, username)
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user
