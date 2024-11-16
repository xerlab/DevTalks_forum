/* eslint-disable react/prop-types */
import "./index.css";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase-config";
import { filteredQuestions } from "./Utils/getQuestion";
// React router setup
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// Define components to render for each route
import SignIn from "./Components/SignIn";

import Header from "./Components/Header";
import Ask from "./Components/Navbar/Ask";

import Navbar from "./Navbar";
import ActiveQ from "./Components/SubComponents/ActiveQ";

import Questions from "./Components/Navbar/Questions";
import YourQuestions from "./Components/Navbar/YourQuestions";
import YourAnswers from "./Components/Navbar/YourAnswers";
import YourUpvotes from "./Components/Navbar/YourUpvotes";
import OpenQuestion from "./Components/Navbar/OpenQuestion";

const postCollection = collection(db, "posts");

function App() {
  const [questions, setQuestions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuth")
  );

  // Function to handle login and set authentication
  const handleLogin = () => {
    console.log("Authenticated");
    setIsAuthenticated(true);
  };

  // Function to handle login and set authentication
  const handleLogout = () => {
    console.log("reject Authentication");
    setIsAuthenticated(false);
  };

  // fetch all questions after component mount
  useEffect(() => {
    const getposts = async () => {
      const data = await getDocs(postCollection);
      let filteredData = await filteredQuestions(data.docs);
      setQuestions(filteredData);
      console.log(filteredData);
    };
    getposts();
  }, []);

  const MainLayout = () => (
    <>
      <Header onLogout={handleLogout} />
      <div className="main container h-full m-auto mt-4 flex gap-10">
        <div className="w-1/3">
          <Navbar />
        </div>
        <div className="w-full h-[87vh] px-4 overflow-scroll">
          <Outlet />
        </div>
        <div className="w-3/5">
          <ActiveQ questions={questions} />
        </div>
      </div>
    </>
  );

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/sign-in" element={<SignIn onLogin={handleLogin} />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <Route element={<MainLayout />}>
            <Route path="/" element={<Questions questions={questions} />} />
            <Route
              path="/your-questions"
              element={<YourQuestions questions={questions} />}
            />
            <Route path="/your-answers" element={<YourAnswers />} />
            <Route path="/your-upvotes" element={<YourUpvotes />} />
            <Route
              path="/open-question/:questionId"
              element={<OpenQuestion />}
            />
            <Route path="/ask-question" element={<Ask />} />
          </Route>
        ) : (
          // Redirect to Sign-In if not authenticated
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;

// {/* Example: Post component with nested comments */}
// <Route
// path="/post"
// element={
//   <Post question={true} type={"opened"}>
//     <Comment />
//   </Post>
// }
// />
