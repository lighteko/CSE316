import React, { useEffect, useState, useRef } from "react";
import { HeaderType, SortType } from "../../modules/types";
import Header from "../wireframe/Header";
import PostCard from "../cards/PostCard";
import SearchAPI from "../../apis/search.api";
import Loading from "../common/Loading";

export default function SearchPage({ query }) {
  const [sortType, setSortType] = useState(SortType.NEWEST);
  const [loading, setLoading] = useState(true);
  const posts = useRef([]);

  useEffect(() => {
    const fetch = async () => {
      posts.current = await SearchAPI.searchPosts(query, sortType);
      setLoading(false);
    };
    setLoading(true);
    fetch();
  }, [sortType, query]);

  const content = loading
    ? {}
    : {
        title:
          posts.current.length > 0
            ? `Results for: ${query}`
            : `No results found for: ${query}`,
        count:
          posts.current.length > 1
            ? `${posts.current.length} posts`
            : `${posts.current.length} post`,
        showSortTypes: true,
        setSortType,
      };
  return (
    <>
      <Header type={HeaderType.SEARCH} content={content} />
      <section id="page-body">
        {loading ? (
          <Loading />
        ) : (
          posts.current.map((post) => {
            return <PostCard key={post._id} post={post} showCommunity={true} />;
          })
        )}
      </section>
    </>
  );
}
