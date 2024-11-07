import React, { useState, useContext } from "react";
import Header from "../wireframe/Header";
import { HeaderType, SortType } from "../../modules/types";
import PostCard from "../cards/PostCard";
import { toRelativeTime } from "../../modules/auxilaries";
import { ServiceContext } from "../../contexts/contexts";

export default function CommunityPage({ community }) {
  const { communityID } = community;
  const service = useContext(ServiceContext);
  const { name, description, posts, startDate, memberCount } =
    service.getCommunityByID(communityID);
  const [sortType, setSortType] = useState(SortType.NEWEST);
  const content = {
    name,
    description,
    timestamp: toRelativeTime(startDate),
    postCount:
      posts.length > 1 ? `${posts.length} posts` : `${posts.length} post`,
    memberCount:
      memberCount > 1 ? `${memberCount} members` : `${memberCount} member`,
    showSortTypes: true,
    setSortType,
  };
  const sortedPosts = service.getSortedPosts(posts, sortType);
  return (
    <>
      <Header type={HeaderType.COMMUNITY} content={content} />
      <section id="page-body">
        {sortedPosts.map((post) => {
          return (
            <PostCard key={post.postID} post={post} showCommunity={false} />
          );
        })}
      </section>
    </>
  );
}
