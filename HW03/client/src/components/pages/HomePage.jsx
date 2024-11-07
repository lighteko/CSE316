import React, { useEffect, useState, useRef } from "react";
import Header from "../wireframe/Header";
import { HeaderType, SortType } from "../../modules/types";
import PostCard from "../cards/PostCard";
import PostAPI from "../../apis/post.api";
import Loading from "../common/Loading";

export default function HomePage() {
  const [sortType, setSortType] = useState(SortType.NEWEST);
  const [loading, setLoading] = useState(true);
  const sortedPosts = useRef([]);
  useEffect(() => {
    const fetchPosts = async () => {
      sortedPosts.current = await PostAPI.getAllPosts(sortType);
      setLoading(false);
    };
    setLoading(true);
    fetchPosts();
  }, [sortType]);

  const content = {
    title: "All Posts",
    count: sortedPosts.current.length > 1 ? `${sortedPosts.current.length} posts` : `${sortedPosts.current.length} post`,
    showSortTypes: true,
    setSortType,
  };
  return (
    <>
      <Header type={HeaderType.HOME} content={content} />
      <section id="page-body">
        {loading ? <Loading /> : sortedPosts.current.map((post) => {
          return (
            <PostCard
              key={post._id}
              post={post}
              showCommunity={true}
            />
          );
        })}
      </section>
    </>
  );
}
