# AI Expense Tracker

A full-stack expense tracking app that uses AI to parse natural language input.

Built by: Abhinav Anand  
GitHub: [iamabhi9v](https://github.com/iamabhi9v)  
Time to build: [2.0 Hours] (with AI assistance)

## 🎥 Demo

[Click here to watch the Video Demo](./assets/AI Expense Tracker.webm)

## 🛠️ Tech Stack

- **Mobile:** React Native, Expo, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Database:** SQLite
- **AI:** [Groq/OpenAI/Gemini] API

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- [AI Service] API key

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Add your AI API key to .env
npm run dev
```

### Mobile

```bash
cd mobile
npm install
npm start
# Scan QR code with Expo Go app
```

## 📁 Project Structure

The AI Expense Tracker project is organized into a clear client-server architecture, separating the mobile interface from the data processing logic.

The project follows a **client-server architecture**, separating the mobile interface from the AI and data processing logic.

### 📂 Backend (Node.js/Express)
Located in the `backend/` directory, this server acts as the central hub for data and AI logic.

* **`src/index.ts`** – The entry point that defines **REST API endpoints** and manages the server lifecycle.
* **`src/services/aiService.ts`** – Handles communication with the **Groq API** to convert plain text into structured JSON.
* **`src/database/database.ts`** – Manages the **SQLite connection** and executes CRUD operations for the expenses table.

### 📂 Mobile (React Native/Expo)
Located in the `mobile/` directory, this folder contains the user interface and device-side logic.

* **`App.tsx`** – Sets up the **application navigation** and global providers.
* **`src/screens/`**
    * **`ExpenseTrackerScreen.tsx`** – Main screen where users interact with input and view history.
* **`src/components/`**
    * **`ExpenseInput.tsx`** – Encapsulates the text input and the **"Add Expense"** button.
    * **`ExpenseCard.tsx`** – Reusable UI component for items with **category emojis** and delete actions.
* **`src/services/api.ts`** – Utility layer using `fetch` to communicate via your **local IP address**.
* **`src/types/`** – Defines **TypeScript interfaces** (like `Expense`) to ensure data consistency.

## 🤖 AI Prompt Design

I used this system prompt for expense parsing:
