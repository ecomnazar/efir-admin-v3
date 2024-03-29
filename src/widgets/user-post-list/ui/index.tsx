import React from "react";
import { getUserPosts } from "@/entities/post/api/postApi";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useParams } from "react-router-dom";
import { PrimaryLayout } from "@/shared/ui/layouts";
import { PostCard } from "@/entities/post";
import { Button } from "@/shared/ui/button";

const UserPostList = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.postSlice.userPosts.data);
  const loading = useAppSelector((state) => state.postSlice.userPosts.loading)
  const hasNext = useAppSelector((state) => state.postSlice.userPosts.next)
  const [nextPage, setNextPage] = React.useState(1)

  const loadMore = () => {
    dispatch(getUserPosts({ id: id!, page: nextPage }))
    setNextPage(nextPage + 1)
  }

  React.useEffect(() => {
    if (nextPage === 1) {
      loadMore()
    }
  }, []);

  return (
    <>
      <PrimaryLayout className="grid grid-cols-3 gap-4 mt-4">
        {posts?.map((post) => {
          return (
            <PostCard key={post.id} post={post} />
          );
        })}
      </PrimaryLayout>
      {hasNext && (
        <Button
          loading={loading}
          onClick={loadMore}
          className="mx-auto block my-4"
          title={"Load more"}
        />
      )}
    </>
  );
};

export default UserPostList;
