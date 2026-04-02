import { useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import { Post } from "../../utils/types";

const usePost = () => {
  const { slug } = useParams<{ slug: string }>();
  return useFetch<Post>(`blog/${slug}`);
};

export default usePost;
