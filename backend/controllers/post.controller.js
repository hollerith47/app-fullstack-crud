const PostModel = require("../models/post.model");

module.exports.setPost = async (req, res) => {
    try {
        if (!req.body.message) {
            res.status(400).json({message: "message is required"})
        }
        const post = await PostModel.create({
            message: req.body.message,
            author: req.body.author
        })
        res.json(post);
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Server Error"})
    }
};

module.exports.getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find({});
        res.json(posts);
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Server Error"})
    }

};

module.exports.updatePost = async (req, res) => {
    try {
        const post = await PostModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!post) {
            return res.status(404).json({message: "Post not found"})
        }
        res.json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error"})
    }
};


module.exports.deletePost = async (req, res) => {
    try {
        const post = await PostModel.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({message: "Post not found"})
        }
        res.json({message: "Post deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error"})
    }
}

module.exports.likePost = async (req, res) => {
    try {
        const post = await PostModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {likers: req.body.userId}},
            {new: true}
        );
        if (!post) {
            return res.status(404).json({message: "Post not found"})
        }
        res.json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error"})
    }
};

module.exports.dislikePost = async (req, res) => {
    try {
        const post = await PostModel.findByIdAndUpdate(
            req.params.id,
            {$pull: {likers: req.body.userId}},
            {new: true}
        );
        if (!post) {
            return res.status(404).json({message: "Post not found"})
        }
        res.json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error"})
    }
}