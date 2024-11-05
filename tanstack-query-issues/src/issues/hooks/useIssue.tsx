import { useQuery } from "@tanstack/react-query";
import { getIssue } from "../actions/get-issue";
import { getIssueComments } from "../actions/get-issue-comments";

export const useIssue = (issueId: number) => {
  const issueQuery = useQuery({
    queryKey: ["issue", issueId],
    queryFn: () => getIssue(issueId),
    staleTime: 1000 * 60,
  });

  const commentsQuery = useQuery({
    queryKey: ["comments", issueId, "comments"],
    queryFn: () => getIssueComments(issueId),
    staleTime: 1000 * 60,
  });

  // const commentsQuery = useQuery({
  //   queryKey: ["comments", issueQuery.data?.number, "comments"],
  //   queryFn: () => getIssueComments(issueQuery.data!.number),
  //   staleTime: 1000 * 60,
  //   enabled: !!issueQuery.data,
  // });

  return {
    issueQuery,
    commentsQuery,
  };
};
