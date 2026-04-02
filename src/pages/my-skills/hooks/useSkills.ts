import { useState, useEffect } from "react";
import config from "../../../config.json";
import { SkillsPost } from "../utils/types";

interface UseSkillsResult {
  skillsPost: SkillsPost | null;
  isLoading: boolean;
  error: string | null;
}

const useSkills = (): UseSkillsResult => {
  const [skillsPost, setSkillsPost] = useState<SkillsPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [skillsRes] = await Promise.all([
          fetch(`${config.server_url}/my-skills/`),
        ]);
        if (!skillsRes.ok) throw new Error("Failed to load data");
        const [skillsData]: [SkillsPost] = await Promise.all([
          skillsRes.json(),
        ]);
        setSkillsPost(skillsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { skillsPost, isLoading, error };
};

export default useSkills;
