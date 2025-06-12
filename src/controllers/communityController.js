const { db } = require("../config/firebase");
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const result = await cloudinary.uploader.upload(req.file.path);
        let profileImage = result.secure_url;
        fs.unlinkSync(req.file.path);

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: profileImage
        });
    } catch (error) {
        // Clean up the temporary file in case of error
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: "Error uploading image", error: error.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { userId, username, content, imageUrl } = req.body;

        const docRef = await db.collection("Community").add({
            userId,
            username,
            content,
            imageUrl,
            timestamp: new Date().toISOString(),
        });

        res.status(201).json({ message: "Post created", id: docRef.id });
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error: error.message });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const snapshot = await db.collection("Community").orderBy("timestamp", "desc").get();
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection("Community").doc(id).delete();

        res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error: error.message });
    }
};

exports.addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, username, comment } = req.body;

        await db.collection("Community").doc(id).collection("Comments").add({
            userId,
            username,
            comment,
            timestamp: new Date().toISOString()
        });

        res.status(201).json({ message: "Comment added" });
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error: error.message });
    }
};
