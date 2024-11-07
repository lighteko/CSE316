import React, { useContext } from "react";
import { ServiceContext, RoutingContext } from "../../contexts/contexts";
import Header from "../wireframe/Header";
import { HeaderType, SortType } from "../../modules/types";
import { toRelativeTime } from "../../modules/auxilaries";
import CommentCard from "../cards/CommentCard";
import "../../stylesheets/pages/PostPage.css";
import CircButton from "../common/CircButton";
import CreateCommentPage from "./CreateCommentPage";

export default function PostPage({ post }) {
  const { postID, title, content, linkFlair, postedBy, postedDate, views } =
    post;
  const service = useContext(ServiceContext);
  const { setRoute } = useContext(RoutingContext);
  const community = service.getCommunityByPostID(postID);
  const headerContent = {
    title: title,
    linkFlair: linkFlair,
    postedBy: postedBy,
    timestamp: toRelativeTime(postedDate),
    community: community,
  };
  const commentNums = service.getNumberOfCommentsByPostID(postID);
  const comments = service.getPostByID(postID).comments;
  const sortedComments = service.getSortedComments(comments, SortType.NEWEST);
  return (
    <>
      <Header type={HeaderType.POST} content={headerContent} />
      <section id="page-body">
        <section className="content" id="post-body">
          <article id="content">{content}</article>
          <span id="stats">
            {views} Views • {commentNums} Comments
          </span>
        </section>
        <section id="comment-button">
          <CircButton
            className="comment"
            text="Add Comment"
            size={8}
            onClick={() => setRoute(<CreateCommentPage post={post} />)}
          />
        </section>
        <footer className="footer">
          <section id="comments">
            {sortedComments.map((comment) => (
              <CommentCard
                key={comment.commentID}
                post={post}
                comment={comment}
              />
            ))}
          </section>
        </footer>
      </section>
    </>
  );
}
