const express = require("express");
const cors = require("cors");

const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// test route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// get all leads
app.get("/api/leads", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM leads ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.log("GET ERROR:", error);

    res.status(500).json(error);
  }
});

// add lead
app.post("/api/leads", async (req, res) => {
  const { name, phone, source, status } = req.body;

  try {
    await pool.query(
      "INSERT INTO leads (name, phone, source, status) VALUES ($1, $2, $3, $4)",
      [name, phone, source, status]
    );

    res.json({
      message: "Lead added successfully"
    });
  } catch (error) {
    console.log("POST ERROR:", error);

    res.status(500).json(error);
  }
});

// update lead status
app.put("/api/leads/:id", async (req, res) => {
  const { status } = req.body;

  try {
    await pool.query(
      "UPDATE leads SET status = $1 WHERE id = $2",
      [status, req.params.id]
    );

    res.json({
      message: "Status updated"
    });
  } catch (error) {
    console.log("PUT ERROR:", error);

    res.status(500).json(error);
  }
});

// delete lead
app.delete("/api/leads/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM leads WHERE id = $1",
      [req.params.id]
    );

    res.json({
      message: "Lead deleted"
    });
  } catch (error) {
    console.log("DELETE ERROR:", error);

    res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});