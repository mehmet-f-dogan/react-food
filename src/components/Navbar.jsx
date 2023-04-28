import { NavLink } from "react-router-dom";

const Navbar = ({
  searchQuery,
  setSearchQuery,
  searchHandler,
  inputField,
  saveCount,
}) => {
  const navActive = ({ isActive }) => {
    return {
      color: isActive ? "#f43f5e" : null,
    };
  };

  return (
    <nav className="flex justify-between items-center container mx-auto py-8 flex-col lg:flex-row gap-5 lg:gap-0">
      <NavLink end to="/" className="text-2xl font-bold select-none">
        ReactFood
      </NavLink>
      <form onSubmit={searchHandler}>
        <input
          ref={inputField}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          required
          placeholder="Search recipe..."
          className="bg-white text-black p-3 px-8 lg:w-96  outline-none duration-300"
        />
      </form>
      <NavLink to="favorites" style={navActive}>
        Favorites <span className="font-bold ">({saveCount})</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;
