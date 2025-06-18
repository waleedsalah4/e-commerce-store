import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo and Social Icons */}
          <div className="lg:col-span-1">
            <Link to="/" className="mb-6 inline-block">
              <h2 className="font-anton text-2xl font-bold tracking-wider">
                Shop.co
              </h2>
            </Link>
            <p className="mb-6 text-sm text-gray-400">
              Discover amazing products and elevate your lifestyle with our
              curated collection.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@shop.co"
                className="text-gray-400 transition-colors hover:text-white"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  My Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Clothing
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Jewelry
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Home & Garden
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <div className="mb-6 border-t border-gray-800"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Shop.co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
