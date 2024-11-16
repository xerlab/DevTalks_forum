import Post from "../SubComponents/Post";
import { useEffect, useState } from "react";

function Questions({ questions }) {
  // console.log("Your passed questions are :", questions);

  return (
    <div className="flex flex-col gap-2">
      {questions.map((question, index) => (
        <Post question={question} key={index} />
      ))}
    </div>
  );
}

export default Questions;
