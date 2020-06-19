const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 20
    }
});

const Room = require("../models/room");

router.post("/", upload.single('arModel'), (req, res, next) => {
    console.log(req.file);
    const room = new Room({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        arModel: req.file.path
    })
    room
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created room successfully",
                createdRoom: {
                    name: result.name,
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

router.get("/:roomId", (req, res, next) => {
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

router.delete("/:roomId", (req, res, next) => {
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
})

module.exports = router;