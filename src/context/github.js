import { useCallback, useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";

import { GITHUB_OAUTH, MILESTONE } from "../utils";

const octokit = new Octokit({
  auth: GITHUB_OAUTH,
  userAgent: "wombak-tracker"
});

const accountMeta = {
  owner: "wombak",
  repo: "www"
};

const getRepo = () => octokit.repos.get(accountMeta);

const getContributions = () => octokit.repos.getContributorsStats(accountMeta);

const getMilestone = () =>
  octokit.issues.getMilestone({
    ...accountMeta,
    milestone_number: MILESTONE
  });

const getIssues = () =>
  octokit.issues.listForRepo({
    ...accountMeta,
    milestone: MILESTONE,
    sort: "updated",
    state: "all"
  });

const useGithub = () => {
  const [closedIssueCount, setClosedIssueCount] = useState(0);
  const [commitCount, setCommitCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [recentIssues, setRecentIssues] = useState([]);
  const [stars, setStars] = useState(0);
  const [subscribers, setSubscribers] = useState(0);
  const [totalIssueCount, setTotalIssueCount] = useState(0);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);

      const [
        { data: repoData },
        { data: contributionData },
        { data: issuesData },
        { data: milestoneData }
      ] = await Promise.all([
        getRepo(),
        getContributions(),
        getIssues(),
        getMilestone()
      ]);

      setClosedIssueCount(milestoneData.closed_issues);
      setTotalIssueCount(
        milestoneData.closed_issues + milestoneData.open_issues
      );

      const firstFourIssues = issuesData.slice(0, 4);
      setRecentIssues(firstFourIssues);

      const calculatedCommits = contributionData
        .map(({ total }) => total)
        .reduce((acc, contributions) => acc + contributions, 0);

      setCommitCount(calculatedCommits);

      setStars(repoData.stargazers_count);
      setSubscribers(repoData.subscribers_count);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    closedIssueCount,
    commitCount,
    isLoading,
    recentIssues,
    stars,
    subscribers,
    totalIssueCount
  };
};

export default useGithub;
