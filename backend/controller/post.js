const Post = require("../model/post");
const Comment = require("../model/comment");

const cloudinary = require("cloudinary").v2;
exports.createPost = async (req, res) => {
  req.body.author = req.userId;
  try {
    if (req.files.length > 0) {
      const promises = req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          public_id: `blogger_${Date.now()}`,
        });
        return result.secure_url;
      });
      const uploadedImages = await Promise.all(promises);
      console.log(uploadedImages);
      req.body.images = uploadedImages;
    }
    const newPost = new Post(req.body);
    await newPost.save();
    res.status(201).json({ message: "tạo bài viết thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
exports.newArticles = async (req, res) => {
  try {
    const postLatest = await Post.find().sort({ createdAt: -1 }).limit(10);
    res.json(postLatest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.getPosts = async (req, res) => {
  const { currentPage, itemsPerPage } = req.query;
  try {
    const totalCount = await Post.estimatedDocumentCount();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.json({ posts, totalCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
exports.searchPosts = async (req, res) => {
  const keyword = req.query.keyword;
  const currentPage = +req.query.currentPage;
  const itemsPerPage = +req.query.itemsPerPage;
  try {
    const results = await Post.aggregate([
      {
        $facet: {
          totalCount: [
            {
              $match: {
                title: { $regex: keyword, $options: "i" },
              },
            },
            { $count: "value" },
          ],
          data: [
            {
              $match: {
                title: { $regex: keyword, $options: "i" },
              },
            },
            { $skip: (currentPage - 1) * itemsPerPage },
            { $limit: itemsPerPage },
          ],
        },
      },
    ]);
    if (results[0].data.length === 0) {
      return res.json({ posts: [], totalCount: null });
    }

    res.json({
      posts: results[0].data,
      totalCount: results[0].totalCount[0].value,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
exports.detailPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
exports.postComment = async (req, res) => {
  req.body.userId = req.userId;
  try {
    const newPost = new Comment(req.body);

    await newPost.save();
    res.status(201).json({ message: "gửi bình luận thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
exports.getComment = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .sort({ createdAt: -1 })
      .populate("userId")
      .exec();
    res.json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
exports.postUser = async (req, res) => {
  const { currentPage, itemsPerPage } = req.query;
  try {
    const totalCount = await Post.estimatedDocumentCount();
    const posts = await Post.find({ author: req.userId })
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);

    res.json({ posts, totalCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const imagesUrl = await Post.findById(
      { _id: req.params.postId },
      { images: 1 }
    );
    console.log(imagesUrl);
    const deleteResponses = await Promise.all(
      imagesUrl.images.map(async (imageUrl) => {
        const public_id = imageUrl.substring(
          imageUrl.lastIndexOf("/") + 1,
          imageUrl.lastIndexOf(".")
        );
        return cloudinary.uploader.destroy(public_id);
      })
    );
    console.log("xoá ảnh ở cloudinary", deleteResponses);

    await Post.deleteOne({ _id: req.params.postId });
    res.json({ message: "xóa sản phẩm thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
exports.editPost = async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.postId });
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
exports.putEditPost = async (req, res) => {
  try {
    if (req.files.length > 0) {
      const imagesUrl = await Post.findById(
        { _id: req.params.postId },
        { images: 1 }
      );
      console.log(imagesUrl);
      const deleteResponses = await Promise.all(
        imagesUrl.images.map(async (imageUrl) => {
          const public_id = imageUrl.substring(
            imageUrl.lastIndexOf("/") + 1,
            imageUrl.lastIndexOf(".")
          );
          return cloudinary.uploader.destroy(public_id);
        })
      );
      console.log("xoá ảnh ở cloudinary", deleteResponses);
      const promises = req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          public_id: `blogger_${Date.now()}`,
        });
        return result.secure_url;
      });
      const uploadedImages = await Promise.all(promises);
      console.log(uploadedImages);
      req.body.images = uploadedImages;
    }
    await Post.updateOne({ _id: req.params.postId }, req.body);
    res.json({ message: "sửa bài viêt thành công " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
