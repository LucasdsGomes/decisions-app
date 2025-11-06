# 💭 Decisions App

Aplicação fullstack desenvolvida com **Next.js**, **FastAPI** e **PostgreSQL**, que apresenta dilemas éticos do cotidiano para incentivar a reflexão sobre **tomada de decisão e comportamento profissional**.

---

📸 Preview

https://github.com/user-attachments/assets/4c2c8637-e72a-4ac4-8bd9-1cc777214def

## 🚀 Tecnologias Utilizadas

### 🧠 Backend
- **[FastAPI](https://fastapi.tiangolo.com/)**
- **SQLAlchemy** para modelagem ORM  
- **Pydantic** para validação de dados  
- **PostgreSQL** como banco de dados  
- **Uvicorn** para execução do servidor  
- **CORS Middleware** para integração com o frontend  

### 🎨 Frontend
- **[Next.js](https://nextjs.org/)** com **TypeScript**
- **React Hooks (useEffect, useState)**  
- **Fetch API** para comunicação com o backend  
- **Tailwind CSS** (opcional para estilização rápida)

---

## 🧩 Estrutura de Pastas

decisions-app/
│
├── backend/
│ ├── main.py
│ ├── models.py
│ ├── schemas.py
│ ├── database.py
│ ├── dilemmas.py # Script de seed automático do banco
│ ├── requirements.txt
│
├── frontend/
│ ├── app/
│ │ ├── page.tsx
│ │ ├── components/
│ │ └── ...
│ ├── package.json
│
└── README.md


---

**(NÃO SE ESQUEÇA DE POPULAR O BANCO COM AS PERGUNTAS PRINCIPAIS PRESENTES NO DILEMMAS.PY ANTES DE EXECUTAR!)**

## ⚙️ Como Executar o Projeto

### 1️⃣ Clonar o repositório
```
git clone https://github.com/seu-usuario/decisions-app.git
cd decisions-app
```

2️⃣ Configurar variáveis de ambiente (opcional)

Crie um arquivo .env dentro da pasta backend/:

DATABASE_URL=postgresql://user:password@db:5432/dilemmas-project


🌐 Endpoints Principais
GET /dilemmas/

Retorna todos os dilemas cadastrados no banco, com suas respectivas opções e pontuações éticas.

Exemplo de resposta:

```
[
  {
    "id": 1,
    "title": "O Colega e o Relatório",
    "description": "Você descobre que um colega alterou números...",
    "options": [
      { "text": "Ignorar e fingir que não viu.", "ethicalScore": -7 },
      { "text": "Confrontar o colega em particular.", "ethicalScore": 8 }
    ]
  }
]
```

💡 Funcionalidades

✅ Exibição dinâmica de dilemas e opções éticas
✅ Renderização automática das perguntas via fetch() no frontend
✅ Integração total entre FastAPI e Next.js via proxy (rewrites)
✅ Banco populado automaticamente com dilemas iniciais
✅ Código totalmente modular e pronto para expansão

🧠 Aprendizados

- Durante o desenvolvimento deste projeto, trabalhei com:
- Integração entre frontend e backend via API REST
- Modelagem de dados com SQLAlchemy
- Organização de schemas e seed automático do banco
- Configuração de CORS e variáveis de ambiente

🧑‍💻 Autor

Desenvolvido por Lucas de Souza Gomes

💬 Sinta-se à vontade para abrir issues, enviar pull requests ou trocar ideias sobre arquitetura e melhorias!
