const router = require("express").Router();
const post = require(`../controller/post`);

const authenticateToken = require("../middleware/tokenAuth");

router.post("/createPost", authenticateToken, post.createPost);

router.get("/latestPosts", post.newArticles);
router.get("/getPosts", post.getPosts);
router.get("/search", post.searchPosts);
router.get("/detailPost/:postId", post.detailPost);
router.post("/commentPost", authenticateToken, post.postComment);
router.get("/getComment/:postId", post.getComment);
router.get("/postUser", authenticateToken, post.postUser);
router.delete("/deletePost/:postId", post.deletePost);
router.get("/getEditPost/:postId", post.editPost);
router.put("/editPost/:postId", authenticateToken, post.putEditPost);
module.exports = router;
