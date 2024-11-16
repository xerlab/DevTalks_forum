import { useEffect, useState } from "react";
import SelectedAnswer from "../SubComponents/SelectedAnswer";
import { fetchYourAnswers } from "../../Utils/getQuestion";
// import { auth } from "../../firebase-config";

function YourAnswers() {
  const [yourAnswers, setYourAnswers] = useState([]);
  const [author] = useState(
    JSON.parse(localStorage.getItem("curUser") || "{}")
  );

  useEffect(() => {
    fetchYourAnswers(author.uid, setYourAnswers);
  }, [author]);

  return (
    <div className="flex flex-col gap-8">
      {yourAnswers.map((answer, index) => (
        <SelectedAnswer answer={answer} key={index} />
      ))}
    </div>
  );
}

export default YourAnswers;
