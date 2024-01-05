import React from "react";
import { getUserPosts } from "@/entities/post/api/postApi";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { Link, useParams } from "react-router-dom";
import { PrimaryLayout } from "@/shared/ui/layouts";
import { PostCard } from "@/entities/post";

const UserPostList = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.postSlice.userPosts.data);

  React.useEffect(() => {
    dispatch(getUserPosts(id!));
  }, []);

  return (
    <PrimaryLayout className="grid grid-cols-3 gap-4">
      {posts?.map((post) => {
        return (
          <PostCard key={post.id} post={post} />
        );
      })}
    </PrimaryLayout>
  );
};

export default UserPostList;
