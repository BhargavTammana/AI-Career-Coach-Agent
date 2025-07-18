
# AI Career Coach Agent

**AI Career Coach Agent** is a modern, AI-powered career platform built with Next.js. It helps users make smarter career decisions by providing interactive career Q&A, resume analysis, and personalized learning roadmaps. Whether you're a student, job seeker, or professional, this app guides you at every step of your career journey.

---

## 🚀 Features

- **AI Career Q&A Chat:** Get instant, tailored career advice, interview tips, and industry insights from an intelligent agent.
- **AI Resume Analyzer:** Upload your resume (PDF) and receive a detailed analysis, section scores, strengths, weaknesses, and actionable improvement tips.
- **Career Roadmap Generator:** Generate a visual, step-by-step learning roadmap for any position or skill, with curated resources and branching paths.
- **User History:** Track previous chats, resume analyses, and generated roadmaps for future reference.
- **Modern UI:** Responsive, accessible design with Tailwind CSS and custom components.

---

## 🛠️ Technologies Used

- **Next.js** (App Router)
- **React** & TypeScript
- **Tailwind CSS** (custom themes)
- **Drizzle ORM** (PostgreSQL)
- **Inngest** (event-driven AI agent orchestration)
- **Clerk** (authentication)
- **LangChain** (PDF parsing)
- **ImageKit** (file uploads)
- **Lucide Icons** (UI icons)

---

## ⚡ Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database
- API keys for Gemini, Clerk, ImageKit, etc.

### Installation

1. **Clone the repository:**
   ```powershell
   git clone https://github.com/BhargavTammana/AI-Career-Coach-Agent.git
   cd AI-Career-Coach-Agent
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env.local` and fill in your API keys and database connection strings.

4. **Run database migrations:**
   ```powershell
   npx drizzle-kit push
   ```

5. **Start the development server:**
   ```powershell
   npm run dev
   ```

6. **Access the app:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 Usage

- **Sign Up / Sign In:** Authenticate using Clerk.
- **Dashboard:** Access all AI tools from the dashboard.
- **AI Career Q&A Chat:** Start a new chat or continue previous conversations.
- **AI Resume Analyzer:** Upload your resume and view detailed feedback.
- **Career Roadmap Generator:** Enter a position/skill to generate a personalized roadmap.

---

## 📁 Project Structure

```
app/                # Next.js app routes and pages
components/         # Reusable UI components
configs/            # Database and schema configs
context/            # React context providers
hooks/              # Custom React hooks
inngest/            # Inngest agent and function definitions
lib/                # Utility functions
public/             # Static assets
```

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## ❓ FAQ

**Q: Who can use this app?**  
A: Anyone looking to improve their career prospects, from students to professionals.

**Q: What file format does the Resume Analyzer accept?**  
A: PDF only.

**Q: Is my data secure?**  
A: Yes, authentication is handled by Clerk and sensitive data is stored securely.

---

## 📬 Contact

For questions, feedback, or support, please contact [Bhargav Tammana](mailto:bhargavt.tammana@gmail.com).

