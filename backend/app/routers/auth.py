from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import timedelta
from .. import crud, schemas
from ..dependencies import get_db
from ..utils import create_access_token, verify_access_token
from ..config import settings
from ..dependencies import oauth2_scheme
router = APIRouter(prefix="/api", tags=["auth"])

@router.post('/login')
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = await crud.get_user(db, form_data.username)
    if not user or not await crud.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@router.post('/logout')
async def logout():
    response = JSONResponse(content={"message": "Logged out"})
    response.delete_cookie(key="session")
    return response

# @router.get('/check-auth')
# async def check_auth(token: str = Depends(oauth2_scheme)):
#     payload = verify_access_token(token)
#     return {"isAuthenticated": True}
@router.get('/check-auth')
async def check_auth(token: str = Depends(oauth2_scheme)):
    payload = verify_access_token(token)
    return {"isAuthenticated": True, "username": payload["sub"]}



# from fastapi import APIRouter, Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordRequestForm
# from fastapi.responses import JSONResponse
# from sqlalchemy.ext.asyncio import AsyncSession
# from app import crud, schemas
# from app.dependencies import get_db

# router = APIRouter(prefix="/api", tags=["auth"])

# @router.post('/login')
# async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
#     user = await crud.get_user(db, form_data.username)
#     if not user or not await crud.verify_password(form_data.password, user.hashed_password):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     response = JSONResponse(content={"message": "Logged in"})
#     response.set_cookie(key="session", value="fake-session-token")
#     return response

# @router.post('/logout')
# async def logout():
#     response = JSONResponse(content={"message": "Logged out"})
#     response.delete_cookie(key="session")
#     return response

# @router.get('/check-auth')
# async def check_auth(session: str = None):
#     if session == "fake-session-token":
#         return {"isAuthenticated": True}
#     return {"isAuthenticated": False}









