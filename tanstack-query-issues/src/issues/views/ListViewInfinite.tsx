import { useState } from "react";
import { Loader } from "../../shared/Loader";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { State } from "../interfaces/issues.interface";
import { useIssuesInfinite } from "../hooks";

export const ListViewInfinite = () => {
  const [state, setState] = useState<State>(State.All);
  const [labels, setLabel] = useState<string[]>([]);

  const { issuesQuery } = useIssuesInfinite({
    state,
    selectedLabels: labels,
  });

  const issues = issuesQuery.data?.pages.flat() ?? [];

  const onLabelSelected = (newLabel: string) => {
    if (labels.includes(newLabel)) {
      setLabel(labels.filter((label) => label !== newLabel));
    } else {
      setLabel((prev) => [...prev, newLabel]);
    }
  };

  return (
    <div className="grid grid-cols-1 mt-5 sm:grid-cols-3">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-col items-center justify-between">
              <IssueList
                issues={issues}
                onStateChange={setState}
                state={state}
              />
              <div className="flex items-center justify-between mt-5">
                <button
                  className="p-2 transition-all bg-blue-500 rounded-md hover:bg-blue-700"
                  onClick={() => issuesQuery.fetchNextPage()}
                >
                  {issuesQuery.isFetchingNextPage
                    ? "Cargando..."
                    : "Cargar mas..."}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker onLabelSelected={onLabelSelected} labels={labels} />
      </div>
    </div>
  );
};
