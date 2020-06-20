const express = require('express');
const mongoose = require('mongoose');
const upload = require('../services/file-upload');
const s3 = require('../services/aws-config');
const checkAuth = require('../auth/check-auth');

const router = express.Router();

const Room = require("../models/room");

router.post("/", checkAuth, upload.single('arModel'), (req, res, next) => {
    console.log(req.file);
    const room = new Room({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        password: req.body.password,
        users: [req.body.creatorId],
        arModelKey: req.file.key
    })
    room
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created room successfully",
                createdRoom: {
                    name: result.name,
                    users: result.users,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:8082/rooms/" + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/arModels/:roomId", (req, res, next) => {
    const id = req.params.roomId;
    Room.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            if (result) {

                const options = {
                    Bucket: 'holospace-app',
                    Key: result.arModelKey,
                };
            
                res.status(200).attachment(result.arModelKey);
                const fileStream = s3.getObject(options).createReadStream();
                fileStream.pipe(res);
            } else {
                res.status(404).json({
                    message: 'Room not found'
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

router.get("/:roomId", checkAuth, (req, res, next) => {
    const id = req.params.roomId;
    Room.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: 'Room not found'
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

router.patch("/:roomId", checkAuth, (req, res, next) => {
    const id = req.params.roomId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Room.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:roomId", checkAuth, (req, res, next) => {
    const id = req.params.roomId;
    Room.deleteOne({ _id: id })
        .exec()
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({
                    message: "Deleted room successfully",
                    deletedRoomId: id
                });
            } else {
                res.status(404).json({
                    message: 'Room not found'
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

module.exports = router;