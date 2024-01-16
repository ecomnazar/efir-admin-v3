import { GPost } from "@/entities/post/model/interfaces";
import clsx from "clsx";
import { Link } from "react-router-dom";

interface Props {
  post: GPost;
  className?: string;
}

export const PostCard = ({ post, className }: Props) => {
  return (
    <Link
      to={`/post/single/${post.id}`}
      key={post.id}
      className={clsx("h-auto bg-background rounded-md p-4 flex flex-col", className)}
    >
      <img
        className="aspect-square flex-1 object-fit object-cover w-full rounded-md"
        src={post.is_video ? post.thumbnail : post.images[0]}
        alt=""
      />

      <div className="mt-2">
        <p className="text-[12px] lg:text-[15px] whitespace-nowrap overflow-clip">
          Description: <span className="text-[11px] lg:text-[13px]">{post.description}</span>
        </p>
        <p className="text-[12px] lg:text-[15px]">
          Likes: <span className="text-[11px] lg:text-[13px]">{post.likes}</span>
        </p>
        <hr className="w-full h-[1px] outline-none border-none bg-primary/20 my-2" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            {post.user.avatar ? (
              <img
                className="w-[35px] h-[35px] rounded-full object-cover object-center"
                src={post.user.avatar}
                alt=""
              />
            ) : (
              <div className="bg-secondary w-[30px] h-[30px] xl:w-[40px] xl:h-[40px] rounded-full"></div>
            )}
            <p>{post.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
