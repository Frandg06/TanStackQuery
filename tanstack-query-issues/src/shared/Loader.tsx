import { FiRefreshCcw } from "react-icons/fi";

export const Loader = () => {
  return (
    <div className="loading">
      <div className="flex items-center justify-center w-full h-52">
        <FiRefreshCcw size={30} color="gray" className="animate-spin" />
      </div>
    </div>
  );
};
