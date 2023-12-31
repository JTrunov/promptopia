"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@components/Profile";
import { useEffect, useState } from "react";
import { PromptType } from "@types";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<PromptType[]>([]);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const userId = params.get("id");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data: PromptType[] = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, [userId]);

  useEffect(() => {
    setUsername(posts[0]?.creator.username);
  }, [posts]);

  const handleEdit = (post: PromptType) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: PromptType) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => {
          return p._id.toString() !== post._id.toString();
        });

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={userId === session?.user?.id ? "My" : username}
      desc={
        userId === session?.user?.id
          ? "Welcome to your personalized page"
          : "See all posts of the user"
      }
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
