import React, { useContext } from "react";
import { toRelativeTime } from "../../modules/auxilaries";
import { RoutingContext, ServiceContext } from "../../contexts/contexts";
import "../../stylesheets/components/cards/PostCard.css";
import PostPage from "../pages/PostPage";

export default function PostCard({ post, community }) {
  const { setRoute } = useContext(RoutingContext);
  const { postID, title, content, linkFlair, postedBy, postedDate, views } =
    post;
  const timeStamp = toRelativeTime(post.postedDate);
  const contentPreview = content.slice(0, 80);
  const service = useContext(ServiceContext);
  const commentNums = service.getNumberOfCommentsByPostID(postID);
  return (
    <section
      className={postID + " card"}
      onClick={() => setRoute(<PostPage post={post} />)}
    >
      <div className={postID + " card-header"}>
        <div className={postID + " card-profile"}>
          {community && (
            <>
              <span className="community">{community.name}</span>
              <span> • </span>
            </>
          )}
          <span className="author">{postedBy}</span>
        </div>
        <span className="at" time={postedDate}>
          {timeStamp}
        </span>
      </div>
      <p className={postID + " card-title"}>{title}</p>
      <span className={postID + " card-linkflair"}>
        {linkFlair === null ? "" : linkFlair.content}
      </span>
      <br />
      <span className={postID + " card-content"}>{contentPreview}...</span>
      <div className={postID + " card-footer"}>
        <div className={postID + " card-nums"}>
          <span className="views">
            {views > 1 ? views + " views" : views + " view"}
          </span>
          <span> • </span>
          <span className="num-cmts">
            {commentNums > 1
              ? commentNums + " comments"
              : commentNums + " comment"}
          </span>
        </div>
      </div>
    </section>
  );
}
