import {
  getDoc,
  getDocs,
  updateDoc,
  collection,
  arrayUnion,
  doc,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebase-config";

const curUser = JSON.parse(localStorage.getItem("curUser"));

const postsCollection = collection(db, "posts");
const answersCollection = collection(db, "answers");
const usersCollection = collection(db, "users");

// Fetch answers by `questionID`
export const fetchAnswers = async (questionID, setAnswers) => {
  try {
    // Define query with the `where` clause inside `query` function
    const q = query(answersCollection, where("questionID", "==", questionID));
    const querySnapshot = await getDocs(q);
    const filterAnswers = filteredAnswers(querySnapshot);
    const answers = filterAnswers.map((answer) => {
      return formatAnswer(answer);
    });
    setAnswers(answers);
  } catch (error) {
    console.log("Error fetching answers document:", error);
  }
};

export const fetchYourUpvotesList = async (setYourUpvotes) => {
  try {
    const docRef = doc(usersCollection, curUser.uid); // Reference the document
    const docSnap = await getDoc(docRef); // Fetch the document snapshot

    if (docSnap.exists()) {
      const upvotesList = docSnap.get("likes"); // Retrieve the specific field
      console.log("Your upvotes list:", upvotesList);
      await setYourUpvotes(upvotesList); // Optionally return the field
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};

// async function fetchDocumentById() {

// }

// question && updataQuestionLikes(questionData.questionID, author.uid);
// answer && updataAnswersUpvotes(answerData.answerID, author.uid);
// updateUserLikes(questionData.questionID, author.uid);

export const updateQuestionLikes = async (questionID) => {
  try {
    console.log("I just liked this question ::", curUser.uid);
    const docRef = doc(db, "posts", questionID);
    // Use arrayUnion to add authorID to the "likes" array field
    await updateDoc(docRef, {
      likes: arrayUnion(curUser.uid),
    });

    console.log("Author ID added to likes array successfully.");
  } catch (error) {
    console.error("Error updating likes:", error);
  }
};

export const updateAnswersUpvotes = async (answerID) => {
  try {
    console.log("I just liked this answer ::", curUser.uid);
    const docRef = doc(db, "answers", answerID);
    // Use arrayUnion to add authorID to the "likes" array field
    await updateDoc(docRef, {
      likes: arrayUnion(curUser.uid),
    });

    console.log("Author ID added to likes array successfully.");
  } catch (error) {
    console.error("Error updating likes:", error);
  }
};

export const updateUserLikes = async (answerID) => {
  try {
    // console.log("I just liked this answer ::", curUser.uid);
    const docRef = doc(usersCollection, curUser.uid);
    // Use arrayUnion to add authorID to the "likes" array field
    await updateDoc(docRef, {
      likes: arrayUnion(answerID),
    });

    console.log("Author ID added to likes array successfully.");
  } catch (error) {
    console.error("Error updating likes:", error);
  }
};

// Fetch answers by `AuthorID`
export const fetchYourAnswers = async (authorID, setYourAnswers) => {
  try {
    // Define query with the `where` clause inside `query` function
    const q = query(answersCollection, where("author", "==", authorID));
    const querySnapshot = await getDocs(q);
    const filterAnswers = filteredAnswers(querySnapshot);
    const answers = filterAnswers.map((answer) => {
      return formatAnswer(answer);
    });
    setYourAnswers(answers);
  } catch (error) {
    console.log("Error fetching answers document:", error);
  }
};

// Fetch a single question by `questionID`
export const fetchQuestion = async (questionID, setQuestion) => {
  try {
    const questionDoc = doc(postsCollection, questionID);
    const querySnapshot = await getDoc(questionDoc);
    const question = filteredData(querySnapshot);
    console.log("Fetch Question :: FILTERED :;", question);
    setQuestion(question);
  } catch (error) {
    console.log("Error fetching question document:", error);
  }
};

// Helper function to extract and filter data fields from Firestore document
const filteredData = (data) => {
  return {
    ID: data.id,
    ...data?._document?.data?.value?.mapValue?.fields,
  };
};

export const filteredQuestions = (questions) => {
  return questions.map((question) => {
    // if (question) console.log("question details are :: {", question);
    return filteredData(question);
  });
};

export const filteredAnswers = (answers) => {
  return answers.docs.map((answer) => {
    return filteredData(answer);
  });
};

// Format question object
export function formatQuestion(question) {
  return {
    questionID: question?.ID,
    author: question?.author?.stringValue,
    title: question?.title?.stringValue,
    description: question?.description?.stringValue,
    likesCount: question?.likes?.arrayValue?.values?.length || "0",
    likes: question?.likes?.arrayValue?.values,
    createdAt: question?.createdAt?.timestampValue,
  };
}

// Format answer object
export function formatAnswer(answer) {
  return {
    answerID: answer?.ID,
    author: answer?.author?.stringValue,
    questionID: answer?.questionID?.stringValue,
    answer: answer?.answer?.stringValue,
    replies: answer?.replies?.arrayValue,
    likesCount: answer?.likes?.arrayValue?.values?.length || "0",
    likes: answer?.likes?.arrayValue?.values,
    createdAt: answer?.createdAt?.timestampValue,
  };
}
