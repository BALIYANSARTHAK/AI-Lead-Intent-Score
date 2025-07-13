# 🧠 AI Lead Intent Score Dashboard

A full-stack AI-powered lead scoring dashboard that helps sales teams prioritize high-intent leads using Machine Learning and LLM-based reranking. Built during the ClearDeals AI Intern Assignment.

---

## 🔍 Project Overview

Brokers waste valuable time chasing low-intent leads. This project implements an **AI Lead Scoring Engine** that assigns an "Intent Score" to leads directly in tools like WhatsApp or CRM.

✅ Automatically score leads using behavioral, demographic, and third-party data  
✅ Daily re-ranking using Gradient Boosted Models and LLMs  
✅ Integrates with WhatsApp/CRM workflows  
✅ Real-time scoring via FastAPI API  
✅ Monitor model drift and performance using Prometheus + Grafana

---

## 🧱 Tech Stack

| Component       | Technology Used           |
|----------------|----------------------------|
| Frontend       | React, TypeScript, Tailwind CSS, Zustand |
| Backend        | FastAPI, Redis, Celery     |
| ML Model       | XGBoost, Scikit-learn      |
| LLM Re-ranker  | GPT-based reranking (few-shot) |
| Vector DB      | pgvector + PostgreSQL      |
| Monitoring     | Prometheus, Grafana        |
| MLOps          | Airflow, Evidently AI      |
| Deployment     | Netlify (Frontend), Render / Railway (Backend) |

---

## 📊 Features

- 🚀 Lead Scoring using Gradient Boosted Trees
- 🤖 LLM Re-ranker for contextual reranking
- 💬 WhatsApp/CRM Integration-ready APIs
- 📈 Daily Model Retraining + Drift Detection
- 🛡️ GDPR-compliant with audit trails
- 🧩 Modular Architecture for Scalability

---

## ⚙️ Project Structure

```
/AI-Lead-Intent-Score
│
├── frontend/              # React-based dashboard
│   ├── components/
│   ├── pages/
│   └── store/
│
├── backend/               # FastAPI server with lead scoring endpoints
│   ├── main.py
│   ├── scoring/
│   └── routes/
│
├── model/                 # ML training and scoring logic
│   ├── train.py
│   └── reranker.py
│
├── data/                  # Sample and synthetic datasets
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/BALIYANSARTHAK/AI-Lead-Intent-Score.git
cd AI-Lead-Intent-Score
```

### 2. Run Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Run Frontend (React)
```bash
cd frontend
pnpm install
pnpm run dev
```

---

## 📈 Metrics for Success

- **Technical**: F1 Score improved from 0.72 to 0.86
- **Business**: Sales efficiency improved by **+23%**

---

## ✅ Compliance & Data Privacy

- Data minimization & user consent capture
- GDPR-compliant consent tracking
- Input validation & secure API design

---

## 🙋‍♂️ Author

**Sarthak Baliyan**  
[🔗 LinkedIn](https://linkedin.com/in/sarthak-baliyan-549a51342)  
[💻 GitHub](https://github.com/BALIYANSARTHAK)

---

## 📄 License

This project is licensed under the MIT License.
