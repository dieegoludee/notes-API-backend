/**
 * nodemon (npm install nodemon -D) => (-D de Desarrollo)
 * express (npm install express)
 * eslint (npm install eslint -D)
 * => CONFIGURACIÓN DE ESLINT con standard (mirar package.json)
 * standard (npm install standard -D)
 * CORS (npm install cors -E)
 */
import logger from './loggerMiddleware.js'
import cors from 'cors'
import express, { json } from 'express' // ES Module
// const express = require('express') es lo mismo
const app = express()

// const cors = require('cors')

app.use(cors())

// const logger = require('./loggerMiddleware')

app.use(json())

// MIDDLEWARE EXPRESS
app.use(logger)

let notes = [
  {
    id: 1,
    content: 'Me tengo que suscribir a @midudev en YouTube y Twitch',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Tengo que estudiar las clases del FullStack Bootcamp',
    date: '2019-05-30T17:52:25.098Z',
    important: true
  },
  {
    id: 3,
    content: 'Repasar los retos de JS de midudev',
    date: '2019-05-30T17:38:19.098Z',
    important: true
  }
]

/**
 * const app = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(notes))
    })
 */

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  // hay que pasar a numero, ya que el request siempre devuelve un string
  const id = Number(req.params.id)
  // console.log({id})
  const note = notes.find(note => note.id === id)
  // console.log({note})
  // SI ENCUENTRA LA NOTA LA MUESTRA, SI NO RETORNA ERROR 404
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note or note.content is missing...'
    })
  }

  // MAPEA TODO EL ARRAY Y RECOGE LAS IDS
  const ids = notes.map(note => note.id)
  console.log('Ids actuales => ', ids)
  // ENCUENTRA LA ID MAS GRANDE DE LAS IDS DE LAS NOTAS
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    // SI EL TYPEOF NOTE.IMPORTANT ES DIFERENTE A UNDEFINED PONE EL NOTE.IMPORTANT (QUE ES TRUE),
    // SINO LE PONE COMO FALSE
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  // RECOGE TODAS LAS NOTAS EXISTENTES Y LE AÑADE LA NUEVA === notes = notes.concat(newNote))
  notes = [...notes, newNote]

  res.status(201).json(newNote)
})

// MANEJO DE EXCEPCIÓN POR SI SE INTRODUCE UNA URL QUE NO EXISTA
app.use((req, res) => {
  // console.log(req.path)
  res.status(404).json({
    error: '404 - Not found',
    requestPath: req.path
  })
})

const PORT = process.env.PORT || 3001
// en Express se inicia el server de manera asíncrona, asi que se le pasa un callBack
// para que cuando se termine el servidor de levantarse me muestra el c.log
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/* app.listen(PORT)
console.log(`Server running on port ${PORT}`) */
