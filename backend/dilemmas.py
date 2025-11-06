# dilemmas.py
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Dilemma, Option

from models import Base
Base.metadata.create_all(bind=engine)


def seed_dilemmas(db: Session):
    existing = db.query(Dilemma).first()
    if existing:
        print("⚠️ Dilemas já existem no banco. Nenhuma inserção feita.")
        return
    dilemmas_data = [
        {
            "title": "O Colega e o Relatório",
            "description": "Você descobre que um colega alterou números em um relatório para fazer o time parecer mais eficiente.",
            "options": [
                {
                    "text": "Ignorar e fingir que não viu.",
                    "consequence": "Você evita conflito, mas contribui para uma cultura de desonestidade.",
                    "ethicalScore": -7,
                },
                {
                    "text": "Confrontar o colega em particular.",
                    "consequence": "Você tenta resolver de forma ética e discreta, mantendo a integridade.",
                    "ethicalScore": 8,
                },
                {
                    "text": "Reportar diretamente ao chefe.",
                    "consequence": "Você age corretamente, mas pode gerar tensão e desconfiança no time.",
                    "ethicalScore": 6,
                },
            ],
        },
        {
            "title": "O Segredo do Cliente",
            "description": "Um cliente te conta algo confidencial que pode afetar o andamento do projeto.",
            "options": [
                {
                    "text": "Compartilhar com o time para evitar riscos.",
                    "consequence": "Transparente, mas quebra a confiança do cliente.",
                    "ethicalScore": -3,
                },
                {
                    "text": "Guardar o segredo até falar com o cliente novamente.",
                    "consequence": "Você mantém a confidencialidade e ganha respeito, mas assume riscos.",
                    "ethicalScore": 7,
                },
            ],
        },
        {
            "title": "O Horário de Trabalho",
            "description": "Você nota que alguns colegas estão saindo mais cedo e marcando o ponto como se tivessem ficado até o fim.",
            "options": [
                {
                    "text": "Ignorar, já que não é seu problema.",
                    "consequence": "Evita conflito, mas reforça o comportamento antiético.",
                    "ethicalScore": -6,
                },
                {
                    "text": "Falar com o grupo para regularizar a situação.",
                    "consequence": "Mostra liderança e senso de justiça.",
                    "ethicalScore": 8,
                },
                {
                    "text": "Reportar à chefia imediatamente.",
                    "consequence": "Causa desconforto, mas promove integridade.",
                    "ethicalScore": 6,
                },
            ],
        },
    ]

    for d in dilemmas_data:
        dilemma = Dilemma(title=d["title"], description=d["description"])
        db.add(dilemma)
        db.flush()  # Garante que o dilema tenha ID antes de criar as opções

        for opt in d["options"]:
            option = Option(
                text=opt["text"],
                consequence=opt["consequence"],
                ethicalScore=opt["ethicalScore"],
                dilemma_id=dilemma.id,
            )
            db.add(option)

    db.commit()
    print("✅ Dilemas inseridos com sucesso!")


if __name__ == "__main__":
    db = SessionLocal()
    seed_dilemmas(db)
    db.close()
