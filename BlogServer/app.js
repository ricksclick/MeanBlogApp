const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = 'mongodb+srv://clustertest-4qkxq.mongodb.net/test';

const User = require('./models/user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/user/login', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true }).then(() => {

        User.find({
            username: req.body.username, password: req.body.password
        }, function (err, user) {
            if (err) throw err;
            if (user.length === 1) {
                return res.status(200).json({
                    status: 'success',
                    data: user
                })
            } else {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Login Failed'
                })
            }

        })
    }).catch(err => { throw err; });
});

app.listen(3000, () => console.log('blog server running on port 3000!'));