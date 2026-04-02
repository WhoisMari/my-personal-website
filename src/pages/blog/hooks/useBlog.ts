import useFetch from "../../../hooks/useFetch";
import { Post } from "../utils/types";

const useBlog = () => useFetch<Post[]>("blog");

export default useBlog;
