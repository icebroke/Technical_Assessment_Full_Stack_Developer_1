import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import itemRoute from "./routes/item.route";
import dotenv from "dotenv";
import { dbPool } from './utils/db';

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const dbHost = process.env.DB_HOST;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/items', itemRoute);

// Not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Not found!" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.stack });
});

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
