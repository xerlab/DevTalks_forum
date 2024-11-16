import { NavLink } from "react-router-dom";

function Navbar() {
  const getLinkClasses = ({ isActive }) => {
    // console.log(isActive);
    return `${isActive ? "bg-box-navbar" : "bg-box-question"}`;
  };

  return (
    <div className="bg-box-question rounded-2xl py-4 overflow-hidden border border-btn-green">
      <NavLink to="/">
        {({ isActive }) => (
          <div className={`navbar ${getLinkClasses({ isActive })}`}>
            <div className="material-symbols-outlined gray">list</div>
            <div>Questions</div>
          </div>
        )}
      </NavLink>
      <NavLink to="/your-questions">
        {({ isActive }) => (
          <div className={`navbar   ${getLinkClasses({ isActive })}`}>
            <div className="material-symbols-outlined gray">psychology_alt</div>
            <div>Your Questions</div>
          </div>
        )}
      </NavLink>
      <NavLink to="/your-answers">
        {({ isActive }) => (
          <div className={`navbar   ${getLinkClasses({ isActive })}`}>
            <div className="material-symbols-outlined gray">maps_ugc</div>
            <div>Your Answers</div>
          </div>
        )}
      </NavLink>
      <NavLink to="/your-upvotes">
        {({ isActive }) => (
          <div className={`navbar  ${getLinkClasses({ isActive })}`}>
            <div className="material-symbols-outlined gray">favorite</div>
            <div>Your Upvotes</div>
          </div>
        )}
      </NavLink>
    </div>
  );
}

export default Navbar;
