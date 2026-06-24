import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/shows", async (req, res) => {
  const response = await fetch("https://api.tvmaze.com/shows");
  const data = await response.json();
  res.json(data);
});

app.listen(3004, () => console.log("Servidor en http://localhost:3004"));
