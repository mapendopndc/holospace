const jwt = require('jsonwebtoken');
const Room = require("../models/room");

module.exports = (req, res, next) => {
        
/*      For iterating through users associated with the room
        If not rendered useful, think of removing reference in roomSchema

        Room.findOne({_id: id})
            .populate('users')
            .exec((err, result) => {
                if (err) return handleError(err);
                console.log("Users associated:")
                for (const user of result.users) {
                    console.log(user.email);
                }
            }) */

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;

        const id = req.params.userId;

        if (id == decoded.userId) {
            Room.find({ users: id })
                .exec()
                .then( result => {
                    req.userRooms = result;
                    next();
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        } else {
            res.status(401).json({
                error: "Not Authorized"
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed',
            err: error
        });
    }
};