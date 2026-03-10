# create-express-app

Scaffold production-ready Express.js applications with JavaScript or TypeScript and clean, scalable architecture presets.

---

## ✨ Features

* ⚡ One-command project setup
* 🟨 JavaScript or 🟦 TypeScript support
* 🧱 Two architecture styles

  * **Small–Mid** — Simple layered architecture (fast for MVPs & startups)
  * **Mid–Large** — Modular, feature-based architecture (scales for teams & enterprise)
* 🧩 Clean folder structure
* 🛠 Preconfigured tooling
* 🚀 Ready to run in seconds

---

## 📦 Installation

No global install required.

```bash
npx create-express-app my-project
```

Or install globally:

```bash
npm install -g create-express-app
create-express-app my-project
```

---

## 🚀 Usage

```bash
npx create-express-app my-api
cd my-api
npm run dev
```

You’ll be prompted to choose:

* **Language**: JavaScript or TypeScript
* **Architecture**: Small–Mid or Mid–Large
* **Package Manager**: npm, pnpm, or yarn

---

## 🧱 Architecture Options

### 🟢 Small–Mid (Layered Architecture)

Best for:

* Startups
* MVPs
* Freelancers
* Fast-moving teams

Structure:

```
src/
├── config/
├── controllers/
├── services/
├── routes/
├── middleware/
├── validators/
├── lib/
├── types/
├── app.ts|js
└── server.ts|js
```

---

### 🔵 Mid–Large (Modular Architecture)

Best for:

* Growing products
* Large teams
* Enterprise systems
* Long-term scalability

Structure:

```
src/
├── modules/
│   ├── user/
│   ├── auth/
│   └── feature/
├── config/
├── middleware/
├── integrations/
├── lib/
├── types/
├── app.ts|js
└── server.ts|js
```

---

## 🛠 What’s Included

* Express.js setup
* TypeScript or JavaScript configuration
* Environment variable support
* Error handling middleware
* Request validation skeleton
* Controller / Service separation
* Example routes
* Dev scripts
* .env.example

---

## 📜 Scripts

### TypeScript

```bash
npm run dev     # Start dev server
npm run build   # Compile TS
npm start       # Run production build
```

### JavaScript

```bash
npm run dev     # Start dev server
npm start       # Run server
```

---

## 🎯 Who Is This For?

This tool is designed for developers who want:

* Clean project structure from day one
* Production-ready setup
* Scalable backend architecture
* Faster project bootstrapping

---

## 🗺 Roadmap

* Auth module generator
* CRUD generator
* OpenAPI / Swagger preset
* Database presets (Prisma, Mongoose)
* Microservices template

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to open a PR or start a discussion.

---

## 📄 License

MIT License
