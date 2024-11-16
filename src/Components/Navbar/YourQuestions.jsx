import Post from "../SubComponents/Post";
import { useEffect, useState } from "react";

function YourQuestions({ questions }) {
  const [author] = useState(
    JSON.parse(localStorage.getItem("curUser") || "{}")
  );

  console.log(questions);

  return (
    <div className="flex flex-col gap-2">
      {questions.map(
        (question, index) =>
          question?.author.stringValue === author.uid && (
            <Post question={question} key={index} />
          )
      )}
    </div>
  );
}

export default YourQuestions;
