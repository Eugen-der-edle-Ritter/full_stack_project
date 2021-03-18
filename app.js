const express = require('express')
const path = require('path')
const app = express()

const CONTACTS = [
    {name: 'Eugene', age: 25},
    {name: 'Vladimir', age: 50},
    ]

app.use(express.json())

app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS)
})

app.post('/api/contacts', (req, res) => {
    const contact = {...req.body}
    CONTACTS.push(contact)
    res.status(201).json(contact)
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(8000, () => console.log('server is listening on port 8000'))
