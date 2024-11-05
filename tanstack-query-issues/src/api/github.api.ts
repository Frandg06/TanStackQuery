import axios from "axios";

const gitToken = import.meta.env.VITE_GITHUB_TOKEN;

export const gitHubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: `Bearer ${gitToken}`,
  },
});
