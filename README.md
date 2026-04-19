# Curalink — AI Medical Research Intelligence Platform

A full-stack MERN application that retrieves 180+ papers from 3 live databases, re-ranks them with a 5-stage hybrid AI pipeline, and synthesises structured, evidence-graded answers using Meta Llama 3.3 70B — in under 15 seconds.

## Links
- **GitHub Repository:** [https://github.com/KrishnaJadhav2525/CuraLink](https://github.com/KrishnaJadhav2525/CuraLink)

## What It Does
Curalink is not a chatbot. It is a research + reasoning system that:

- Expands your query into 4 semantic variants using Llama 3.3 70B + MeSH vocabulary
- Fetches up to 180+ results from PubMed, OpenAlex, and ClinicalTrials.gov in parallel
- Deduplicates and re-ranks papers through a 5-stage hybrid pipeline
- Sends the top-ranked papers to Llama 3.3 70B with strict anti-hallucination rules
- Returns a structured, cited, evidence-graded answer in under 15 seconds

## AI Pipeline
```text
User Input (disease + query + optional name/location)
    │
    ▼
[Stage 1] Query Expansion
    Llama 3.3 70B generates 4 semantic query variants
    MeSH controlled vocabulary mapping (e.g. "Parkinson's" → "Parkinson Disease"[MeSH])
    Synonym expansion (e.g. "immunotherapy" → "checkpoint inhibitor, PD-L1, nivolumab")
    Falls back to rule-based MeSH expansion if LLM unavailable
    │
    ▼
[Stage 2] Tri-Source Parallel Retrieval
    ├── PubMed        — NCBI E-utilities esearch + efetch, MeSH terms
    ├── OpenAlex      — 250M open academic papers, paginated search
    └── ClinicalTrials.gov v2 — recruiting + active + completed trials
    DOI/title deduplication → 180 unique papers
    │
    ▼
[Stage 3A] BM25 Keyword Scoring        (Worker Thread — non-blocking)
    Probabilistic keyword relevance scoring over all candidates
    │
    ▼
[Stage 3B] MiniLM ONNX Embeddings
    all-MiniLM-L6-v2 running in-process via @xenova/transformers
    Semantic similarity between query and paper embeddings
    │
    ▼
[Stage 3C] RRF Fusion
    Reciprocal Rank Fusion merges BM25 + embedding + recency + citation signals
    │
    ▼
[Stage 3D] ms-marco Cross-Encoder Re-ranking
    ms-marco-MiniLM-L-6-v2 scores query+document pairs together
    More accurate than bi-encoder similarity — reads context jointly
    │
    ▼
[Stage 4] LLM Reasoning — Llama 3.3 70B via Groq Cloud
    Strict anti-hallucination rules: every claim must cite a paper from context
    Evidence grading: Grade A (RCTs) → B (cohort) → C (expert opinion)
    Structured JSON output: overview, findings, treatments, implications, recommendation
    │
    ▼
[Post-Processing]
    Citation index validation — removes hallucinated references
    Disease-relevant author aggregation for researcher queries
    Deterministic trial summaries — LLM never generates trial data directly
    │
    ▼
Structured Output → SSE Stream → React Frontend
```

## Tech Stack
| Layer | Technology |
| --- | --- |
| **Frontend** | React 18, Vite, Tailwind CSS, Zustand, Framer Motion, React Router v6 |
| **Backend** | Node.js (ESM), Express.js, Server-Sent Events (SSE streaming) |
| **Database** | MongoDB Atlas — chat sessions and message history |
| **Embeddings** | all-MiniLM-L6-v2 via ONNX Runtime (@xenova/transformers, in-process) |
| **Re-ranking** | ms-marco-MiniLM-L-6-v2 cross-encoder via ONNX Runtime (in-process) |
| **LLM** | Llama 3.3 70B via Groq Cloud |
| **Query Expansion** | Llama 3.3 70B (Groq) → rule-based MeSH fallback |

## Features

### AI & Research
- **5-stage hybrid ranking:** BM25 → MiniLM bi-encoder → RRF → ms-marco cross-encoder
- **Evidence grading per response:** Grade A / B / C based on study type
- **Study type tagging:** RCT, systematic review, cohort, peer-reviewed
- **MeSH vocabulary mapping** for 20 major diseases
- **Synonym expansion** for 20 medical terms (immunotherapy, DBS, chemotherapy, etc.)
- **Disease-relevant author filtering** for researcher queries
- **Active clinical trials** with eligibility criteria and contact info
- **Full citation transparency** — every AI claim links to a real source

### Product
- Multi-turn conversation with session memory (MongoDB)
- Patient context: name, disease, location injected into pipeline
- Location-aware trial filtering ("trials in India")
- Example query buttons that auto-submit on click
- Loading skeleton while pipeline runs
- SSE real-time streaming — results appear progressively

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- Groq API key — free at console.groq.com

### 1. Clone & Install
```bash
git clone https://github.com/KrishnaJadhav2525/CuraLink.git
cd CuraLink

# Install backend
cd backend && npm install

# Install frontend
cd ../frontend && npm install
```

### 2. Configure Environment
Create `backend/.env`:
```env
MONGO_URI=your_mongodb_atlas_uri
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
PUBMED_API_KEY=your_ncbi_api_key
NODE_ENV=development
PORT=5000
```

### 3. Start Development
```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Health: `http://localhost:5000/api/health`

## Example Queries
| Disease | Query |
| --- | --- |
| Lung Cancer | Latest immunotherapy treatments |
| Parkinson's Disease | Deep brain stimulation outcomes |
| Alzheimer's Disease | Top researchers and new drug trials |
| Type 2 Diabetes | Clinical trials for GLP-1 receptor agonists |
| Heart Disease | Recent cardiovascular risk reduction studies |