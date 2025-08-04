import { Link } from "react-router-dom";

const Footer = () => {
  return (
    // bg-gradient-to-br from-purple-950 via-slate-900 to-gray-900
    <footer className="bg-transparent text-slate-400 border border-amber-700 p-4 text-xs rounded-xl mt-3">
      {/* Slogan */}
      <p className="text-center mb-2 text-amber-400 font-semibold">
        Codynect – Code. Connect. Collaborate.
      </p>
      {/* Links */}
      <div className="flex justify-center gap-3 mb-2">
        <Link to="/about" className="hover:text-amber-500">
          About
        </Link>
        <Link to="/terms" className="hover:text-amber-500">
          Terms & Conditions
        </Link>
        <Link to="/privacy" className="hover:text-amber-500">
          Privacy Policy
        </Link>
      </div>
      <hr className="text-amber-700" />
      {/* Copyright */}
      <p className="text-center text-slate-500 pt-1">
        © {new Date().getFullYear()} Codynect. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
