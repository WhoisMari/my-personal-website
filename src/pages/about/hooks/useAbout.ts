import { useState, useEffect } from "react";
import config from "../../../config.json";
import useFetch from "../../../hooks/useFetch";
import { AboutPost, AboutFact } from "../utils/types";

const useAbout = () => {
  const post = useFetch<AboutPost>("about");
  const [facts, setFacts] = useState<AboutFact[]>([]);

  useEffect(() => {
    fetch(`${config.server_url}/about-facts/`)
      .then((r) => r.json())
      .then(setFacts)
      .catch(() => {});
  }, []);

  return { ...post, facts };
};

export default useAbout;
