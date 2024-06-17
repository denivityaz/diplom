from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from .. import crud, schemas
from ..dependencies import get_db, get_current_user
from ..utils import create_access_token
from ..config import settings
from datetime import timedelta
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/api", tags=["users"])

@router.post('/register', response_model=schemas.User)
async def register(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    db_user = await crud.get_user(db, user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    user = await crud.create_user(db, user)
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    response = JSONResponse(content={"message": "Registered", "access_token": access_token, "token_type": "bearer"})
    return response

@router.get("/me", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(get_current_user)):
    return current_user




# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.ext.asyncio import AsyncSession
# from app import crud, schemas
# from app.dependencies import get_db
# from fastapi.responses import JSONResponse

# router = APIRouter(prefix="/api", tags=["users"])

# @router.post('/register', response_model=schemas.User)
# async def register(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
#     db_user = await crud.get_user(db, user.username)
#     if db_user:
#         raise HTTPException(status_code=400, detail="Username already registered")
#     user = await crud.create_user(db, user)
#     response = JSONResponse(content={"message": "Registered"})
#     response.set_cookie(key="session", value="fake-session-token")
#     return response
