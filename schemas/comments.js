const mongoose = require("mongoose"); // 몽구스를 사용하겠다는 선언

// 몽구스로 comment라는 객체는 이런 모양으로 받겠다고 선언
const commentSchema = new mongoose.Schema({
  _postId: {
    type: String, // 문자열
    required: true, // 필수로 입력해야 함~~
  },
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("blog_comments", commentSchema);