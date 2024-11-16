import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Button from "../Header/Button";
import { useState } from "react";
import { db } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

function Ask() {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [curUser] = useState(JSON.parse(localStorage.getItem("curUser")));

  const navigate = useNavigate();
  const postsCollection = collection(db, "posts");

  const createpost = async (post) => {
    await addDoc(postsCollection, post);
  };

  const handleSendpost = async () => {
    if (title && description) {
      const postObj = {
        author: curUser.uid,
        title: title,
        description: description,
        createdAt: serverTimestamp(),
        likes: [],
        answer: [],
      };
      await createpost(postObj);
      navigate("/");
    }
  };

  return (
    <div className="Ask flex flex-col gap-6">
      <div className="text-2xl">Ask a question</div>
      <div className="inputbox h-fit">
        <textarea
          className="txtbox"
          type="text"
          placeholder="Question"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="inputbox ">
        <textarea
          className="txtbox h-36"
          type="text"
          placeholder="details"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div className="flex gap-2 justify-end">
        {/* <Button
          icon="image"
          text="Upload"
          colorClass="bg-btn-inactive hover:bg-btn-blue"
        /> */}
        <Button
          onClick={handleSendpost}
          icon="send"
          text={"Send"}
          colorClass="bg-btn-green hover:bg-btn-deepGreen"
        />
      </div>
    </div>
  );
}

export default Ask;
