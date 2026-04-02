import useFetch from "../../../hooks/useFetch";
import { Project } from "../utils/types";

const useProjects = () => useFetch<Project[]>("projects");

export default useProjects;
