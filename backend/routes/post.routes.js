const {setPost, getPosts, updatePost, deletePost, likePost, dislikePost} = require("../controllers/post.controller");
const router = require("express").Router();

router.get('/post', getPosts)
router.post('/post', setPost)
router.put('/post/:id', updatePost)
router.delete('/post/:id', deletePost)
router.patch('/like-post/:id', likePost)
router.patch('/dislike-post/:id', dislikePost)

module.exports = router;