import React, { useContext } from "react";
import Header from "../wireframe/Header";
import { HeaderType, InputType } from "../../modules/types";
import Input from "../common/Input";
import SubmitButton from "../common/SubmitButton";
import useInput from "../../hooks/useInput";
import { ServiceContext, RoutingContext } from "../../contexts/contexts";
import { Comment } from "../../modules/services/dataclass";
import PostPage from "./PostPage";

export default function CreateCommentPage({ post, comment }) {
  const service = useContext(ServiceContext);
  const { setRoute } = useContext(RoutingContext);
  const [author, handleAuthor] = useInput("");
  const [content, handleContent] = useInput("");
  const submit = () => {
    const newComment = new Comment({
      commentID: service.getNewCommentID(),
      commentedBy: author,
      content,
      replies: [],
      commentedDate: new Date(),
    });
    if (comment) {
      service.addReply(newComment, comment);
    } else {
      service.addComment(newComment, post);
    }
    setRoute(<PostPage post={post} />);
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
