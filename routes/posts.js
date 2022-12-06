// info about when posting, end = /api/post

const router = require("express").Router();
const Post = require("../models/Post");

// router.get("/", (req, res)=>{
//     res.send("post router");
// })

//making a post
router.post("/", async (req, res) => {
	const newPost = new Post(req.body);
	try {
		const savedPost = await newPost.save();
		return res.status(200).json(savedPost);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// updating a post
router.put("/:id", async (req, res) => {
	//id of the post you want to update
	try {
		const post = await Post.findById(req.params.id); //
		if (post.userId === req.body.userId) {
			//when user who made the post and who wants to update has the same Id
			await post.updateOne({
				$set: req.body,
			});
			return res.status(200).json("You have updated a post successfully!");
		} else {
			return res.status(403).json("You can only make a post on your account");
		}
	} catch (err) {
		return res.status(403).json(err);
	}
});

//delete a post
router.delete("/:id", async (req, res) => {
	//id of the post you want to delete
	try {
		const post = await Post.findById(req.params.id); //
		if (post.userId === req.body.userId) {
			//when user who made the post and who wants to update has the same Id
			await post.deleteOne({
				$set: req.body,
			});
			return res.status(200).json("You have deleted a post successfully!");
		} else {
			return res.status(403).json("You can only delete a post on your account");
		}
	} catch (err) {
		return res.status(403).json(err);
	}
});

//get one specific post
router.get("/:id", async (req, res) => {
	//id of the post you want to delete
	try {
		const post = await Post.findById(req.params.id); //
		return res.status(200).json(post);
	} catch (err) {
		return res.status(403).json(err);
	}
});

// get all posts
router.get("/timeline/all", async (req, res) => {
	Post.find({}, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			res.json(result);
		}
	});
});

// {
// 	try {
// 		const allPosts = await Post.find({});
// 		return res.status(200).json(allPosts);
// 	} catch (err) {
// 		return res.status(403).json(err);
// 	}
// });

module.exports = router;