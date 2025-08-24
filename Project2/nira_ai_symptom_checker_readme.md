# 🤖 Nira: AI Symptom Checker

**Nira** is an **AI-powered symptom checker** that leverages the **Google Gemini (GenAI)** models to analyze user-entered symptoms. It provides potential diagnoses and next-step recommendations in a clean and user-friendly interface.

⚠️ **Disclaimer**: This tool is designed for **informational purposes only**. It is **not a substitute for professional medical advice, diagnosis, or treatment**. Always consult a licensed healthcare provider for medical concerns.

---

## 🚀 Features

- 📝 **Symptom Input** – Users can enter their symptoms in natural language.
- 🤖 **AI-Powered Analysis** – Uses Gemini AI to analyze symptoms.
- 📊 **Results Display** – Provides structured potential diagnoses and recommendations.
- ⏳ **Loading State** – Displays an interactive loading spinner during analysis.
- ❌ **Error Handling** – Alerts users when input is invalid or an API error occurs.
- 🙋 **Welcome Screen** – Shown when no results are available yet.
- 📜 **Disclaimer Component** – Ensures users understand the tool’s limitations.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **AI Integration**: [Google GenAI SDK (@google/genai)](https://ai.google.dev/)
- **UI Styling**: Tailwind CSS

---

## 📂 Project Structure

```bash
Nira-AI-Symptom-Checker/
├── components/              # UI components (Header, SymptomInputForm, ResultsDisplay, Disclaimer, LoadingSpinner, WelcomeScreen)
├── services/                # AI service integration (geminiService)
├── App.tsx                  # Main application logic
├── index.tsx                # React entry point
├── types.ts                 # TypeScript type definitions
├── metadata.json            # Project metadata (name, description)
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
└── README.md                # Project documentation
```

---

## 📖 How It Works

1. **Enter Symptoms** 📝

   - Users type their symptoms into the input form.

2. **AI Processing** ⚙️

   - The input is sent to **Google Gemini (GenAI)** through `geminiService`.
   - A structured analysis request is made.

3. **Results Returned** 📊

   - The AI provides likely diagnoses and recommendations.
   - Displayed in the `ResultsDisplay` component.

4. **User Guidance** 📜

   - `Disclaimer` reminds users the tool is not a medical substitute.

---

## 📦 Installation & Setup

1. **Clone the repository**:

```bash
git clone https://github.com/Raghav007-maker/skillCred_Projects.git
cd skillCred_Projects/Project2

```

2. **Install dependencies**:

```bash
npm install
```

3. **Set your API key**:

- Create a `.env` file in the root directory.
- Add your Google GenAI API key:

```env
API_KEY=your_google_genai_api_key_here
```

4. **Run the app locally**:

```bash
npm run dev
```

5. **Build for production**:

```bash
npm run build
```

6. **Preview production build**:

```bash
npm run preview
```

---

## 🖼️ Key UI Components

- **Header.tsx** → Displays app title/navigation
- **SymptomInputForm.tsx** → Input form for user symptoms
- **ResultsDisplay.tsx** → Displays AI-generated results
- **Disclaimer.tsx** → Informational disclaimer component
- **LoadingSpinner.tsx** → Loading animation during analysis
- **WelcomeScreen.tsx** → Displayed when no results are available

---

## 🔮 Future Improvements

- 🔍 Add **symptom history tracking** for repeated sessions.
- 🌐 Multi-language support for wider accessibility.
- 📚 Integration with trusted medical knowledge bases.
- ☁️ Deploy live demo (Vercel/Netlify).

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 🙌 Acknowledgements

- [Google GenAI](https://ai.google.dev/) for providing the Gemini models.
- [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/) community.
- [Tailwind CSS](https://tailwindcss.com/) for beautiful UI design.

