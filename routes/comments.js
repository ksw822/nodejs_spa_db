// 이 파일에서 사용할 라우터 객체 생성
const express = require("express");
const router = express.Router();

// (ObjectId라는 속성의 객체로 자동 생성되는)
// 몽고DB의 '_id' 값을 문자열로 바꿔주기 위한 외부 모듈이 필요합니다.
const ObjectId = require("mongodb");

// 이 파일에서 사용할 post와 comment DB가 어떻게 생겼는지 불러옵니다. (schema/comment.js)
const Comment = require("../schemas/comments.js");
const Post = require("../schemas/post.js");

//  ---------------- 여기부터 API 시작 ----------------

// ------------------
// 댓글 작성 with POST ('/api/comments/_postId')
router.post("/:_postId", async (req, res) => {
  const { _postId } = req.params;

  const { user, password, content } = req.body;

  const posts = await Post.find({ _id: _postId });

  if (!posts.length) {
    return res.json({success: false, message: "해당 게시글이 없습니다." });
  }

  await Comment.create({
    _postId,
    user,
    password,
    content,
    createdAt: new Date(),
  });

  // Response 답변합니다.
  res.json({ message: "댓글을 생성하였습니다." });
});

// ------------------
// 댓글 목록 조회 with GET ('/api/comments/_postId')
router.get("/:_postId", async (req, res) => {
  // URL 뒤쪽에 params로 전달받은 _postId를 사용하겠다고 변수 선언합니다.
  const { _postId } = req.params;

  // postId가 일치하는 게시글을 찾아보고,
  const posts = await Post.find({ _id: ObjectId(_postId) });
  comments.sort((a,b) => new Date(a.date)-new Date(b.date));
  // 없으면 댓글을 못씁니다~~
  if (!posts.length) {
    return res.json({ message: "해당 게시글이 없습니다." });
  }

  // postId 게시글에 남겨져 있는 댓글을 Comments DB에서 모두 찾아서
  const allCommentInfo = await Comment.find({ _postId });
  const data = [];

  // 이 게시물의 댓글을 하나씩 돌면서, 배열에 넣어서 반환합니다.
  for (let i = 0; i < allCommentInfo.length; i++) {
    data.push({
      commentId: allCommentInfo[i]._id.toString(),
      user: allCommentInfo[i].user,
      content: allCommentInfo[i].content,
      createdAt: allCommentInfo[i].createdAt,
    });
  }

  // 반환값은 Response json으로 전달
  res.json({ data: data });
});

// 댓글 수정 with PUT ('/api/comments/_commentId')
router.put("/:_commentId", async (req, res) => {

  const { _commentId } = req.params;

  const { password, content } = req.body;

  const comments = await Comment.find({ _id: ObjectId(_commentId) });

  // 댓글이 없으면 수정할 수 없습니다~~
  if (!comments.length) {
    return res.json({ message: "해당 댓글이 없습니다." });
  };

  // 해당 댓글을 업데이트 합니다.
  await Comment.updateOne(
    {
      _id: ObjectId(_commentId), 
    },
    {
      // 뭐라고 수정할지 정의합니다.
      $set: { content: { content} },
    }
  );

    res.json({ message: "댓글을 수정하였습니다." });
});

// 게시글 삭제 with DELETE ('/api/comments/_commentId')
router.delete("/:_commentId", async (req, res) => {
  // params로 전달 받은 댓글번호 _commentId와
  const { _commentId } = req.params;
  // 바디를 통해 password 를 받습니다.
  const { password } = req.body;

  // _commentId 와 일치하는 comments를 불러옵니다.
  const comments = await Comment.find({ _id: ObjectId(_commentId) });

  // 찾은 게 없으면 삭제할 수 없습니다.
  if (!comments.length) {
    return res.json({ message: "해당 댓글이 없습니다." });
  }

  // 찾은 게 있으면 그 password와 body에 입력한 password를 비교합니다.
  const db_password = comments[0]["password"];
  if (db_password != password) {
    return res.json({ message: "비밀번호를 확인해주세요." });

    // password 일치하면 그걸 지웁니다~~
  } else {
    await Comment.deleteOne({ _id: ObjectId(_commentId) });

    // 지웠으니까 여기서 메세지를 Response 합니다.
    return res.json({ message: "댓글을 삭제하였습니다." });
  }
});

module.exports = router;

// if (!posts.length) {
//   return res.json({ message: "해당 게시글이 없습니다." });
// }