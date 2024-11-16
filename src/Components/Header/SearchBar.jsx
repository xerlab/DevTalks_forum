// components/SearchBar.js
function SearchBar() {
  return (
    <div className="search flex gap-6 w-1/2">
      <div className="inputbox">
        <input
          type="text"
          placeholder="Search posts & replies"
          className="txtinput"
        />
      </div>
      <button className="btn bg-btn-green hover:bg-btn-deepGreen">
        <span className="material-symbols-outlined">search</span>
      </button>
    </div>
  );
}

export default SearchBar;
