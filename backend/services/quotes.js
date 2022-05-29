const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        'SELECT * FROM posts;'
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function create(post) {
    const result = await db.query(
        'INSERT INTO posts(post_id,username,content,analysis) VALUES ($1, $2, $3, $4)',
        [post.post_id ?? '678678', post.username ?? 'yyyuyuy', post.content, post.analysis]
    );
    let message = 'Error in creating post';

    if (result.length) {
        message = 'post created successfully';
    }

    return {message};
}

module.exports = {
    getMultiple,
    create
}