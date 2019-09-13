const express = require('express');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://prithvi92:Ric123@clustertest-4qkxq.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "test";
var database, collection;

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.listen(3000, () => {
    console.log("Server running on localhost:3000");
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("user");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.post('/api/user/login', (req, res) => {
    console.log(req.body);
    collection.find(req.body).toArray(function (err, docs) {
        if (err) {
            res.sendStatus(404);
            throw err;
        } else {
            console.log(docs);
            if (docs.length === 1 && docs[0].username === req.body.username && docs[0].password === req.body.password) {
                res.send({
                    status: 200,
                    message: "login successful"
                });
            } else {
                res.sendStatus(404);
            }
        }
    });

});