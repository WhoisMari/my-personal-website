import useFetch from "../../../hooks/useFetch";
import { AboutPost } from "../utils/types";

const useAbout = () => useFetch<AboutPost>("about");

export default useAbout;
