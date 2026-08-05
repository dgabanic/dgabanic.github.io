import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import express from "express";
import type { Store } from "./src/api/shoppingListApi";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 5174;
const dataFile = join(process.cwd(), "shopping-list-data.json");

app.use(express.json());

function readData(): Store[] {
  if (!existsSync(dataFile)) return [];
  try {
    const raw = readFileSync(dataFile, "utf8");
    return JSON.parse(raw) as Store[];
  } catch {
    return [];
  }
}

function writeData(stores: Store[]) {
  writeFileSync(dataFile, JSON.stringify(stores, null, 2), "utf8");
}

app.get("/api/shopping-list", (req, res) => {
  res.json(readData());
});

app.put("/api/shopping-list", (req, res) => {
  const stores = req.body;
  if (!Array.isArray(stores)) {
    return res.status(400).json({ message: "Invalid payload" });
  }
  writeData(stores);
  res.status(204).end();
});

app.use(express.static(join(process.cwd(), "dist")));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
