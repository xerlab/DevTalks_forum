import { useState } from "react";
import Button from "../Header/Button";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-config";

function Comment({ questionID }) {
  const [comment, setComment] = useState();
  const [curUser] = useState(JSON.parse(localStorage.getItem("curUser")));

  const answersCollection = collection(db, "answers");

  const createanswer = async (post) => {
    await addDoc(answersCollection, post);
  };

  const handleSendAnswer = async () => {
    if (comment) {
      const answerObj = {
        author: curUser.uid,
        questionID: questionID,
        answer: comment,
        createdAt: serverTimestamp(),
        likes: [],
        replies: [],
      };
      await createanswer(answerObj);
    }
  };

  return (
    <div className="inputbox relative flex items-start h-fit">
      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        type="text"
        placeholder="write your comment"
        className="txtbox my-3"
      />
      <div className="absolute bottom-3 right-3">
        <Button
          onClick={handleSendAnswer}
          icon={"send"}
          colorClass="bg-btn-green hover:bg-btn-deepGreen"
        />
      </div>
    </div>
  );
}

export default Comment;
