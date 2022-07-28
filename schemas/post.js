const mongoose = require("mongoose"); // 몽구스를 사용하겠다는 선언

// 몽구스로 post라는 객체는 이런 모양으로 받겠다고 선언
const postSchema = new mongoose.Schema({
  user: {
    type: String, // 이건 문자열로 써야 합니다.
    required: true, // 필수로 들어와야 합니다.
  },
  password: {
    type: String,
    required: true,
  },
  title: {
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

module.exports = mongoose.model("blog_posts", postSchema);