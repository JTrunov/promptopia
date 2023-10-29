"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { PromptCardListProps, PromptType, UserType } from "@types";

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");

  const [posts, setPosts] = useState<PromptType[]>([]);

  const filteredPosts = posts.filter((post) => {
    const creator = post.creator.username;
    const tagSearch = searchText[0] === "#" ? searchText.slice(1) : searchText;
    return (
      creator.toLowerCase().includes(searchText.toLowerCase()) ||
      post.tag.toLowerCase().includes(tagSearch.toLowerCase()) ||
      post.prompt.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data: PromptType[] = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const newSearch = e.target.value.toString();

    setSearchText(newSearch);
  };

  const handleTagClick = (post: PromptType) => {
    setSearchText("#" + post.tag);
  };

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchText === "" ? posts : filteredPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
