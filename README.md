# CuraLink: Clinical Research Intelligence Platform

CuraLink is a cutting-edge MERN-stack application designed to revolutionize how medical professionals and researchers interact with clinical literature. By combining live data retrieval from global medical databases (PubMed, OpenAlex, ClinicalTrials.gov) with advanced AI reasoning, CuraLink delivers structured, evidence-based, and heavily cited medical insights in seconds.

## 🚀 Features

- **Live Tri-Source Retrieval:** Fetches and deduplicates up to 180 relevant papers and trials in real-time.
- **Hybrid Re-Ranking Pipeline:** Utilizes BM25 and ONNX-powered MiniLM embeddings, fused with Reciprocal Rank Fusion (RRF), and re-ranked using a cross-encoder model for maximum relevance.
- **AI-Powered Synthesis:** Leverages Groq (Llama-3.3-70b-versatile) to reason over the retrieved papers and generate highly structured, heavily cited clinical answers.
- **Strict Anti-Hallucination Guardrails:** Implements contradiction detection, placeholder stripping, and numeric fact-checking (±5% tolerance) to ensure clinical safety.
- **Automated Evidence Grading:** Assigns a grade (A, B, C, or D) to every response based on the density of RCTs, meta-analyses, and cohort studies found in the sources.
- **Personalized Patient Context:** Maintains multi-turn conversation memory and factors in patient demographics, comorbidities, and locations for highly personalized answers.
- **Modern Medical UI:** A sleek, responsive frontend built with React, Tailwind CSS, and Framer Motion, featuring a clinical Teal & Sky Blue aesthetic.

## 🛠️ Technology Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Zustand (State Management).
- **Backend:** Node.js, Express.js, MongoDB, Mongoose.
- **AI & NLP:** Groq Cloud APIs, local ONNX cross-encoders (`@xenova/transformers`), standard BM25 retrieval.

## ⚙️ Local Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas cluster (or local MongoDB instance)
- Groq API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KrishnaJadhav2525/CuraLink.git
   cd CuraLink
   ```

2. **Install Dependencies**
   Run the following from the root directory:
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the `backend/` directory with the following keys:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL=llama-3.3-70b-versatile
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Run the Application**
   From the root directory:
   ```bash
   npm run dev
   ```
   *The backend will run on port 5000 and the Vite frontend on port 5173.*

## 📜 License
Developed as a proprietary clinical research tool. All rights reserved.