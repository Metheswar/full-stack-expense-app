const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const messages = [];

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/login', (req, res) => {
    res.send(`
        <form onsubmit='localStorage.setItem("username", document.getElementById("username").value)' action="/" method="POST">
            <input id="username" type="text" name="title" placeholder="Enter your username">
            <button type="submit">Add</button>
        </form>
    `);
});

app.get('/', (req, res) => {
    const messagesList = messages.map(message => `${message.username}: ${message.message}`).join('<br>');
    res.send(`<h1>Welcome</h1>
    <form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action='/' method="POST">
    <input type="text" hidden name="username" id="username"></input>
    <input type="text" name="message"></input>
    <button type="submit">Submit</button>
    </form>
    <h1>Messages</h1>${messagesList}`);
  
});

app.post('/', (req, res) => {
    const messageData = {
        username: req.body.username,
        message: req.body.message
    };
    if(req.body.username && req.body.message){
        messages.push(messageData);
    }
    res.redirect('/');
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
