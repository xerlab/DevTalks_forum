import { useEffect, useState } from "react";
import { fetchQuestion } from "../../Utils/getQuestion";
import Post from "./Post";
// import { auth } from "../../firebase-config";

function SelectedUpvote({ questionID }) {
  const [question, setQuestion] = useState();

  useEffect(() => {
    fetchQuestion(questionID, setQuestion);
  }, [questionID]);

  return <>{question && <Post question={question} />}</>;
}

export default SelectedUpvote;
