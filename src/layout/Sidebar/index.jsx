import { AiOutlineAppstore, AiOutlineShopping } from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sticky left-0 top-0 flex h-screen w-1/12 flex-col flex-wrap gap-y-2 border border-transparent border-r-gray-200 bg-primary py-5">
      <div className="sticky flex flex-col items-center gap-y-10 pt-16 ">
        <Link to="/" className="flex flex-col items-center">
          <AiOutlineShopping className="inline-block text-white text-3xl xl:text-5xl" />
          <p className="text-center text-xs sm:text-sm md:text-base font-semibold text-white">Home</p>
        </Link>
        <Link to="/product-list" className="flex flex-col items-center">
          <AiOutlineAppstore className="inline-block text-background text-3xl xl:text-5xl" />
          <p className="text-center text-xs sm:text-sm  md:text-base font-semibold text-background">
            Product <br />
            List
          </p>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
