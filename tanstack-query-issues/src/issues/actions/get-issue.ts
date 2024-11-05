import { gitHubApi } from "../../api/github.api";
import { sleep } from "../helpers/sleep";
import { GithubIssue } from "../interfaces/issues.interface";

export const getIssue = async (issueId: number): Promise<GithubIssue> => {
  await sleep(1500);

  const { data } = await gitHubApi.get<GithubIssue>(`/issues/${issueId}`);

  return data;
};
