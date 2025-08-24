# 🩺 MediScan AI

**MediScan AI** is an **AI-powered medical imaging analysis proof-of-concept (POC)** that leverages **Google Gemini (GenAI)** models to analyze chest X-ray images. It provides structured diagnostic insights including key findings and differential diagnoses with probability scores.

⚠️ **Disclaimer**: This project is strictly for **educational and demonstration purposes**. It is **not a medical device** and should **not** be used for actual medical diagnosis or treatment decisions.

---

## 🚀 Features

- 📤 **Image Upload** – Upload chest X-ray images directly from your device.
- 🤖 **AI-Powered Analysis** – Uses **Google Gemini (GenAI)** to analyze images.
- 📊 **Structured Results** – JSON output containing:
  - **Key Findings**: Concise radiology-style summary.
  - **Differential Diagnoses**: Top 3–5 possible conditions with probabilities & clinical descriptions.
- 🔄 **Error Handling & Retry** – Handles oversized images (>10MB), API issues, and allows retrying.
- ⏳ **Loading State** – Interactive loading spinner with analysis progress message.
- 📈 **Results Display** – Clean UI displaying probability bars and condition descriptions.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **AI Integration**: [Google GenAI SDK (@google/genai)](https://ai.google.dev/)
- **UI Styling**: Tailwind CSS (utility-first CSS framework)

---

## 📂 Project Structure

```bash
MediScan-AI/
├── components/              # Reusable UI components (Logo, ImageUploader, ResultsDisplay, Spinner, DiagnosisBar)
├── App.tsx                  # Main application logic, AI integration, and UI flow
├── index.tsx                # React entry point
├── types.ts                 # TypeScript type definitions (AnalysisResult, Diagnosis, etc.)
├── metadata.json            # Project metadata (name, description)
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
└── README.md                # Project documentation
```

---

## 📖 How It Works

1. **Upload an X-ray Image** 📤

   - Users can upload a chest X-ray image.

2. **AI Analysis Begins** ⚙️

   - Image is converted into a format suitable for **Google Gemini (GenAI)**.
   - A carefully crafted **radiology-style prompt** guides the model.
   - The model returns structured JSON with findings and diagnoses.

3. **Results Displayed** 📊

   - **Key Findings**: Summary of abnormalities (or normal).
   - **Differential Diagnoses**: Ranked list with probabilities.
   - **Probability Bars**: Visual representation using `DiagnosisBar` component.

4. **Retry or Reset** 🔄

   - Users can reset and upload a new image.

---

## 🖼️ Key UI Components

  - **Logo.tsx** → App logo

- **ImageUploader.tsx** → File uploader UI
- **ResultsDisplay.tsx** → Displays AI analysis results
- **Spinner.tsx** → Loading spinner animation
- **DiagnosisBar.tsx** → Probability visualization for each diagnosis

---

## 🔮 Future Improvements

- 🔍 Add **heatmap/attention map visualization** to show AI focus areas on X-ray.
- 🌐 Multi-language support for results.
- 📚 Integration with a medical knowledge base for richer explanations.
- ☁️ Deploy as a hosted demo (e.g., Vercel, Netlify).

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 🙌 Acknowledgements

- [Google GenAI](https://ai.google.dev/) for providing the Gemini models.
- [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/) community.
- [Tailwind CSS](https://tailwindcss.com/) for beautiful UI design.

