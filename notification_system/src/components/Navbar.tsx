import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface NavbarProps {
  token: string | null;
}

const Navbar: FC<NavbarProps> = ({ token }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="bg-gray-800 shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="text-xl font-bold cursor-pointer "
          onClick={() => navigate("/")}
        >
          TikTok Shop
        </div>
        <div className="space-x-4">
          {/* <a href="#features" className=" hover:text-blue-500">
            Features
          </a>
          <a href="#pricing" className=" hover:text-blue-500">
            Pricing
          </a> */}
          {!token && (
            <>
              <a href="/register" className=" hover:text-blue-800">
                Register
              </a>
              <a
                href="/login"
                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
              >
                Login
              </a>
            </>
          )}
          {token && (
            <Button
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg cursor-pointer"
              onClick={handleLogout}
            >
              {" "}
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
