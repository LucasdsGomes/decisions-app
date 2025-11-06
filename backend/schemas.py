# schemas.py
from pydantic import BaseModel
from typing import List, Optional

class OptionBase(BaseModel):
    id: int
    text: str
    consequence: str
    ethicalScore: int

    class Config:
        orm_mode = True

class DilemmaBase(BaseModel):
    id: int
    title: str
    description: str
    options: List[OptionBase] = []

    class Config:
        orm_mode = True
