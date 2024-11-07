import React, { useContext, useEffect, useRef, useState } from "react";
import { toRelativeTime } from "../../modules/auxilaries";
import { RoutingContext } from "../../contexts/contexts";
import "../../stylesheets/components/cards/PostCard.css";
import PostPage from "../pages/PostPage";
import CommunityAPI from "../../apis/community.api";
import CommentAPI from "../../apis/comment.api";
import LinkFlairAPI from "../../apis/linkflair.api";

export default function PostCard({ post, showCommunity }) {
  const { setRoute } = useContext(RoutingContext);
  const { _id, title, content, linkFlairID, postedBy, postedDate, views } =
    post;
  const community = useRef(null);
  const commentNums = useRef(0);
  const linkFlair = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      community.current = await CommunityAPI.getCommunityOfPost(_id);
      const comments = await CommentAPI.getAllCommentsOfPost(_id);
      linkFlair.current = await LinkFlairAPI.getLinkFlairById(linkFlairID);
      commentNums.current = comments.length;
      setLoading(false);
    };
    setLoading(true);
    fetch();
  }, [_id, linkFlairID]);
  const contentPreview = content.slice(0, 80);
  return (
    <section
      className={_id + " card"}
      onClick={() => setRoute(<PostPage postId={_id} />)}
    >
      {!loading && (
        <>
          <div className={_id + " card-header"}>
            <div className={_id + " card-profile"}>
              {showCommunity && (
                <>
                  <span className="community">{community.current.name}</span>
                  <span> • </span>
                </>
              )}
              <span className="author">{postedBy}</span>
            </div>
            <span className="at" time={postedDate}>
              {toRelativeTime(postedDate)}
            </span>
          </div>
          <p className={_id + " card-title"}>{title}</p>
          <span className={_id + " card-linkflair"}>
            {linkFlair.current === null ? "" : linkFlair.current.content}
          </span>
          <br />
          <span className={_id + " card-content"}>{contentPreview}...</span>
          <div className={_id + " card-footer"}>
            <div className={_id + " card-nums"}>
              <span className="views">
                {views > 1 ? views + " views" : views + " view"}
              </span>
              <span> • </span>
              <span className="num-cmts">
                {commentNums.current > 1
                  ? commentNums.current + " comments"
                  : commentNums.current + " comment"}
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
