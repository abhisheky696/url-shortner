import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-linear-to-r from-purple-600 via-pink-500 to-red-900 p-6 flex justify-between items-center text-white sticky top-0">
      <h1 className="text-2xl font-bold">URL Shortener</h1>
      <nav className="space-x-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "font-semibold border-b-2 border-white pb-1 transition"
              : "hover:text-gray-200 transition"
          }
        >
          Shorten url
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive
              ? "font-semibold border-b-2 border-white pb-1 transition"
              : "hover:text-gray-200 transition"
          }
        >
          Analytics
        </NavLink>
        <NavLink
          to="/totallinks"
          className={({ isActive }) =>
            isActive
              ? "font-semibold border-b-2 border-white pb-1 transition"
              : "hover:text-gray-200 transition"
          }
        >
          Total Links
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
