import { useState } from "react";
import { Loader } from "../../shared/Loader";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks/useIssues";
import { State } from "../interfaces/issues.interface";

export const ListView = () => {
  const [state, setState] = useState<State>(State.All);
  const [labels, setLabel] = useState<string[]>([]);

  const { issuesQuery, nextPage, previousPage, page } = useIssues({
    state,
    selectedLabels: labels,
  });

  const issues = issuesQuery.data ?? [];

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
            <IssueList issues={issues} onStateChange={setState} state={state} />
            <div className="flex items-center justify-between mt-5">
              <button
                className="p-2 transition-all bg-blue-500 rounded-md hover:bg-blue-700"
                onClick={previousPage}
              >
                Anterior
              </button>
              <span>Página {page}</span>
              <button
                className="p-2 transition-all bg-blue-500 rounded-md hover:bg-blue-700"
                onClick={nextPage}
              >
                Siguiente
              </button>
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
