# 💬 MikroAI Chat

MikroAI Chat is a browser-based interactive chatbot interface using the **Gemini 2.0 Flash** free model. It allows users to send commands and receive formatted responses. Supports live code execution and multi-language UI.

---

## 🌐 Multilingual Support

- ✅ Central Kurdish (کوردیی ناوەندی)
- ✅ Arabic (العربية)
- ✅ English
- ➕ You can easily extend to more languages

---

## ⚙️ Configuration Notes

> 🛠 Please review the following requirements before running the app:

- 🔒 The system **does not store memory** – IP, username, and password must be **hardcoded** in the backend.
- 🔑 The **API Key** must be generated using **Gemini 2.0 Flash model**.
- 🤖 This system uses the **free Gemini model** for AI responses.
- 🌐 Replace `localhost` with the **actual IP or hostname** of your backend server.

---

## 🚀 How to Run

### 1. Backend Setup

- Clone the backend (Node.js with `socket.io` and a Gemini client).
- Hardcode your credentials (IP, username, password).
- Replace:
  ```js
  fetch('http://localhost:3000/operate', ...)
