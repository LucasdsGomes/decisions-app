# models.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Dilemma(Base):
    __tablename__ = "dilemmas"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(String(500), nullable=False)

    # Relação com Option
    options = relationship("Option", back_populates="dilemma", cascade="all, delete")

class Option(Base):
    __tablename__ = "options"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String(200), nullable=False)
    consequence = Column(String(500), nullable=False)
    ethicalScore = Column(Integer, nullable=False)

    dilemma_id = Column(Integer, ForeignKey("dilemmas.id"))
    dilemma = relationship("Dilemma", back_populates="options")
