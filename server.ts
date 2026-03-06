import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const db = new Database("attendance.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT, -- 'student', 'teacher', 'parent'
    student_id INTEGER,
    name TEXT
  );

  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    nis TEXT UNIQUE,
    class TEXT,
    photo_url TEXT, -- Reference photo for face scan
    parent_id INTEGER
  );

  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    date TEXT,
    time TEXT,
    status TEXT, -- 'present', 'late', 'absent'
    method TEXT, -- 'selfie', 'manual'
    photo_proof TEXT -- Base64 image
  );
`);

// Migration: Add photo_proof if it doesn't exist (for existing databases)
try {
  db.exec("ALTER TABLE attendance ADD COLUMN photo_proof TEXT");
} catch (e) {
  // Column might already exist, ignore error
}

// Seed initial data if empty
const userCount = db.prepare("SELECT count(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  db.prepare("INSERT INTO users (username, password, role, name) VALUES (?, ?, ?, ?)").run("admin", "admin123", "teacher", "Bapak Guru Admin");
  db.prepare("INSERT INTO users (username, password, role, name, student_id) VALUES (?, ?, ?, ?, ?)").run("siswa1", "siswa123", "student", "Budi Santoso", 1);
  db.prepare("INSERT INTO users (username, password, role, name, student_id) VALUES (?, ?, ?, ?, ?)").run("ortu1", "ortu123", "parent", "Orang Tua Budi", 1);

  db.prepare("INSERT INTO students (name, nis, class, photo_url, parent_id) VALUES (?, ?, ?, ?, ?)").run("Budi Santoso", "12345", "XII-IPA-1", "https://picsum.photos/seed/budi/400/400", 3);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password) as any;
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  app.get("/api/students", (req, res) => {
    const students = db.prepare("SELECT * FROM students").all();
    res.json(students);
  });

  app.post("/api/students", (req, res) => {
    const { name, nis, class: className, photo_url } = req.body;
    try {
      const result = db.prepare("INSERT INTO students (name, nis, class, photo_url) VALUES (?, ?, ?, ?)").run(name, nis, className, photo_url);
      // Create user for student
      db.prepare("INSERT INTO users (username, password, role, name, student_id) VALUES (?, ?, ?, ?, ?)").run(nis, "password123", "student", name, result.lastInsertRowid);
      res.json({ success: true, id: result.lastInsertRowid });
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
    }
  });

  app.get("/api/attendance/:studentId", (req, res) => {
    const { studentId } = req.params;
    const attendance = db.prepare("SELECT * FROM attendance WHERE student_id = ? ORDER BY date DESC").all(studentId);
    res.json(attendance);
  });

  app.get("/api/attendance-all", (req, res) => {
    const attendance = db.prepare(`
      SELECT a.*, s.name as student_name, s.class as student_class 
      FROM attendance a 
      JOIN students s ON a.student_id = s.id 
      ORDER BY a.date DESC, a.time DESC
    `).all();
    res.json(attendance);
  });

  app.post("/api/attendance/verify", async (req, res) => {
    const { studentId, image, verified } = req.body;
    const student = db.prepare("SELECT * FROM students WHERE id = ?").get(studentId) as any;

    if (!student) return res.status(404).json({ success: false, message: "Student not found" });

    if (!verified) {
      return res.status(400).json({ success: false, message: "Verifikasi AI gagal" });
    }

    try {
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toTimeString().split(' ')[0];
      
      const existing = db.prepare("SELECT * FROM attendance WHERE student_id = ? AND date = ?").get(studentId, date);
      if (existing) {
        return res.json({ success: false, message: "Sudah absen hari ini" });
      }

      db.prepare("INSERT INTO attendance (student_id, date, time, status, method, photo_proof) VALUES (?, ?, ?, ?, ?, ?)")
        .run(studentId, date, time, "present", "selfie", image);
      
      res.json({ success: true, message: "Absensi Selfie Berhasil!" });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ success: false, message: "Gagal menyimpan absensi" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
