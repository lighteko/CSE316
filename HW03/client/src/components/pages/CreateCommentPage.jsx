import React, { useContext } from "react";
import Header from "../wireframe/Header";
import { HeaderType, InputType } from "../../modules/types";
import Input from "../common/Input";
import SubmitButton from "../common/SubmitButton";
import useInput from "../../hooks/useInput";
import { RoutingContext } from "../../contexts/contexts";
import PostPage from "./PostPage";
import CommentAPI from "../../apis/comment.api";

export default function CreateCommentPage({ postId, commentId }) {
  const { setRoute } = useContext(RoutingContext);
  const [author, handleAuthor] = useInput("");
  const [content, handleContent] = useInput("");
  const submit = async () => {
    const newComment = {
      commentedBy: author,
      content,
      commentIDs: [],
    };
    if (commentId) {
      newComment.targetId = commentId;
      await CommentAPI.createReply(newComment);
    } else {
      newComment.postId = postId;
      await CommentAPI.createComment(newComment);
    }
    setRoute(<PostPage postId={postId} />);
  };

  return (
    <>
      <Header
        type={HeaderType.CREA_COMMENT}
        content={{ title: "New Comment" }}
      />
      <section id="page-body">
        <section className="create comment-body">
          <Input
            type={InputType.INPUT}
            placeholder="Author *"
            onChange={handleAuthor}
            value={author}
            style={{ width: "15em" }}
            requiredContent="Name is required"
            required
          />
          <Input
            type={InputType.TEXTAREA}
            placeholder="Content *"
            onChange={handleContent}
            value={content}
            maxLength={500}
            requiredContent="Content is required"
            required
          />
          <SubmitButton
            text="Submit Comment"
            onClick={() => submit()}
            disabled={author === "" || content === ""}
          />
        </section>
      </section>
    </>
  );
}
