import React, { useState, useEffect, useRef } from "react";
import Header from "../wireframe/Header";
import { HeaderType, SortType } from "../../modules/types";
import PostCard from "../cards/PostCard";
import { toRelativeTime } from "../../modules/auxilaries";
import CommunityAPI from "../../apis/community.api";
import PostAPI from "../../apis/post.api";
import Loading from "../common/Loading";

export default function CommunityPage({ communityId }) {
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState(SortType.NEWEST);
  const community = useRef({});
  const posts = useRef([]);
  useEffect(() => {
    const fetch = async () => {
      community.current = await CommunityAPI.getCommunityById(communityId);
      posts.current = await PostAPI.getPostsOfCommunity(communityId, sortType);
      setLoading(false);
    };
    setLoading(true);
    fetch();
  }, [communityId, sortType]);
  const content = loading
    ? {}
    : {
        name: community.current.name,
        description: community.current.description,
        timestamp: toRelativeTime(community.current.startDate),
        postCount:
          community.current.postIDs && community.current.postIDs.length > 1
            ? `${community.current.postIDs.length} posts`
            : `${community.current.postIDs.length} post`,
        memberCount:
          community.current.memberCount > 1
            ? `${community.current.memberCount} members`
            : `${community.current.memberCount} member`,
        showSortTypes: true,
        setSortType,
      };
  return (
    loading ? <Loading /> : <>
      <Header type={HeaderType.COMMUNITY} content={content} />
      <section id="page-body">
        {posts.current.map((post) => {
          return (
            <PostCard key={post._id} post={post} showCommunity={false} />
          );
        })}
      </section>
    </>
  );
}
