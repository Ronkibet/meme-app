import { NavLink } from "react-router-dom";
const Navbar = ({ isAuthenticated, handleSignout, username }) => {
  return (
    <nav className="bg-transparent border  flex items-center justify-around flex-wrap p-3 md:border-gray-800 md:border-b-2 md:border-t-0 md:border-r-0 md:border-l-0">
      <div className="flex items-center flex-shrink-0 text-gray-800 mr-6">
        <NavLink
          to="/"
          className="font-semibold text-2xl text-yellow-200 tracking-tight"
          activeClassName=""
          exact
        >
          meme generator
        </NavLink>
      </div>
      <div className="flex items-center flex-shrink-0 text-yellow-200 font-bold justify-center">
        <NavLink
          to="/"
          exact
          className="ml-5 nav-link home"
          activeClassName="active"
        >
          Home
        </NavLink>
        {isAuthenticated ? (
          <>
            <NavLink
              to="/usermemes"
              exact
              className="ml-5 nav-link my-memes"
              activeClassName="active"
            >
              My memes
            </NavLink>
             {/* <NavLink
              to="/memes"
              exact
              className="ml-5 nav-link memes"
              activeClassName="active"
            >
              Memes
              </NavLink> */}
            <NavLink
              onClick={handleSignout}
              to="/signout"
              exact
              className="ml-5 nav-link sign-out"
            >
              Signout
            </NavLink>
          </>
      
       ) : (
         <>
           <NavLink to="/signin" className="ml-8 nav-link meme-generator">
             SignIn
           </NavLink>
           <NavLink
             to="/signup"
             className="ml-8 nav-link meme-generator"
             activeClassName="active"
           >
             Signup
           </NavLink>
         </>
       )}
     </div>
     {isAuthenticated ? (
       <div className="flex">
         <p className="text-yellow-300 font-semibold text-2xl">{username}</p>
       </div>
     ) : null}
   </nav>
  );
};
export default Navbar;