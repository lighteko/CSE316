import React, { useContext } from "react";
import { toRelativeTime } from "../../modules/auxilaries";
import { ServiceContext, RoutingContext } from "../../contexts/contexts";
import { SortType } from "../../modules/types";
import CircButton from "../common/CircButton";
import "../../stylesheets/components/cards/CommentCard.css";
import CreateCommentPage from "../pages/CreateCommentPage";

export default function CommentCard({ post, comment, style }) {
  const { commentID, content, commentedBy, replies, commentedDate } = comment;
  const service = useContext(ServiceContext);
  const { setRoute } = useContext(RoutingContext);
  const sortedReplies = service.getSortedComments(replies, SortType.NEWEST);
  return (
    <section className="comment-card" id={commentID + "-card"} style={style}>
      <div id="cmtcard-profile">
        <span id="cmtcard-username">{commentedBy}</span>
        <span> • </span>
        <span className="cmtcard-at" id="at" time={commentedDate}>
          {toRelativeTime(commentedDate)}
        </span>
      </div>
      <p className="cmtcard-content" id="comment-content">
        {content}
      </p>
      <section id="comment-footer">
        <CircButton
          className="reply"
          text="Reply"
          size={4}
          onClick={() =>
            setRoute(<CreateCommentPage post={post} comment={comment} />)
          }
        />
      </section>
      <section id="replies">
        {sortedReplies.map((reply) => (
          <CommentCard
            key={reply.commentID}
            post={post}
            comment={reply}
            style={{ marginLeft: "2em" }}
          />
        ))}
      </section>
    </section>
  );
}
