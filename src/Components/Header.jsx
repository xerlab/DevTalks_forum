// components/Header.js
import Logo from "./Header/Logo";
import SearchBar from "./Header/SearchBar";
import Button from "./Header/Button";
import { useNavigate } from "react-router-dom";

function Header({ onLogout }) {
  const navigate = useNavigate();

  const handlesignout = () => {
    localStorage.clear();
    onLogout();
    navigate("/sign-in"); // Navigate to the main route after login
  };

  const handleAsk = () => {
    navigate("/ask-question"); // Navigate to the main route after login
  };

  return (
    <div className="border-b border-icon-white">
      <div className="flex justify-between bg-background container items-center m-auto my-4">
        <Logo />
        <SearchBar />
        <div className="flex gap-4 items-center">
          <Button
            onClick={handleAsk}
            icon="add_circle"
            text="Ask question"
            colorClass="bg-btn-inactive hover:bg-btn-yellow"
          />
          <Button
            onClick={handlesignout}
            icon="logout"
            colorClass="bg-btn-green hover:bg-btn-deepGreen"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
