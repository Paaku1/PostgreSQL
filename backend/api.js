const client = require('./connection.js');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173' // Allows access only from your React app
  }));

app.use(bodyParser.json());

const port = 3300;

app.listen(port, () => {
    console.log(`server is running on the ${port}`);
});

client.connect();

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
 
})

app.get('/users/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });

});

app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(id, "firstName", "lastName", "location") values($1, $2, $3, $4)`;
    client.query(insertQuery, [user.id, user.firstName, user.lastName, user.location], (err, result) => {
        if (!err) {
            res.send('Insertion was successful');
        } else {
            res.status(500).send(err.message);
            console.log(err.message);
        }
    });
})

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const deleteQuery = `delete from users where id = $1`;

    client.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.log(err.message);
            return res.send(500).send('!!! Failed to delete user Data !!!');
        }else{
            res.send('User Deleted Successfully!!')
        }
    });
});