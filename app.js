const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "swordfish";

app.post("/Generate_Token", (req, res) => {
  const { login, password } = req.body;
  const token = jwt.sign({ login, password }, SECRET_KEY);
  res.json({ token });
});

app.get("/Tracking_Parcel", async (req, res) => {
  const { tracking_number } = req.query;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NzIzMjY1NTUsImV4cCI6MTcwMzg2MjU1NSwiYXVkIjoiaHR0cHM6Ly9icmluZ2VycGFyY2VsLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNTI1eXM2YWh4d3UyIiwianRpIjoiZDdlZGE3NDgtNzMxOS00YWIzLWI2MGEtMDEzMzI0NmVkNmY2In0.uJi6d6-E2zDWj24wryh2sVWKs4ceny4QllbrHrzK5L0";

  try {
    const response = await axios.get(
      `https://bps.bringer.io/public/api/v2/get/parcel/tracking.json?tracking_number=${tracking_number}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Received", response.data)
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
