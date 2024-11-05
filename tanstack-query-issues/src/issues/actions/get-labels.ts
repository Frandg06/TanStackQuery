import { sleep } from "../helpers/sleep";
import { gitHubApi } from "../../api/github.api";
import { GithubLabel } from "../interfaces/label.interface";

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1500);

  const { data } = await gitHubApi.get<GithubLabel[]>("/labels");

  return data;
};
