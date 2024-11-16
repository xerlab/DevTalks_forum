import { useState, useEffect } from "react";
import Button from "../Header/Button";
import { timeAgo } from "../../Utils/timeAge";
import { fetchAuthor } from "../../Utils/getAuthor"; // Import the custom hook
import { getIconDecor, getPostDecor } from "../../Utils/getdecoration";
import { useNavigate } from "react-router-dom";
import {
  formatQuestion,
  updateAnswersUpvotes,
  updateQuestionLikes,
  updateUserLikes,
} from "../../Utils/getQuestion";
import Comment from "./Comment";

function Post({ question, answer, type, children }) {
  const [Decoration, setDecoration] = useState(null);
  const [questionData] = useState(formatQuestion(question));
  const [answerData] = useState(answer || null);
  const [setImageLoaded] = useState(false);
  const [author, setAuthor] = useState(
    JSON.parse(localStorage.getItem("curUser") || "{}")
  );

  const navigate = useNavigate();
  function handleOpenQuestion() {
    // console.log("********** questionData *********", questionData);
    if (!answer) navigate(`/open-question/${questionData.questionID}`);
  }

  console.log("Answer :", answer);

  function handleUpvote(event) {
    event.stopPropagation();
    question && updateQuestionLikes(questionData.questionID);
    answer && updateAnswersUpvotes(answerData.answerID);
    updateUserLikes(questionData.questionID);
  }

  useEffect(() => {
    console.log("QuestionData is :: :: :: ", questionData);
    question && getIconDecor(questionData, author, setDecoration);
    answer && getIconDecor(answerData, author, setDecoration);

    if (questionData.author !== author.uid) {
      question && fetchAuthor(questionData?.author, setAuthor);
      answer && fetchAuthor(answerData?.author, setAuthor);
    }
  }, [questionData, answerData]);

  return (
    <div
      onClick={handleOpenQuestion}
      className={`${getPostDecor(
        type
      )} duration-300 cursor-pointer rounded-2xl w-full p-8 flex flex-col gap-10 border border-box-input`}
    >
      <div className="question flex flex-col gap-4 ">
        {question && (
          <div
            className={`font-medium  ${
              type === "active" ? "text-lg" : "text-xl"
            }`}
          >
            {questionData?.title}
          </div>
        )}
        <div
          className={`font-light text-content max-w-2xl ${
            type === "active" ? "text-sm" : ""
          } ${type === "related" ? "truncate" : ""}`}
        >
          {answer && answerData?.answer}
          {question && questionData.description}
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <div className="user gap-4 flex items-center">
          <div className="avatar rounded-full overflow-hidden border-2 border-box-question ">
            <img
              className="w-11"
              src={author.photo}
              alt="peronsal"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className="username">
            <p className="font-medium">{author.name}</p>
            <p className="font-light text-sm text-icon-gray">
              {question && timeAgo(questionData?.createdAt)}
              {answer && timeAgo(answerData?.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex  ml-auto pr-6">
          <Button
            icon="arrow_upward"
            text={question ? questionData?.likesCount : answerData?.likesCount}
          />
        </div>
        <div className="flex gap-4">
          {!question && type !== "reply" && (
            <Button
              icon="chat_bubble"
              colorClass="bg-btn-inactive hover:bg-btn-yellow"
            />
          )}
          <Button
            onClick={handleUpvote}
            icon={question ? "favorite" : "arrow_upward"}
            colorClass={`${Decoration} ${
              question ? "hover:bg-btn-red" : "hover:bg-btn-green"
            }`}
          />
        </div>
      </div>
      {children && (
        <>
          <Comment questionID={questionData.questionID} />
          <div className="flex flex-col gap-3">{children}</div>
        </>
      )}
    </div>
  );
}

export default Post;
