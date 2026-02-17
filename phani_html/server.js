const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- Database ---
const db = new sqlite3.Database("./tripshare.db");

db.serialize(() => {
  // Users table for registration
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    role TEXT CHECK(role IN ('driver', 'passenger')),
    license TEXT,  -- For drivers
    carModel TEXT, -- For drivers
    aadhar TEXT    -- For passengers
  )`);

  // Trips table with driverGender
  db.run(`CREATE TABLE IF NOT EXISTS trips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    driverName TEXT,
    driverGender TEXT,
    origin TEXT,
    destination TEXT,
    date TEXT,
    seats INTEGER,
    cost REAL,
    vehicleNumber TEXT,
    vehicleType TEXT,
    contactNumber TEXT
  )`);

  // Requests table with passengerGender
  db.run(`CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    passengerName TEXT,
    passengerGender TEXT,
    origin TEXT,
    destination TEXT,
    date TEXT,
    numPassengers INTEGER,
    contact TEXT
  )`);

  // Payments table (basic)
  db.run(`CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tripId INTEGER,
    amount REAL,
    method TEXT,
    txnId TEXT,
    FOREIGN KEY (tripId) REFERENCES trips (id)
  )`);
});

// --- APIs ---

// Add Trip
app.post("/api/trips", (req, res) => {
  const { driverName, driverGender, origin, destination, date, seats, cost, vehicleNumber, vehicleType, contactNumber } = req.body;
  db.run(
    `INSERT INTO trips(driverName, driverGender, origin, destination, date, seats, cost, vehicleNumber, vehicleType, contactNumber)
     VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [driverName, driverGender, origin, destination, date, seats, cost, vehicleNumber, vehicleType, contactNumber],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Get all trips (with optional destination filter)
app.get("/api/trips", (req, res) => {
  const { destination } = req.query;
  let sql = `SELECT * FROM trips`;
  let params = [];
  if (destination) {
    sql += ` WHERE LOWER(destination) LIKE LOWER(?)`;
    params = [`%${destination}%`];
  }
  sql += ` ORDER BY date ASC`;
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add Passenger Request
app.post("/api/requests", (req, res) => {
  const { passengerName, passengerGender, origin, destination, date, numPassengers, contact } = req.body;
  db.run(
    `INSERT INTO requests(passengerName, passengerGender, origin, destination, date, numPassengers, contact)
     VALUES (?,?,?,?,?,?,?)`,
    [passengerName, passengerGender, origin, destination, date, numPassengers, contact],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Get all requests (with optional destination filter)
app.get("/api/requests", (req, res) => {
  const { destination } = req.query;
  let sql = `SELECT * FROM requests`;
  let params = [];
  if (destination) {
    sql += ` WHERE LOWER(destination) LIKE LOWER(?)`;
    params = [`%${destination}%`];
  }
  sql += ` ORDER BY date ASC`;
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Register user
app.post("/api/register", (req, res) => {
  const { username, role, license, carModel, aadhar } = req.body;
  if (!username || !role) return res.status(400).json({ error: "Username and role required" });
  if (role === 'driver' && (!license || !carModel)) return res.status(400).json({ error: "License and car model required for drivers" });
  if (role === 'passenger' && !aadhar) return res.status(400).json({ error: "Aadhar required for passengers" });
  db.run(
    `INSERT INTO users(username, role, license, carModel, aadhar) VALUES (?,?,?,?,?)`,
    [username, role, license, carModel, aadhar],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Update trip seats (for booking)
app.put("/api/trips/:id", (req, res) => {
  const { id } = req.params;
  const { seats } = req.body;
  db.run(`UPDATE trips SET seats = ? WHERE id = ?`, [seats, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Trip not found" });
    res.json({ message: "Trip updated" });
  });
});

// Add payment
app.post("/api/payments", (req, res) => {
  const { tripId, amount, method, txnId } = req.body;
  db.run(
    `INSERT INTO payments(tripId, amount, method, txnId) VALUES (?,?,?,?)`,
    [tripId, amount, method, txnId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Track vehicle (simulated)
app.get("/api/track/:vehicleNumber", (req, res) => {
  const { vehicleNumber } = req.params;
  // Simulated random location
  const lat = (17.3 + Math.random() * 0.2).toFixed(5);
  const lng = (78.4 + Math.random() * 0.2).toFixed(5);
  res.json({ vehicleNumber, lat, lng });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
