import Button from "./Header/Button";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function SignIn({ onLogin }) {
  const navigate = useNavigate();
  // const usersCollection = collection(db, "users");

  const signInwithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        onLogin(); // Trigger the login function passed from App
        localStorage.setItem("isAuth", true);
        handleCreateUser(result.user);
        navigate("/"); // Navigate to the main route after login
      })
      .catch((error) => {
        console.error("Error during Google Sign-In:", error);
      });
  };

  const createUser = async (user, id) => {
    const userRef = doc(db, "users", id);
    await setDoc(userRef, user);
  };

  const handleCreateUser = async (user) => {
    // Update state with the userObj data
    const userObj = {
      name: user.displayName,
      email: user.providerData[0].email,
      photo: user.photoURL,
    };

    localStorage.setItem(
      "curUser",
      JSON.stringify({ uid: user.uid, ...userObj })
    );
    createUser(userObj, user.uid);
  };

  return (
    <div className="m-auto flex flex-col items-center justify-center w-72 gap-4 h-screen">
      <div className="text-xl font-semibold">Join DevTalks community</div>
      <div className="font-light text-center">
        Get more features and privileges by joining the most helpful community.
      </div>
      <div className="mt-6">
        <Button
          onClick={signInwithGoogle} // Use handleSignIn to include navigation
          icon={"login"}
          text={"Sign in with Google"}
          colorClass={"bg-btn-green hover:shadow-md"}
        />
      </div>
    </div>
  );
}

export default SignIn;
