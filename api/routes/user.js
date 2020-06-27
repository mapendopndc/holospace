const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRooms = require('../middleware/user-rooms');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length > 0) {
            return res.status(409).json({
                message: "Email already exists."
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: 'User created'
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        });
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email})
        .exec()
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        user_id: user.id
                    });
                }
                res.status(401).json({
                    message: 'Auth failed'
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/:userId", userRooms, (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(result => {
            res.status(200).json({
                userInfo: result,
                userRooms: req.userRooms
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

router.delete("/:userId", (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;