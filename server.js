import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from 'axios';


const app = express();

app.use(cors());
app.use(
    bodyParser.json({
        type(req) {
            return true;
        },
    })
);
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

const notes = [];
let nextId = 1;


app.get("/notes", (req, res) => {
    console.log('Пришел запрос notes')
    res.send(JSON.stringify(notes));

});

app.post("/notes", (req, res) => {
    console.log('Пришел запрос на добавление заметки')
    console.log(req.body)
    notes.push({ ...req.body, id: nextId++ });
    res.status(204);
    res.end();
    console.log(notes)
});

app.delete("/notes/:id", (req, res) => {
    const noteId = Number(req.params.id);
    const index = notes.findIndex((o) => o.id === noteId);
    if (index !== -1) {
        notes.splice(index, 1);
    }
    res.status(204);
    res.end();
    console.log('Пришел запрос на удаление')
});

const port = process.env.PORT || 7070;
app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
