let MsgModel = require('../models/MsgModel');

/*
const getMsgOut = (req, res) => {
    // @TODO: add filter: out
    MsgModel.find({}).exec()
        .then(msgs => res.status(200).json(msgs))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
}

const getMsgIn = (req, res) => {
    // @TODO: add filter: in
    MsgModel.find({}).exec()
        .then(msgs => res.status(200).json(msgs))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
}
*/

const getMsgList = (req, res) => {
    MsgModel.find({}).exec()
        .then(msgs => res.status(200).json(msgs))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
}


/* get by msg-id */
const getMsg = (req, res) => {
    MsgModel.findById(req.params.id).exec()
        .then(msg => {

            if (!msg) return res.status(404).json({
                error: 'Not Found',
                message: `Movie not found`
            });

            res.status(200).json(msg)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
}

const sendMsg = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    MsgModel.create(req.body)
        .then(msg => res.status(201).json(msg))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
}

module.exports = {
    getMsgList,
    getMsg,
    sendMsg
};
