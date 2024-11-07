import React, { useContext, useState } from "react";
import Header from "../wireframe/Header";
import { HeaderType, SortType } from "../../modules/types";
import PostCard from "../cards/PostCard";
import { ServiceContext } from "../../contexts/contexts";

export default function HomePage() {
  const service = useContext(ServiceContext);
  const posts = service.getAllPosts();
  const [sortType, setSortType] = useState(SortType.NEWEST);
  const content = {
    title: "All Posts",
    count: posts.length > 1 ? `${posts.length} posts` : `${posts.length} post`,
    showSortTypes: true,
    setSortType,
  };
  const sortedPosts = service.getSortedPosts(posts, sortType);
  return (
    <>
      <Header type={HeaderType.HOME} content={content} />
      <section id="page-body">
        {sortedPosts.map((post) => {
          const community = service.getCommunityByPostID(post.postID);
          return (
            <PostCard
              key={post.postID}
              post={post}
              community={community}
              showCommunity={true}
            />
          );
        })}
      </section>
    </>
  );
}
