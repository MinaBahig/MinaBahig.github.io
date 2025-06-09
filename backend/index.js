const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/', (request, response) => {
    console.log('accessing the root')
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    console.log('accessing all notes')
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    console.log('accessing note #', request.params.id)
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        //response.send('Note not found')
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    console.log('deleting note #', request.params.id)
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    console.log('adding note')
    const note = request.body
    if (!note || !note.content) {
        console.log('note.content is missing')
        return response.status(400).json({ error: 'note.content is missing' })
    }
    note.important = note.important || false
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id)))
        : 0
    note.id = String(maxId + 1)
    notes = notes.concat(note)
    response.json(note).status(201)
})

app.put('/api/notes/:id', (request, response) => {
    if (!request.body.content || !request.body.id) {
        return response.status(400).json({ error: 'content or id is missing' })
    }
    const note = notes.find(note => note.id === request.body.id)
    if (!note) {
        return response.status(404).json({ error: 'note not found' })
    }
    {console.log('updating note #', request.params.id)
    const id = request.params.id
    const newNote = request.body
    notes = notes.map(note => note.id === id ? newNote : note)
    response.json(newNote).status(201)}
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})