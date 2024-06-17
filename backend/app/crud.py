from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from passlib.context import CryptContext
from .models import UserModel
from .schemas import UserCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def get_user(db: AsyncSession, username: str):
    result = await db.execute(select(UserModel).where(UserModel.username == username))
    return result.scalars().first()

async def create_user(db: AsyncSession, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = UserModel(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)
