import { Navigate, useNavigate, useParams } from "react-router-dom";
import { IssueComment } from "../components/IssueComment";
import { FiSkipBack } from "react-icons/fi";
import { useIssue } from "../hooks/useIssue";
import { Loader } from "../../shared/Loader";

export const IssueView = () => {
  const navigate = useNavigate();

  const params = useParams();
  const issueNumber = Number(params.id);
  const { issueQuery, commentsQuery } = useIssue(issueNumber);

  if (issueQuery.isLoading) {
    return <Loader />;
  }

  if (!issueQuery.data) {
    return <Navigate to="/404" replace />;
  }
  return (
    <div className="mb-5">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-400 hover:underline"
        >
          <FiSkipBack />
          Regresar
        </button>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueQuery.data} />

      {commentsQuery.isLoading ? (
        <Loader />
      ) : (
        commentsQuery.data?.map((comment) => (
          <IssueComment key={comment.id} issue={comment} />
        ))
      )}
      {/* Comentario de otros */}
      {/* <IssueComment body={comment2} />
      <IssueComment body={comment3} /> */}
    </div>
  );
};
