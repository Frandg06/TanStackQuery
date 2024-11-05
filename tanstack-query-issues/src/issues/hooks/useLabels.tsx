import { useQuery } from "@tanstack/react-query";
import { getLabels } from "../actions/get-labels";

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    staleTime: 60 * 1000 * 60,

    // placeholderData: [
    //   {
    //     id: 69105383,
    //     node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
    //     url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
    //     name: "Browser: IE",
    //     color: "c7def8",
    //     default: false,
    //   },
    //   {
    //     id: 710573595,
    //     node_id: "MDU6TGFiZWw3MTA1NzM1OTU=",
    //     url: "https://api.github.com/repos/facebook/react/labels/Component:%20Developer%20Tools",
    //     name: "Component: Developer Tools",
    //     color: "fbca04",
    //     default: false,
    //   },
    // ],

    // initialData: [
    //   {
    //     id: 69105383,
    //     node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
    //     url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
    //     name: "Browser: IE",
    //     color: "c7def8",
    //     default: false,
    //   },
    //   {
    //     id: 710573595,
    //     node_id: "MDU6TGFiZWw3MTA1NzM1OTU=",
    //     url: "https://api.github.com/repos/facebook/react/labels/Component:%20Developer%20Tools",
    //     name: "Component: Developer Tools",
    //     color: "fbca04",
    //     default: false,
    //   },
    // ],
  });

  return {
    labelsQuery,
  };
};
