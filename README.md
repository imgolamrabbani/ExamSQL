# 🎮 ExamSQL — Retro Arcade SQL Learning Game

ExamSQL is an interactive, chiptune-powered retro arcade game designed for practicing and mastering SQL queries for the **CSE 3101 (Database Systems)** course syllabus.

Features real-time SQL syntax highlighting, live database schema rendering, responsive tactile controls, touch gestures, and a chiptune synthesizer!

---

## ✨ Features
- **⚡ Live SQL Engine**: Runs fully in-browser offline using `sql.js` (WebAssembly build of SQLite).
- **📝 Monaco SQL Editor**: High-fidelity editor with auto-formatting, SQL autocomplete, and keyboard shortcuts (`Ctrl+Enter` to run, `Ctrl+S` to submit).
- **👾 Retro Arcade Aesthetics**: CRT scanline flickering, screen shakes, lasers, and custom fonts (Pixelify Sans, Share Tech Mono, Press Start 2P, VT323) with a +2px sizing boost for premium readability.
- **🎵 Retro Chiptunes**: Fully programmatic synthesizers generated on-the-fly using the HTML5 Web Audio API (no heavy audio files to load, works fully offline).
- **🕹️ Virtual Control Deck**: Drag-to-slide joysticks for navigating levels/questions and light-up buttons for arcade Cabinet controls.
- **📖 8 Progressive Levels (64 Questions)**: Covers everything from basic DDL schema creation and filtering to complex INNER/LEFT/SELF JOINs, nested subqueries, set operations, view declarations, and DML updates.
- **🔖 Bookmark System**: Save tricky questions for review. Solved answers are cached in the editor input fields, and your progress is saved locally using `localStorage`.

---

## 📁 Repository Structure
```
ExamSQL/
├── index.html          # Main HTML structure & layouts
├── README.md           # Repository documentation
├── .gitignore          # System ignores (.DS_Store, etc.)
├── css/
│   └── style.css       # Scanline effects, layouts, joystick, and overrides
└── js/
    ├── levels.js       # Complete database setups and 64 SQL questions
    └── game.js         # Game state machine, audio synth, and Monaco configs
```

---

## 🚀 How to Run Locally

Since the game uses WebAssembly (`sql.js`) and Monaco editor loaders over CDN, you can run the game by either:

1. **Option A (Simple)**: Double-click `index.html` to open it directly in your browser.
2. **Option B (Dev Server)**: Run a local static server to prevent any CORS issues if you wish to serve assets locally:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve .
   ```
   Then open `http://localhost:8000` in your web browser.

---

## 📚 Syllabus Coverage (CSE 3101)
* **Level 1: DDL Basics** — `CREATE TABLE`, primary keys, foreign keys, data constraints, `ALTER TABLE`, and `DROP TABLE`.
* **Level 2: Basic SELECT** — `WHERE`, `ORDER BY`, `LIKE` wildcard matching, `BETWEEN`, `AND/OR`, and `DISTINCT`.
* **Level 3: JOINs & Aliases** — `INNER JOIN`, `LEFT JOIN`, natural joins, and multiple join chains.
* **Level 4: Aggregate Functions** — `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY`, and `HAVING` filters.
* **Level 5: Subqueries** — Correlated nested queries, `IN`/`NOT IN`, `EXISTS`/`NOT EXISTS`, and set comparisons (`> ALL`, `> SOME`).
* **Level 6: Set Ops & Views** — `UNION`, `INTERSECT`, `EXCEPT`, Common Table Expressions (`WITH`), and `CREATE VIEW`.
* **Level 7: DML - Modify Data** — `INSERT INTO`, `UPDATE`, `DELETE`, and updates with `CASE` logic.
* **Level 8: Boss Level 🔥** — Comprehensive gauntlet matching CSE 3101 past exams (2017–2024).

Try Here- https://imgolamrabbani.github.io/ExamSQL/
