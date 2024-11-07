import React, { useContext, useRef, useEffect, useState } from "react";
import { toRelativeTime } from "../../modules/auxilaries";
import { RoutingContext } from "../../contexts/contexts";
import { SortType } from "../../modules/types";
import CircButton from "../common/CircButton";
import "../../stylesheets/components/cards/CommentCard.css";
import CreateCommentPage from "../pages/CreateCommentPage";
import CommentAPI from "../../apis/comment.api";
import Loading from "../common/Loading";

export default function CommentCard({ postId, comment, style }) {
  const [loading, setLoading] = useState(true);
  const { setRoute } = useContext(RoutingContext);
  const replies = useRef([]);
  useEffect(() => {
    const fetch = async () => {
      for (let replyId of comment.commentIDs) {
        replies.current.push(await CommentAPI.getCommentById(replyId));
      }
      replies.current = CommentAPI.sortComments(replies.current, SortType.NEWEST);
      setLoading(false);
    };
    setLoading(true);
    fetch();
  }, [comment.commentIDs]);
  return (
    loading ? <Loading /> :
    <section className="comment-card" id={comment._id + "-card"} style={style}>
      <div id="cmtcard-profile">
        <span id="cmtcard-username">{comment.commentedBy}</span>
        <span> • </span>
        <span className="cmtcard-at" id="at" time={comment.commentedDate}>
          {toRelativeTime(comment.commentedDate)}
        </span>
      </div>
      <p className="cmtcard-content" id="comment-content">
        {comment.content}
      </p>
      <section id="comment-footer">
        <CircButton
          className="reply"
          text="Reply"
          size={4}
          onClick={() =>
            setRoute(<CreateCommentPage postId={postId} commentId={comment._id} />)
          }
        />
      </section>
      <section id="replies">
        {replies.current.map((reply) => (
          <CommentCard
            key={reply._id}
            postId={postId}
            comment={reply}
            style={{ marginLeft: "2em" }}
          />
        ))}
      </section>
    </section>
  );
}
