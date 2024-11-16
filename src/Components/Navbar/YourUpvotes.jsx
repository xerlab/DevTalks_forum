import { useState, useEffect } from "react";
import SelectedUpvote from "../SubComponents/SelectedUpvote";
import { fetchYourUpvotesList } from "../../Utils/getQuestion";

function YourUpvotes() {
  const [yourUpvotes, setYourUpvotes] = useState(null);
  const [author] = useState(
    JSON.parse(localStorage.getItem("curUser") || "{}")
  );

  useEffect(() => {
    fetchYourUpvotesList(setYourUpvotes);
  }, [author]);

  return (
    <div className="flex flex-col gap-8">
      {yourUpvotes &&
        yourUpvotes.map((questionID) => (
          <SelectedUpvote key={questionID} questionID={questionID} />
        ))}
    </div>
  );
}

export default YourUpvotes;
