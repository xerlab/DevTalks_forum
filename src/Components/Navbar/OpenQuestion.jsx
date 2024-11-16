import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchQuestion, fetchAnswers } from "../../Utils/getQuestion";

import Post from "../SubComponents/Post";

export default function OpenQuestion() {
  const { questionId } = useParams(); // Extracts `questionId` from URL

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    console.log("Question is :==> ", question);
  }, [question]);

  useEffect(() => {
    fetchQuestion(questionId, setQuestion);
    fetchAnswers(questionId, setAnswers);
  }, [questionId]);

  return (
    <div className="">
      {question && (
        <Post question={question} type={"opened"}>
          {answers &&
            answers.map((answer, index) => {
              return <Post answer={answer} key={index} />;
            })}
        </Post>
      )}
    </div>
  );
}
