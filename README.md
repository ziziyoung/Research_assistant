# Research Assistant

A lightweight **AI-powered research assistant** that allows users to upload PDFs, index their content, and interact with the documents using Google Gemini models.

This project is designed to work well for **hackathons, demos, and early-stage prototypes**, while also being structured clearly enough for developers to extend or productionize.

---

## ✨ What This Project Does

🔗 **Live Demo**: [https://research-assistant-3ft6.vercel.app/](https://research-assistant-3ft6.vercel.app/)

> The demo is deployed on **Vercel** and is publicly accessible. It is intended for hackathon reviews and functional demonstrations.

* 📄 Upload PDF files directly from the browser
* 🔍 Extract and chunk text on the client side
* 🧠 Index and analyze content using **Gemini (gemini-2.5-flash)**
* ⚡ Fast, frontend-only demo experience
* 🚫 No backend required (by default)

Typical use cases:

* Research paper summarization
* Hackathon demos
* AI-powered document exploration
* Lightweight RAG-style indexing prototypes

---

## 🧠 How It Works (High-Level)

1. **User uploads a PDF** via the frontend
2. **PDF text is parsed locally** (browser-side)
3. Text is **chunked & indexed**
4. Each chunk (or merged chunks) is sent to **Gemini API**
5. Gemini responses are used for indexing / reasoning / summaries

> ⚠️ Important: Because this is frontend-only, all Gemini calls are made directly from the client using an API key.

---

## 🧱 Architecture Overview

```
Browser (React / TSX)
│
├─ PDF Upload
├─ PDF Parsing (client-side)
├─ Chunking / Indexing Logic (AIIndexing.tsx)
│
└─ Gemini API (gemini-2.5-flash)
```

* No server
* No database
* Ideal for demos and hackathons

---

## 🚀 Features

* ✅ PDF upload & reading
* ✅ Client-side text extraction
* ✅ AI-based indexing with Gemini
* ✅ Graceful handling of quota / rate-limit errors
* ⚠️ Free Tier quota awareness

---

## ⚙️ Tech Stack

* **Frontend**: React + TypeScript
* **PDF Parsing**: pdf.js / browser-based parsing
* **AI Model**: Google Gemini (`gemini-2.5-flash`)
* **API**: Gemini API (Direct client call)

---

## 🔑 Setup & Installation (Developers)

### 1️⃣ Clone the repo

```bash
git clone <your-repo-url>
cd research-assistant
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

> ⚠️ Never commit your real API key to GitHub.

### 4️⃣ Run locally

```bash
npm run dev
```

---

## 📦 Gemini API Quotas (Very Important)

This project currently uses **Gemini Free Tier** by default.

### Free Tier Limits (as of now)

* Model: `gemini-2.5-flash`
* **20 generate requests / day / project / model**
* Quota resets daily at **UTC 00:00**

When the quota is exceeded, you will see errors like:

```
429 RESOURCE_EXHAUSTED
Quota exceeded for generate_content_free_tier_requests
```

### Practical Implications

* Indexing a multi-page PDF can easily exhaust the daily quota
* Retrying immediately will NOT help if the daily quota is used up

### Recommended Solutions

* 🔁 Merge multiple chunks into a single request
* ⏳ Add retry + next-day resume logic
* 💳 Enable billing for Gemini API (recommended for demos & judging)

---

## 🧪 Demo / Hackathon Tips

If you are using this project for a **hackathon or demo**:

* ✅ Enable Gemini billing to avoid live demo failures
* ✅ Use short PDFs (1–5 pages)
* ✅ Prefer merged prompts instead of per-page calls
* ✅ Handle `429` errors gracefully in UI

Judges clicking your demo multiple times can otherwise exhaust the Free Tier quickly.

---

## ⚠️ Limitations

* Frontend-only API key exposure (not production-safe)
* Free Tier quota is very limited
* Not suitable for large PDFs without backend support

---

## 🛣️ Future Improvements

* Backend proxy for Gemini API
* Persistent vector storage
* Streaming responses
* Better chunking & embedding strategies
* Auth & user-level quota control

---

## 📄 License

MIT License

---

## 🙌 Acknowledgements

* Google Gemini API
* Open-source PDF parsing libraries
* Hackathon & research community
