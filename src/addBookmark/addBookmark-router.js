const express = require('express');
const uuid = require('uuid');
const logger = require('../logger');
const { bookmarks } = require('../store');

const addBookmarkRouter = express.Router();
const bodyParser = express.json();

addBookmarkRouter
    .route('/bookmarks')
    .post(bodyParser, (req, res) => {
        const { title, url, description, rating = 1 } = req.body
        if (!title) {
            logger.error(`Title is required`)
            return res
                .status(400)
                .send('Invalid data');
        }

        if (!url) {
            logger.error(`Url is required`)
            return res 
                .status(400)
                .send('Invalid data');
        }

        if (!description) {
            logger.error(`Description is required`)
            return res
                .status(400)
                .send('Invalid data');
        }

        const id = uuid();

        const bookmark = {
            id,
            title,
            url,
            description,
            rating
        }

        bookmarks.push(bookmark);
        logger.info(`Bookmark with id of ${id} created`);

        res
            .status(201)
            .location(`http://localhost:8000/${id}`)
            .json(bookmark);
    });

module.exports = addBookmarkRouter