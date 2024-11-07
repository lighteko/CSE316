import React, { useContext, useState } from "react";
import { HeaderType, SortType } from "../../modules/types";
import Header from "../wireframe/Header";
import { ServiceContext } from "../../contexts/contexts";
import PostCard from "../cards/PostCard";

export default function SearchPage({ query }) {
  const service = useContext(ServiceContext);
  const posts = service.getPostsByQuery(query);
  const [sortType, setSortType] = useState(SortType.NEWEST);
  const content = {
    title:
      posts.length > 0
        ? `Results for: ${query}`
        : `No results found for: ${query}`,
    count: posts.length > 1 ? `${posts.length} posts` : `${posts.length} post`,
    showSortTypes: true,
    setSortType,
  };
  const sortedPosts = service.getSortedPosts(posts, sortType);
  return (
    <>
      <Header type={HeaderType.SEARCH} content={content} />
      <section id="page-body">
        {sortedPosts.map((post) => {
          return (
            <PostCard key={post.postID} post={post} showCommunity={true} />
          );
        })}
      </section>
    </>
  );
}
