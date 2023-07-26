import express, { Application, json } from "express";
import logics from "./logics";
import middlewares from "./middlewares";

const app: Application = express();
app.use(json());

app.get("/products", logics.read);
app.get("/products/:id", logics.retrieve);

app.post("/products", logics.create);

app.patch("/products/:id", middlewares.idExists, logics.partialUpdate);

app.delete("/products/:id", middlewares.idExists, logics.destroy);


const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));