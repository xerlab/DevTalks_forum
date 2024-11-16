import Post from "./Post";

function ActiveQ({ questions }) {
  return (
    <div className="active_questions flex flex-col gap-4">
      <div className="text-xl font-light px-2 text-content">
        Active questions
      </div>
      <div className="flex flex-col gap-3">
        {questions.map((question, index) => (
          <Post question={question} key={index} type={"active"} />
        ))}
      </div>
    </div>
  );
}

export default ActiveQ;
