import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Menu icon and Logo */}
          <div className="flex items-center gap-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <Link
              to="/"
              className="font-anton text-2xl font-bold tracking-wider text-black"
            >
              Shop.co
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-6 md:flex">
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                Home
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-800">
                About
              </Link>
              <Link to="/#" className="text-gray-600 hover:text-gray-800">
                Contact
              </Link>
            </div>
          </div>

          {/* Right side - Auth buttons or user menu */}
          <div className="flex items-center gap-x-4">
            {user ? (
              <>
                <Link to="/cart" className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </Link>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex cursor-pointer items-center gap-x-2 text-gray-600 hover:text-gray-800">
                      <span className="hidden text-sm font-medium md:inline">
                        {user.firstName}
                      </span>
                      <User className="h-5 w-5" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-0" align="end">
                    <div className="flex flex-col">
                      <div className="px-4 py-2 text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="my-1 border-t border-gray-200"></div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={logout}
                        className="justify-start text-black hover:text-gray-900"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <div className="flex items-center gap-x-2">
                <Link to="/auth/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/auth/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 right-0 left-0 z-50 bg-white shadow-lg md:hidden">
            <div className="flex flex-col space-y-4 px-4 py-4">
              <Link
                to="/"
                className="py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="#"
                className="py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
