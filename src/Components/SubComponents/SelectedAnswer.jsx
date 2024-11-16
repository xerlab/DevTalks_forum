import { useEffect, useState } from "react";
import Post from "../SubComponents/Post";
import { fetchQuestion } from "../../Utils/getQuestion";

function YourAnswer({ answer }) {
  const [question, setQuestion] = useState();

  useEffect(() => {
    fetchQuestion(answer.questionID, setQuestion);
  }, [answer]);

  return (
    <div className="flex flex-col">
      <div className="px-6 -mb-40 hover:mb-4 transition-margin duration-700">
        {question && <Post question={question} type="related" />}
      </div>
      <div className="">
        <Post answer={answer} />
      </div>
    </div>
  );
}

export default YourAnswer;
