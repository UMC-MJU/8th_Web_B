import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-semibold">DUDU</h1>
      <div className="flex items-center space-x-4">
        <FaShoppingCart className="text-2xl cursor-pointer" />
        <span className="text-xl font-medium">12</span>
      </div>
    </div>
  );
};

export default Navbar;
