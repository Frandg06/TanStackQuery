import { Loader } from "../../shared/Loader";
import { useLabels } from "../hooks/useLabels";

interface Props {
  onLabelSelected: (label: string) => void;
  labels: string[];
}
export const LabelPicker = ({ onLabelSelected, labels }: Props) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {labelsQuery.data?.map((label) => (
        <span
          onClick={() => onLabelSelected(label.name)}
          key={label.id}
          className={`px-2 py-1 text-xs font-semibold rounded-full cursor-pointer animate-fadeIn hover:bg-slate-800 ${
            labels.includes(label.name) ? "selected-label" : ""
          }`}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
