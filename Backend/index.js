const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment-timezone");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5000;
const multer = require("multer");
const { ObjectId } = require("mongoose").Types;

const PATH = "./public/images";
const upload = multer({
  storage: multer.diskStorage({
    destination: PATH,
    filename: function (req, file, cb) {
      let origialname = file.originalname;
      let ext = origialname.split(".").pop();
      let filename = origialname.split(".").slice(0, -1).join(".");
      cb(null, filename + "." + ext);
    },
  }),
});

//use express static folder
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.listen(port, () => {
  try {
    console.log(`Server is running ${port}`);
    mongoose.connect(
      "mongodb+srv://gameConnect:gameConnect123@cluster0.yorhdbb.mongodb.net/dbgameConnect"
    );
    console.log("db connection established");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
});

//AdminSchema

const adminSchemaStructure = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
  },
  adminPassword: {
    type: String,
    required: true,
    minlength: 6,
  },
});
const Admin = mongoose.model("adminSchema", adminSchemaStructure);

//AdminPost

app.post("/Admin", async (req, res) => {
  try {
    const { adminName, adminEmail, adminPassword } = req.body;

    let admin = await Admin.findOne({ adminEmail });

    if (admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Admin already exists" }] });
    }

    admin = new Admin({
      adminName,
      adminEmail,
      adminPassword,
    });

    await admin.save();

    res.json({ message: "Admin inserted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Admin Select or Find

app.get("/Admin", async (req, res) => {
  try {
    const admin = await Admin.find();
    if (admin.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    } else {
      res.send(admin).status(200);
    }
  } catch (err) {
    console.error("Error Finding Admin:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Admin Delete

app.delete("/Admin/:id", async (req, res) => {
  try {
    const adminId = req.params.id;
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    } else {
      res.json({ message: "Admin deleted successfully", deletedAdmin });
    }
  } catch (err) {
    console.error("Error deleting Admin:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/Admin", (req, res) => {
  res.send({ msg: "hello " });
});



//SchemaUploadGame

const uploadGameSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  uploadfile: {
    type: String,
  },
});
const UploadGame = mongoose.model('uploadGame', uploadGameSchema);

app.post('/UploadGame',
  upload.fields([
    { name: "file", maxCount: 1 },
  ]), async (req, res) => {
    var fileValue = JSON.parse(JSON.stringify(req.files));
    var uploadfile = `http://127.0.0.1:${port}/images/${fileValue.file[0].filename}`;

    const { name, desc } = req.body
    const uploadGame = new UploadGame({
      name,
      desc,
      uploadfile,

    })
    await uploadGame.save()
    res.send({ message: 'game inserted successfully' })

  })

//UploadGame Select

app.get('/UploadGameById/:Id', async (req, res) => {
  const Id = req.params.Id
  const uploadGame = await UploadGame.findById(Id)

  res.send({ uploadGame })
})


app.get('/UploadGame/:Id', async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.Id);

    const uploadGamesWithCheck = await UploadGame.aggregate([
      {
        $lookup: {
          from: "reviewheads",
          let: { gameId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", userId] },
                    { $eq: ["$gameId", "$$gameId"] }
                  ]
                }
              }
            },
            {
              $count: "reviewsCount"
            }
          ],
          as: "reviews"
        }
      },
      {
        $addFields: {
          check: {
            $cond: { if: { $gt: [{ $size: "$reviews" }, 0] }, then: true, else: false }
          }
        }
      },
      {
        $project: {
          reviews: 0 // Exclude the reviews field from the output
        }
      }
    ]);
    console.log(uploadGamesWithCheck);
    res.json(uploadGamesWithCheck);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



//userSchema



const userSchemaStructre = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userFullName: {
    type: String,
    required: true,
  },
  userContact: {
    type: String,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "placeSchema",
  },
  userPhoto: {
    type: String,
  },
  userType: {
    type: String,
  },
  userGender: {
    type: String,
  },
  userStatus: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", userSchemaStructre);

//userPost

app.post("/user", async (req, res) => {
  try {
    const { userName, userFullName, userEmail, userPassword } = req.body;
    let user = await User.findOne({ $or: [{ userName }, { userEmail }] });
    if (user) {
      return res
        .status(400)
        .json({ msg: " There is already an Account With These credentials" });
    }
    user = new User({
      userName,
      userFullName,
      userEmail,
      userPassword,
    });
    await user.save();
    res.json({ msg: "User Added" });
  } catch (err) {
    console.log(err.msg);
    res.status(500).json({ msg: "Server error" });
  }
});

//User Find

app.get("/user", async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      res.send({ msg: "No Data" });
    } else {
      res.send(user).status(200);
    }
  } catch (err) {
    console.error("error", err);
    res.status(500).json({ msg: "Server error" });
  }
});

//user Find BY Id

app.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      res.send({ msg: "No Data with this ID" });
    } else {
      res.send(user).status(200);
    }
  } catch (err) {
    console.error("error", err);
    res.status(500).json({ msg: "Server error" });
  }
});

//user total post BY Id

app.get("/user/totalposts/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const totalPosts = await PostHead.countDocuments({ userId });

    res.send({ totalPosts }).status(200);
  } catch (err) {
    console.error("error", err);
    res.status(500).json({ msg: "Server error" });
  }
});

//User Delete

app.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.json({ message: "User deleted successfully", deletedUser });
    }
  } catch (err) {
    console.error("Error Deleting User", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//User Update

app.put("/User/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { userName, userFullName, userContact, userGender } = req.body;
    const updatedAdmin = await User.findByIdAndUpdate(
      id,
      { userName, userFullName, userContact, userGender },
      { new: true }
    );
    res.json(updatedAdmin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//User Change Password

app.put("/changepassword/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { userPassword, userNewPassword } = req.body;
    const user = await User.findById(id);
    if (user) {
      const oldPass = user.userPassword;
      if (oldPass == userPassword) {
        const updatedPass = await User.findByIdAndUpdate(
          id,
          { userPassword: userNewPassword },
          { new: true }
        );
        res.send({ msg: "Password Changed", updatedPass });
      } else {
        res.send("Old Password is Not Matching");
      }
    } else {
      res.send("User Not Found");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//PostsSchema

const postSchemaStructure = new mongoose.Schema({
  postFile: {
    type: String,
    required: true,
  },
  postHeadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "postHeadschema",
    required: true,
  },
  postType: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("postschema", postSchemaStructure);

const postHeadSchemaStructure = new mongoose.Schema({
  postCaption: {
    type: String,
    required: true,
  },
  postDateTime: {
    type: String,
    default: () => moment().tz("Asia/Kolkata").format(), // Use the timezone "Asia/Kolkata" for IST
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

postSchemaStructure.pre("save", function (next) {
  this.doj = moment(this.doj).tz("Asia/Kolkata").format();
  next();
});

const PostHead = mongoose.model("postHeadschema", postHeadSchemaStructure);

//Add Image Post

app.post(
  "/addpost",
  upload.fields([{ name: "postFile", maxCount: 10 }]), // Adjust maxCount for multiple files

  async (req, res) => {
    try {
      const { postCaption, userId } = req.body;
      const postHead = new PostHead({
        postCaption,
        userId,
      });


      const postHeadCollection = await postHead.save();

      const files = req.files["postFile"]; // Get the array of files

      // Process each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isImage = file.mimetype.startsWith("image");
        const isVideo = file.mimetype.startsWith("video");

        // Determine the type of file
        let postType = "other";
        if (isImage) {
          postType = "image";
        } else if (isVideo) {
          postType = "video";
        }

        const fileUrl = `http://127.0.0.1:${port}/images/${file.filename}`;

        // Save each post individually
        const post = new Post({
          postHeadId: postHeadCollection._id,
          postFile: fileUrl,
          postType, // Save post type along with the file
        });
        await post.save();
      }

      res.json({ msg: "Inserted " }); // Return saved posts
    } catch (err) {
      console.log(err.msg);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

//Add Video

app.post(
  "/addp",
  upload.fields([{ name: "postFile", maxCount: 1 }]),

  async (req, res) => {
    try {
      var fileValue = JSON.parse(JSON.stringify(req.files));
      var postFile = `http://127.0.0.1:${port}/images/${fileValue.postFile[0].filename}`;

      const { postCaption, userId } = req.body;
      console.log(req.body);
      const post = new Post({
        postCaption,
        postFile,
        userId,
      });
      await post.save();
      res.json("Post Added");
    } catch (err) {
      console.log(err.msg);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

//Post Find
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "postheadschemas", // Collection name of PostHead model
          localField: "postHeadId",
          foreignField: "_id",
          as: "postHead",
        },
      },
      {
        $unwind: "$postHead", // Deconstructs the postHead array created by $lookup
      },
      {
        $lookup: {
          from: "users", // Collection name of User model
          localField: "postHead.userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user", // Deconstructs the user array created by $lookup
      },
      {
        $group: {
          _id: "$postHeadId", // Group posts by postHeadId
          postHead: { $first: "$postHead" }, // Take the first postHead object in each group
          user: { $first: "$user" }, // Take the first user object in each group
          posts: { $push: "$$ROOT" }, // Push all posts in the group into an array
        },
      },
      {
        $project: {
          // Select fields to include in the final output
          _id: "$postHead._id",
          postCaption: "$postHead.postCaption",
          postDateTime: "$postHead.postDateTime",
          userId: "$postHead.userId",
          user: {
            _id: "$user._id",
            userName: "$user.userName",
            userFullName: "$user.userFullName",
            userContact: "$user.userContact",
            userEmail: "$user.userEmail",
            userPassword: "$user.userPassword",
            placeId: "$user.placeId",
            userPhoto: "$user.userPhoto",
            userType: "$user.userType",
            userGender: "$user.userGender",
            userStatus: "$user.userStatus",
          },
          posts: {
            $map: {
              // Map posts array to include only necessary fields
              input: "$posts",
              as: "post",
              in: {
                _id: "$$post._id",
                postFile: "$$post.postFile",
                postType: "$$post.postType",
              },
            },
          },
        },
      },
      {
        $sort: { postDateTime: -1 }, // Sort posts by postDateTime in descending order
      },
    ]);

    console.log(posts);

    if (!posts || posts.length === 0) {
      return res.json([]);
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

app.get("/postsSingleUser/:id", async (req, res) => {
  try {
    let id = req.params.id;
    id = new ObjectId(id);

    const posts = await Post.aggregate([
      {
        $lookup: {
          from: "postheadschemas", // Collection name of PostHead model
          localField: "postHeadId",
          foreignField: "_id",
          as: "postHead",
        },
      },
      {
        $match: { "postHead.userId": id }, // Filter posts by userId
      },
      {
        $unwind: "$postHead", // Deconstructs the postHead array created by $lookup
      },
      {
        $lookup: {
          from: "users", // Collection name of User model
          localField: "postHead.userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user", // Deconstructs the user array created by $lookup
      },
      {
        $group: {
          _id: "$postHeadId", // Group posts by postHeadId
          postHead: { $first: "$postHead" }, // Take the first postHead object in each group
          user: { $first: "$user" }, // Take the first user object in each group
          posts: { $push: "$$ROOT" }, // Push all posts in the group into an array
        },
      },
      {
        $project: {
          // Select fields to include in the final output
          _id: "$postHead._id",
          postCaption: "$postHead.postCaption",
          postDateTime: "$postHead.postDateTime",
          userId: "$postHead.userId",
          user: {
            _id: "$user._id",
            userName: "$user.userName",
            userFullName: "$user.userFullName",
            userContact: "$user.userContact",
            userEmail: "$user.userEmail",
            userPassword: "$user.userPassword",
            placeId: "$user.placeId",
            userPhoto: "$user.userPhoto",
            userType: "$user.userType",
            userGender: "$user.userGender",
            userStatus: "$user.userStatus",
          },
          posts: {
            $map: {
              // Map posts array to include only necessary fields
              input: "$posts",
              as: "post",
              in: {
                _id: "$$post._id",
                postFile: "$$post.postFile",
                postType: "$$post.postType",
              },
            },
          },
        },
      },
      {
        $sort: { postDateTime: -1 }, // Sort posts by postDateTime in descending order
      },
    ]);

    console.log(posts);

    if (!posts || posts.length === 0) {
      return res.json([]);
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

// //Post Find By Id

// app.get("/posts/:id", async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const posts = await Post.findById(postId);
//     if (!posts) {
//       res.send({ msg: "No Data with this ID" });
//     } else {
//       res.send(posts).status(200);
//     }
//   } catch (err) {
//     console.error("Error", err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

// //Post Delete

// app.delete("/posts/:id", async (req, res) => {
//   try {
//     const postId = req.params.id;
//     const deletedPost = await Post.findByIdAndDelete(postId);
//     await Comment.deleteMany({ postId });
//     if (!deletedPost) {
//       return res.status(404).json({ message: "Post not found" });
//     } else {
//       res.json({ message: "Post deleted successfully", deletedPost });
//     }
//   } catch (err) {
//     console.error("Error Deleting Post", err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

//commentSchema

const commentSchemaStructure = new mongoose.Schema({
  commentContent: {
    type: String,
    required: true,
  },
  commentDateTime: {
    type: Date,
    default: Date.now,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "postHeadschema",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Comment = mongoose.model("commentschema", commentSchemaStructure);

//addComment

app.post("/addcomment", async (req, res) => {
  try {
    const { commentContent, postId, userId } = req.body;
    const comment = new Comment({
      commentContent,
      postId,
      userId,
    });
    await comment.save();
    res.json({ msg: "Comment Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//commentFind

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    console.log(comments);
    if (!comments) {
      res.send({ msg: "no data" });
    } else {
      res.send(comments).status(200);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//commentFind by ID

// app.get("/comments/:id", async (req, res) => {
//   try {
//     const commentId = req.params.id;
//     const comments = await Comment.findById(commentId);
//     if (!comments) {
//       res.send({ msg: "no data with this ID" });
//     } else {
//       res.send(comments).status(200);
//     }
//   } catch (err) {
//     console.error("Error", err);
//     res.status(500).json({ msg: "Server Error" });
//   }
// });

//commentFind by Post ID

app.get("/comments/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postId: postId }).populate("userId");
    if (!comments) {
      res.send({ msg: "no Comment for this Post" });
    } else {
      res.send({ comments }).status(200);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Comment Delete

app.delete("/comments/:id", async (req, res) => {
  try {
    const commentId = req.params.id;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    } else {
      res.json({ message: "Comment deleted successfully", deletedComment });
    }
  } catch (err) {
    console.error("Error Deleting Comment", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Comment Count

app.get("/commentcount/:pid", async (req, res) => {
  try {
    const postId = req.params.pid;
    const commentCount = await Comment.countDocuments({ postId });
    res.send({ commentCount });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//likeSchema

const likeSchemaStructure = new mongoose.Schema({
  likeDateTime: {
    type: String,
    default: () => moment().tz("Asia/Kolkata").format(),
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "postHeadschema",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

likeSchemaStructure.pre("save", function (next) {
  this.doj = moment(this.doj).tz("Asia/Kolkata").format();
  next();
});
const Like = mongoose.model("likeschema", likeSchemaStructure);

//addLike

app.post("/like", async (req, res) => {
  try {
    const { postId, userId } = req.body;
    const like = new Like({
      postId,
      userId,
    });
    await like.save();
    res.json({ msg: "Like Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});



//Like Delete

app.delete("/like/:id/:postid", async (req, res) => {
  try {
    const userId = req.params.id;
    const postId = req.params.postid;
    const deletedLike = await Like.deleteOne({
      userId: userId,
      postId: postId,
    });
    if (!deletedLike) {
      return res.status(404).json({ message: "No Like" });
    } else {
      res.json({ message: "Like deleted successfully", deletedLike });
    }
  } catch (err) {
    console.error("Error Deleting Like", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Like Status

app.get("/LikeStatus/:uid/:pid", async (req, res) => {
  try {
    const userId = req.params.uid;
    const postId = req.params.pid;
    const likeStatus = (await Like.findOne({ userId, postId })) ? true : false;
    res.json(likeStatus);
  } catch (err) {
    console.error("Error", err);
  }
});

//Like Count

app.get("/likecount/:pid", async (req, res) => {
  try {
    const postId = req.params.pid;
    const likeCount = await Like.countDocuments({ postId });
    res.send({ likeCount });
  } catch (err) { }
});




//likeSchema

const GamelikeSchemaStructure = new mongoose.Schema({
  likeDateTime: {
    type: String,
    default: () => moment().tz("Asia/Kolkata").format(),
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "uploadgames",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

GamelikeSchemaStructure.pre("save", function (next) {
  this.doj = moment(this.doj).tz("Asia/Kolkata").format();
  next();
});
const GameLike = mongoose.model("gamelikeschema", GamelikeSchemaStructure);

//addLike

app.post("/GameLike", async (req, res) => {
  try {
    const { gameId, userId } = req.body;
    const like = new GameLike({
      gameId,
      userId,
    });
    await like.save();
    res.json({ msg: "Like Added" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
});



//Like Delete

app.delete("/GameLike/:id/:gameId", async (req, res) => {
  try {
    const userId = req.params.id;
    const gameId = req.params.gameId;
    const deletedLike = await GameLike.deleteOne({
      userId,
      gameId
    });
    if (!deletedLike) {
      return res.status(404).json({ message: "No Like" });
    } else {
      res.json({ message: "Like deleted successfully", deletedLike });
    }
  } catch (err) {
    console.error("Error Deleting Like", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//Like Status

app.get("/GameLikeStatus/:uid/:gid", async (req, res) => {
  try {
    const userId = req.params.uid;
    const gameId = req.params.gid;
    const likeStatus = (await GameLike.findOne({ userId, gameId })) ? true : false;
    res.json(likeStatus);
  } catch (err) {
    console.error("Error", err);
  }
});

//Like Count

app.get("/GameLikecount/:gid", async (req, res) => {
  try {
    const gameId = req.params.gid;
    const likeCount = await GameLike.countDocuments({ gameId });
    res.send({ likeCount });
  } catch (err) { }
});







const feedbackSchemaStructure = new mongoose.Schema({
  feedbackTitle: {
    type: String,
    required: true,
  },
  feedbackDetails: {
    type: String,
    reuqired: true,
  },
  feedbackDateTime: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Feedback = mongoose.model("feedbackschema", feedbackSchemaStructure);

//add feedback

app.post("/addfeedback", async (req, res) => {
  try {
    const { feedbackTitle, feedbackDetails, userId } = req.body;
    const feedback = new Feedback({
      feedbackTitle,
      feedbackDetails,
      userId,
    });

    await feedback.save();
    res.json({ msg: "Thanks for the feedback" });
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//feedback Find

app.get("/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find();
    if (!feedback) {
      res.send("No Data");
    } else {
      res.send(feedback).status(200);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//feedback Find By Id

app.get("/feedback/:id", async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      res.send("No Data with this ID");
    } else {
      res.send(feedback).status(200);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});

//feedback Delete

app.delete("/feedback/:id", async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const deletedfeedback = await Feedback.findByIdAndDelete(feedbackId);
    if (!deletedfeedback) {
      res.send("No Data with this ID");
    } else {
      res.json({ msg: "Deleted Succesfully", deletedfeedback });
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});






//PostsSchema

const devGameSchemaStructure = new mongoose.Schema({
  postFile: {
    type: String,
    required: true,
  },
  postHeadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "postHeadschema",
    required: true,
  },
  postType: {
    type: String,
    required: true,
  },

});

const DevGame = mongoose.model("devGameschema", devGameSchemaStructure);

const postdevHeadGameSchemaStructure = new mongoose.Schema({
  gameCaption: {
    type: String,
    required: true,
  },
  gameFile: {
    type: String,
    required: true,
  },
  postDateTime: {
    type: String,
    default: () => moment().tz("Asia/Kolkata").format(), // Use the timezone "Asia/Kolkata" for IST
  },
  developerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "developer",
    required: true,
  },

});

postdevHeadGameSchemaStructure.pre("save", function (next) {
  this.doj = moment(this.doj).tz("Asia/Kolkata").format();
  next();
});

const DevGameHead = mongoose.model("postdevHeadGameschema", postdevHeadGameSchemaStructure);

//Add Image Post

app.post(
  "/addGamepost",
  upload.fields(
    [
      { name: "postFile", maxCount: 10 },
      { name: "gameFile", maxCount: 1 },


    ]
  ), // Adjust maxCount for multiple files

  async (req, res) => {
    try {
      var fileValue = JSON.parse(JSON.stringify(req.files));
      var gameFile = `http://127.0.0.1:${port}/images/${fileValue.gameFile[0].filename}`;

      const { gameCaption, developerId } = req.body;
      const gameHead = new DevGameHead({
        gameCaption,
        developerId,
        gameFile
      });


      const postHeadCollection = await gameHead.save();

      const files = req.files["postFile"]; // Get the array of files

      // Process each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const isImage = file.mimetype.startsWith("image");
        const isVideo = file.mimetype.startsWith("video");

        // Determine the type of file
        let postType = "other";
        if (isImage) {
          postType = "image";
        } else if (isVideo) {
          postType = "video";
        }

        const fileUrl = `http://127.0.0.1:${port}/images/${file.filename}`;

        // Save each post individually
        const post = new DevGame({
          postHeadId: postHeadCollection._id,
          postFile: fileUrl,
          postType, // Save post type along with the file
        });
        await post.save();
      }

      res.json({ msg: "Inserted " }); // Return saved posts
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);





















//SchemReviewHead


const reviewHeadSchema = new mongoose.Schema({

  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "uploadGame",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },




});
const ReviewHead = mongoose.model('reviewHead', reviewHeadSchema);

app.post('/ReviewHead', async (req, res) => {
  const { gameId, userId } = req.body
  const reviewHead = new ReviewHead({
    gameId,
    userId

  })
  await reviewHead.save()
  res.send({ message: 'reviewHead inserted successfully' })

})
//reviewHead Select

app.get('/ReviewHead/:Id', async (req, res) => {
  try {
    const userId = req.params.Id;

    const reviewHeads = await ReviewHead.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: "uploadgames",
          localField: "gameId",
          foreignField: "_id",
          as: "game"
        }
      },
      {
        $unwind: "$game"
      }
    ]);

    console.log(reviewHeads);
    res.json(reviewHeads);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

//ReviewHead Select by one 

app.get('/ReviewHead/:Id', async (req, res) => {
  const Id = req.params.Id
  const reviewHead = await ReviewHead.findOne({ _id: Id })
  res.send(reviewHead)
})

// ReviewHead delete
app.delete('/ReviewHead/:Id', async (req, res) => {
  const Id = req.params.Id
  const reviewHead = await ReviewHead.findByIdAndDelete({ _id: Id })
  res.send(reviewHead)
})

// ReviewHead Update
app.put('/ReviewHead/:Id', async (req, res) => {
  const Id = req.params.Id
  const {
    gameData

  } = req.body
  const reviewHead = await ReviewHead.findByIdAndUpdate(Id, {
    gameData

  }, { new: true })
  res.send(reviewHead)

})

//SchemReviewBody


const reviewBodySchema = new mongoose.Schema({

  content: {
    type: String,
  },
  dateTime: {
    type: String,
  },
  userId: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
  gameId: {
    ref: 'uploadGame',
    type: mongoose.Schema.Types.ObjectId,
  },


});
const ReviewBody = mongoose.model('reviewBody', reviewBodySchema);

app.post('/ReviewBody', async (req, res) => {
  const { content, userId, gameId } = req.body
  const reviewBody = new ReviewBody({
    content,
    userId,
    gameId
  })
  await reviewBody.save()
  res.send({ message: 'reviewBody inserted successfully' })

})

//ReviewBody Select

app.get('/ReviewBody', async (req, res) => {
  const reviewBody = await ReviewBody.find()
  res.send(reviewBody)
})

//reviewBody Select by one 

app.get('/ReviewBody/:Id', async (req, res) => {
  const Id = req.params.Id
  const reviewBody = await ReviewBody.find({ gameId: Id }).populate("userId")

  res.send({ reviewBody })
})

// reviewBody delete
app.delete('/ReviewBody/:Id', async (req, res) => {
  const Id = req.params.Id
  const reviewBody = await ReviewBody.findByIdAndDelete({ _id: Id })
  res.send(reviewBody)
})

// reviewBody Update
app.put('/ReviewBody/:Id', async (req, res) => {
  const Id = req.params.Id
  const {
    content,
    dateTime,
    userId,
    reviewHeadId

  } = req.body
  const reviewBody = await ReviewBody.findByIdAndUpdate(Id, {
    content,
    dateTime,
    userId,
    reviewHeadId

  }, { new: true })
  res.send(reviewBody)

})
//SchemReviewLike


const reviewLikeSchema = new mongoose.Schema({

  userId: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
});
const ReviewLike = mongoose.model('reviewLike', reviewLikeSchema);

app.post('/ReviewLike', async (req, res) => {
  const { userId } = req.body
  const reviewLike = new ReviewLike({
    userId
  })
  await reviewLike.save()
  res.send({ message: 'reviewLike inserted successfully' })

})

// ReviewLike delete
app.delete('/ReviewLike/:Id', async (req, res) => {
  const Id = req.params.Id
  const reviewLike = await ReviewLike.findByIdAndDelete({ _id: Id })
  res.send(reviewLike)
})

// reviewLike Update
app.put('/ReviewLike/:Id', async (req, res) => {
  const Id = req.params.Id
  const { userId
  } = req.body
  const reviewLike = await ReviewLike.findByIdAndUpdate(Id, {
    userId
  }, { new: true })
  res.send(reviewLike)

})


//SchemaDeveloper


const developerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  proof: {
    type: String,
  },
  password: {
    type: String,
  },



});
const Developer = mongoose.model('developer', developerSchema);

app.post('/Developer',
  upload.fields([
    { name: "file", maxCount: 1 },
  ]), async (req, res) => {
    var fileValue = JSON.parse(JSON.stringify(req.files));
    var proof = `http://127.0.0.1:${port}/images/${fileValue.file[0].filename}`;

    const { name, email, password, } = req.body
    const developer = new Developer({
      name,
      email,
      proof,
      password,

    })
    await developer.save()
    res.send({ message: 'Developer inserted successfully' })

  })


//Developer Select

app.get('/Developer', async (req, res) => {
  const developer = await Developer.find()
  res.send(developer)
})

//developer Select by one 

app.get('/Developer/:Id', async (req, res) => {
  const Id = req.params.Id
  const developer = await Developer.findOne({ _id: Id })
  res.send(developer)
})
// developer delete
app.delete('/Developer/:Id', async (req, res) => {
  const Id = req.params.Id
  const developer = await Developer.findByIdAndDelete({ _id: Id })
  res.send(developer)
})

// developer Update
app.put('/Developer/:Id', async (req, res) => {
  const Id = req.params.Id
  const {
    name,
    email,
   
  } = req.body
  const developer = await Developer.findByIdAndUpdate(Id, {
    name,
    email,
   
  }, { new: true })
  res.send(developer)

})



// developer Update
app.put('/DeveloperChange/:Id', async (req, res) => {
  const Id = req.params.Id
  const {
   password,
   
  } = req.body
  const developer = await Developer.findByIdAndUpdate(Id, {
    password
   
  }, { new: true })
  res.send(developer)

})
//Schemagenre

//login

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      userEmail: email,
      userPassword: password,
    });
    const admin = await Admin.findOne({
      adminEmail: email,
      adminPassword: password,
    });
    const developer = await Developer.findOne({
      email,
      password,
    });
    if (user) {
      res.send({
        id: user._id,
        login: "User",
      });
    }
    if (developer) {
      res.send({
        id: developer._id,
        login: "Developer",
      });
    }
    if (admin) {
      res.send({
        id: admin._id,
        login: "Admin",
      });
    }
  } catch (err) {
    console.error("Error", err);
  }
});




//Post Find
app.get("/games", async (req, res) => {
  try {
    const posts = await DevGame.aggregate([
      {
        $lookup: {
          from: "postdevheadgameschemas", // Collection name of PostHead model
          localField: "postHeadId",
          foreignField: "_id",
          as: "postHead",
        },
      },
      {
        $unwind: "$postHead", // Deconstructs the postHead array created by $lookup
      },
      {
        $lookup: {
          from: "developers", // Collection name of User model
          localField: "postHead.developerId",
          foreignField: "_id",
          as: "dev",
        },
      },
      {
        $unwind: "$dev", // Deconstructs the user array created by $lookup
      },
      {
        $group: {
          _id: "$postHeadId", // Group posts by postHeadId
          postHead: { $first: "$postHead" }, // Take the first postHead object in each group
          dev: { $first: "$dev" }, // Take the first user object in each group
          posts: { $push: "$$ROOT" }, // Push all posts in the group into an array
        },
      },
      {
        $project: {
          // Select fields to include in the final output
          _id: "$postHead._id",
          postCaption: "$postHead.postCaption",
          postDateTime: "$postHead.postDateTime",
          postgameFile: "$postHead.gameFile",
          developerId: "$postHead.developerId",
          dev: {
            _id: "$dev._id",
            devName: "$dev.name",
            devEmail: "$dev.email",
           
          },
          posts: {
            $map: {
              // Map posts array to include only necessary fields
              input: "$posts",
              as: "post",
              in: {
                _id: "$$post._id",
                postFile: "$$post.postFile",
                postType: "$$post.postType",
              },
            },
          },
        },
      },
      {
        $sort: { postDateTime: -1 }, // Sort posts by postDateTime in descending order
      },
    ]);

    console.log(posts);

    if (!posts || posts.length === 0) {
      return res.json([]);
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});




app.get("/gameSingleUser/:id", async (req, res) => {
  try {
    let id = req.params.id;
    id = new ObjectId(id);


    const posts = await DevGame.aggregate([
      {
        $lookup: {
          from: "postdevheadgameschemas", // Collection name of PostHead model
          localField: "postHeadId",
          foreignField: "_id",
          as: "postHead",
        },
      },
      {
        $match: { "postHead.developerId": id }, // Filter posts by userId
      },
      {
        $unwind: "$postHead", // Deconstructs the postHead array created by $lookup
      },
      {
        $lookup: {
          from: "developers", // Collection name of User model
          localField: "postHead.developerId",
          foreignField: "_id",
          as: "dev",
        },
      },
      {
        $unwind: "$dev", // Deconstructs the user array created by $lookup
      },
      {
        $group: {
          _id: "$postHeadId", // Group posts by postHeadId
          postHead: { $first: "$postHead" }, // Take the first postHead object in each group
          dev: { $first: "$dev" }, // Take the first user object in each group
          posts: { $push: "$$ROOT" }, // Push all posts in the group into an array
        },
      },
      {
        $project: {
          // Select fields to include in the final output
          _id: "$postHead._id",
          postCaption: "$postHead.postCaption",
          postDateTime: "$postHead.postDateTime",
          postgameFile: "$postHead.gameFile",
          developerId: "$postHead.developerId",
          dev: {
            _id: "$dev._id",
            devName: "$dev.name",
            devEmail: "$dev.email",
           
          },
          posts: {
            $map: {
              // Map posts array to include only necessary fields
              input: "$posts",
              as: "post",
              in: {
                _id: "$$post._id",
                postFile: "$$post.postFile",
                postType: "$$post.postType",
              },
            },
          },
        },
      },
      {
        $sort: { postDateTime: -1 }, // Sort posts by postDateTime in descending order
      },
    ]);

   

    console.log(posts);

    if (!posts || posts.length === 0) {
      return res.json([]);
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ msg: "Server Error" });
  }
});