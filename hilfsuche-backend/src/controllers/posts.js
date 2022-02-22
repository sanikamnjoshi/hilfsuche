 ;

const PostModel = require('../models/posts');

const create = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    PostModel.create(req.body)
        .then(post => res.status(201).json(post))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const read   = (req, res) => {
    PostModel.findById(req.params.id).exec()
        .then(post => {

            if (!post) return res.status(404).json({
                error: 'Not Found',
                message: `post not found`
            });

            res.status(200).json(post)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};

const update = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    PostModel.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true}).exec()
        .then(post => res.status(200).json(post))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const remove = (req, res) => {
    PostModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `post with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const list  = (req, res) => {
    console.log('-----------list-----------');
    PostModel.find({}).exec()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const stupid  = (req, res) => {
    PostModel.find({}).exec()
        .then(
            posts => res.status(200).json([{
                message: 'success'
            }])
        )
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};



module.exports = {
    create,
    read,
    update,
    remove,
    list,
    stupid
};