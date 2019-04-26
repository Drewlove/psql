const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger')
const store = require('../store')

const router = express.Router()
const bodyParser = express.json()

router
.route('/bookmarks')
.get((req, res)=> {
    res.json(store)
})
.post(bodyParser, (req, res)=> {
    const {title, url, description, rating} = req.body
    const id = uuid(); 
    if(!title || !url || !description || !rating){
        logger.error(`User submitted invalid data`)
        res
        .status(400)
        .send('Invalid data')
    }
    const bookmark = {title, url, description, rating, id}
    store.push(bookmark); 
    logger.info(`Bookmark with ${id} was created`)
    res
    .status(201)
    .location(`http://localhost:8000/bookmarks/${id}`)
    .json(store)
})

router
.route('/bookmarks/:id')
.get((req, res) => {
    const {id} = req.params
    const bookmark = store.find(bookmark => bookmark.id == id); 
    if(!bookmark){
        logger.error(`bookmark with ${id} not found`)
        return res
        .status(404)
        .send({error: '404 not found'})
    }
    res.json(bookmark)
})
.delete((req, res)=> {
    const {id} = req.params; 
    const bookmarkIndex = store.findIndex(bookmark => bookmark.id == id); 
    if(bookmarkIndex === -1){
        logger.error(`Failed attempt to delete, bookmark with id ${id} not found`)
        return res
        .status(404)
        .send({error: 'invalid entry'})
    }
    const updatedStore = store.filter(bookmark => bookmark.id !== id);

    res.json(updatedStore)
})








module.exports = router