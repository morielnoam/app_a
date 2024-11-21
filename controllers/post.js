const Posts = require("../models/posts_model");
const getAllPosts = async (req, res) => {
    const filter = req.query;
    console.log(filter);
    try {
        if (filter.owner) {
            const posts = await Posts.find({ owner: filter.owner });
            return res.send(posts);
        } else {
        const posts = await Posts.find();
        return res.send(posts);
        }
    } catch {
        return res.status(400).send(err.message);
    }
};

const getPostById = async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const post = await Posts.findById(id);
            if (post) {
                return res.send(post);
            } else {
                return res.status(404).send("Post not found");
            }   
        } catch (err){
            return res.status(400).send(err.message);
        }
    }    
    return res.status(400).send(err.message);
};

const createPost = async (req, res) => {
    console.log(req.body);
    try {
        const post = await Posts.create(req.body);
        res.status(201).send(post);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const deletePost = (req, res) => {
    console.log("Posts delete service");
    res.send("Posts delete service");
};

module.exports = {getAllPosts, getPostById, createPost, deletePost};