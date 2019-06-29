const express = require('express');
const logger = require('../logger');
const { bookmarks } = require('../store');

const bookmarkRouter = express.Router();

bookmarkRouter
    .route('/bookmarks')
    .get((req, res) => {
        res.json(bookmarks);
    })

bookmarkRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
        const { id } = req.params;
        const bookmark = bookmarks.find(bookmark => bookmark.id == id);

        if (!bookmark) {
            logger.error(`Bookmark with id of ${id} not found.`);
            return res
                .status(404)
                .send('Bookmark Not Found');
        }
        res.json(bookmark);
    })
    .delete((req, res) => {
        const { id } = req.params;
        const bookmarkIndex = bookmarks.findIndex(b => b.id == id);

        if (bookmarkIndex === -1) {
            logger.error(`Bookmark with id of ${id} not found.`);
            return res
                .status(404)
                .send('Bookmark Not Found')
        }
        bookmarks.splice(bookmarkIndex, 1);

        logger.info(`Bookmark with id of ${id} deleted.`);

        res
            .status(204)
            .end();
    });

    module.exports = bookmarkRouter