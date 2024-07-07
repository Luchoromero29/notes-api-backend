import express from 'express'
import logger from './loggerMiddleware.js'
import cors from 'cors'

const PORT = 3000

const app = express()
app.use(express.json())

app.use(cors())
app.use(logger)

let notes = [
    {
        "id": 1,
        "content": "Me tengo que suscribir a @midudev en YouTube",
        "date": "2019-05-30T17:30:31.098Z",
        "important": true
    },
    {
        "id": 2,
        "content": "Tengo que estudiar las clases del FullStack Bootcamp",
        "date": "2019-05-30T18:39:34.091Z",
        "important": false
    },
    {
        "id": 3,
        "content": "Repasar los retos de JS de midudev",
        "date": "2019-05-30T19:20:14.298Z",
        "important": false
    }
]



app.get('/', (req, res) => {
    res.send("<h1> Hello Word! <h1>");
});

app.get('/api/notes', (req, res) => {
    console.log("Holaaa");
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.json(notes) 
    
})

app.post('/api/notes', (req, res) => {
    const note = req.body
    
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)
    
    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: note.content,
        date: new Date().toISOString()
    }
    
    notes.push(newNote)
    
    res.json(newNote)
    
})

app.use((req, res, next) => {
    res.status(404).json({
        error: "not found"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
}
)