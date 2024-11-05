import { FiInfo, FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GithubIssue, State } from "../interfaces/issues.interface";
import { useQueryClient } from "@tanstack/react-query";
import { getIssue } from "../actions/get-issue";
import { getIssueComments } from "../actions/get-issue-comments";
import { timeSince } from "../helpers/timeSince";

interface Props {
  issue: GithubIssue;
}

export const IssueItem = ({ issue }: Props) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const issueId = Number(issue.number);

  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ["issue", issueId],
      queryFn: () => getIssue(issueId),
      staleTime: 1000 * 60,
    });

    queryClient.prefetchQuery({
      queryKey: ["comments", issueId, "comments"],
      queryFn: () => getIssueComments(issueId),
      staleTime: 1000 * 60,
    });
  };

  const preSetData = () => {
    queryClient.setQueryData(["issue", issueId], issue, {
      updatedAt: Date.now() + 1000 * 60,
    });
    queryClient.prefetchQuery({
      queryKey: ["comments", issueId, "comments"],
      queryFn: () => getIssueComments(issueId),
      staleTime: 1000 * 60,
    });
  };
  return (
    <div
      // onMouseEnter={prefetchData}
      onMouseEnter={preSetData}
      className="flex items-center px-2 py-3 mb-5 border rounded-md animate-fadeIn bg-slate-900 hover:bg-slate-800"
    >
      {issue.state === State.Open ? (
        <FiInfo size={30} color="red" className="min-w-10" />
      ) : (
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
      )}

      <div className="flex flex-col flex-grow px-2">
        <a
          onClick={() => navigate(`/issues/issue/${issue.number}`)}
          className="hover:underline"
        >
          {issue.title}
        </a>
        <span className="text-gray-500">
          #{issue.number} opened {timeSince(issue.created_at)}
          <span className="font-bold">{issue.user.login}</span>
        </span>

        <div className="flex items-center mt-2">
          {issue.labels.map((item, index) => (
            <span
              key={index + "-" + item}
              className="px-2 py-1 text-xs font-semibold rounded-full cursor-pointer animate-fadeIn hover:bg-slate-800"
              style={{
                border: `1px solid #${item.color}`,
                color: `#${item.color}`,
              }}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>

      <img
        src={issue.user.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col items-center mx-2">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{issue.comments}</span>
      </div>
    </div>
  );
};
