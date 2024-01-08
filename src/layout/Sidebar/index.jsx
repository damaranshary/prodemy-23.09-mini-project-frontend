import { AiOutlineHome, AiOutlineProject } from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sticky left-0 top-0 w-1/12 flex min-h-screen flex-col flex-wrap gap-y-2 border border-transparent border-r-gray-200 bg-primary py-5 text-black">
      <div className="flex flex-col gap-y-10 pt-16 items-center ">
        <Link to="/" className="flex flex-col items-center">
          <AiOutlineHome className="inline-block text-5xl mb-2 text-blue-500" />
          <p className="text-lg font-semibold text-blue-500">Home</p>
        </Link>
        <Link to="/product-list" className="flex flex-col items-center">
          <AiOutlineProject className="inline-block text-5xl mb-2" />
          <p className="text-lg font-semibold text-center">Product <br/>List</p>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
