const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3001;
const quotes = require('../services/quotes');

const app = express();

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


app.get('/gets', async function(req, res) {
        try {
                var message = await quotes.getMultiple(1)
                res.json({message});
            } catch (err) {
                console.error(`Error while getting quotes `, err.message);
            }
});

app.post('/posts', async function(req, res) {
    try {
        console.log('req', req)
        res.json(await quotes.create(req.body));
    } catch (err) {
        console.error(`Error while posting quotes `, err.message);
    }
});


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});