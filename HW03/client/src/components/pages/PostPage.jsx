import React, { useContext, useEffect, useState, useRef } from "react";
import { RoutingContext } from "../../contexts/contexts";
import Header from "../wireframe/Header";
import { HeaderType, SortType } from "../../modules/types";
import { toRelativeTime } from "../../modules/auxilaries";
import CommentCard from "../cards/CommentCard";
import "../../stylesheets/pages/PostPage.css";
import CircButton from "../common/CircButton";
import CreateCommentPage from "./CreateCommentPage";
import PostAPI from "../../apis/post.api";
import CommentAPI from "../../apis/comment.api";
import CommunityAPI from "../../apis/community.api";
import LinkFlairAPI from "../../apis/linkflair.api";
import Loading from "../common/Loading";

export default function PostPage({ postId }) {
  const community = useRef(null);
  const post = useRef({});
  const linkFlair = useRef(null);
  const comments = useRef([]);
  const cmtCnt = useRef(0);
  const [loading, setLoading] = useState(true);
  const { setRoute } = useContext(RoutingContext);

  useEffect(() => {
    const fetch = async () => {
      await PostAPI.increaseViewCount(postId);
      post.current = await PostAPI.getPostById(postId);
      community.current = await CommunityAPI.getCommunityOfPost(postId);
      comments.current = await CommentAPI.getCommentsOfPost(postId);
      cmtCnt.current = await CommentAPI.getAllCommentsOfPost(postId);
      comments.current = CommentAPI.sortComments(comments.current, SortType.NEWEST);
      linkFlair.current = await LinkFlairAPI.getLinkFlairById(
        post.current.linkFlairID
      );
      setLoading(false);
    };
    setLoading(true);
    fetch();
  }, [postId]);

  const headerContent = loading ? {} : {
    title: post.current.title,
    linkFlair: linkFlair.current.content,
    postedBy: post.current.postedBy,
    timestamp: toRelativeTime(post.current.postedDate),
    community: community.current,
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <Header type={HeaderType.POST} content={headerContent} />
      <section id="page-body">
        <section className="content" id="post-body">
          <article id="content">{post.current.content}</article>
          <span id="stats">
            {post.current.views} Views • {cmtCnt.current.length} Comments
          </span>
        </section>
        <section id="comment-button">
          <CircButton
            className="comment"
            text="Add Comment"
            size={8}
            onClick={() => setRoute(<CreateCommentPage postId={post.current._id} />)}
          />
        </section>
        <footer className="footer">
          <section id="comments">
            {comments.current.map((comment) => (
              <CommentCard
                key={comment._id}
                postId={post.current._id}
                comment={comment}
              />
            ))}
          </section>
        </footer>
      </section>
    </>
  );
}
