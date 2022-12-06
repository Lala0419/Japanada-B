// info about users, end = /api/users

const router = require("express").Router();
const User = require("../models/User");

//CRUD

//update

router.put("/:id", async (req, res) => {
	//this :id is from ObjectId mongodb
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json("user information is updated");
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res
			.status(403)
			.json("You can make updates only when you are on  your account");
	}
});

//delate

router.delete("/:id", async (req, res) => {
	//this :id is from ObjectId mongodb
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			const user = await User.findByIdAndDelete(req.params.id);
			res.status(200).json("user information is deleted");
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res
			.status(403)
			.json("You can delete it only when you are on your account");
	}
});

//get one user

router.get("/:id", async (req, res) => {
	//this :id is from ObjectId mongodb
	try {
		const user = await User.findById(req.params.id);
		const { password, updatedAt, createdAt, ...other } = user._doc; //get everything except  password, updatedAt, createdAt,
		res.status(200).json(other); //get only other
	} catch (err) {
		return res.status(500).json(err);
	}
});

// //follow

// router.put("/:id/follow", async (req,res)=>{ //id of the person you want to follow

//     //conditions for when you follow
//     if(req.body.userId !== req.params.id){ //1, when you are not you dah! so this id is your id
//         try{
//             const user = await User.findById(req.params.id);
//             const currentUser = await User.findById(req.body.userId)
//             if(!user.followers.includes(req.body.userId)){ //2. when you are not following them already..
//                 await user.updateOne({
//                     $push: {
//                         followers: req.body.userId,
//                     },
//                 });
//                 await currentUser.updateOne({
//                     $push: {
//                         followings: req.params.id,
//                     }
//                 });
//             return res.status(200).json("you have followed this user succesfully!")
//             }else {
//                 return res.status(403).json("You already follow this user.")
//             }
//         }catch(err){
//             return res.status(500).json(err)
//         }
//     }else {
//         return res.status(500).json("You cannot follow yourself")
//     }
// })

// //Unfollow

// router.put("/:id/unfollow", async (req,res)=>{ //id of the person you want to follow
//     //conditions for when you follow
//     if(req.body.userId !== req.params.id){ //1, when you are not you dah! so this id is your id
//         try{
//             const user = await User.findById(req.params.id);
//             const currentUser = await User.findById(req.body.userId)
//             if(user.followers.includes(req.body.userId)){ //2. you have to be following them already..
//                 await user.updateOne({
//                     $pull: {
//                         followers: req.body.userId,
//                     },
//                 });
//                 await currentUser.updateOne({
//                     $pull: {
//                         followings: req.params.id,
//                     }
//                 });
//             return res.status(200).json("you have unfollowed this user succesfully!")
//             }else {
//                 return res.status(403).json("You have not been following this user.")
//             }
//         }catch(err){
//             return res.status(500).json(err)
//         }
//     }else {
//         return res.status(500).json("You cannot unfollow yourself")
//     }
// })

// // router.get("/", (req, res)=>{
// //     res.send("user router");
// // })

module.exports = router;
