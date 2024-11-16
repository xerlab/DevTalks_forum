import { getDoc, collection, doc } from "firebase/firestore";
import { db } from "../firebase-config";

const usersCollection = collection(db, "users");

export const fetchAuthor = async (authorID, setAuthor) => {
  try {
    const q = doc(usersCollection, authorID);
    const querySnapshot = await getDoc(q);
    const path = querySnapshot._document.data.value.mapValue.fields;
    const QuestionAuthor = {
      uid: querySnapshot.id,
      name: path.name.stringValue,
      email: path.email.stringValue,
      photo: path.photo.stringValue,
    };
    //   console.log("Question Author :: ::", QuestionAuthor);
    setAuthor(QuestionAuthor);
  } catch (error) {
    console.log("Error fetching author document:", error);
  }
};

// --------------------------------------------------------------------------- //

// const getAuthor = async (authorID) => {
//   try {
//     const q = doc(usersCollection, authorID);
//     const querySnapshot = await getDoc(q);
//     const path = querySnapshot._document.data.value.mapValue.fields;
//     const QuestionAuthor = {
//       uid: querySnapshot.id,
//       name: path.name.stringValue,
//       email: path.email.stringValue,
//       photo: path.photo.stringValue,
//     };
//     console.log("Question Author :: ::", QuestionAuthor);
//     setAuthor(QuestionAuthor);
//   } catch (error) {
//     console.log("Error fetching author document:", error);
//   }
// };

// fetch question author if not the current user
// useEffect(() => {
//   if (questionData?.author !== curUser.uid) {
//     console.log("Question author is ::: ", questionData?.author);
//     getAuthor(questionData.author);
//   }
// }, [questionData]);
