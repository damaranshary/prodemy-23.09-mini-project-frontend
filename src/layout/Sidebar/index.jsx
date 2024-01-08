import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../lib/axios/axios";

const Sidebar = () => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res));
  }, []);

  return (
    <aside className="sticky left-0 top-0 flex min-h-screen flex-col flex-wrap gap-y-2 border border-transparent border-r-gray-200 bg-primary py-5 text-black pe-5">
      <Disclosure>
        {({ open }) => (
          <>
            <div className="flex flex-row ms-2">
              <Link to="/product-list">Produk</Link>
              <Disclosure.Button className="ms-2 py-1 text-bas text-black focus:outline-none">
                {open ? <AiOutlineDown /> : <AiOutlineUp />}
              </Disclosure.Button>
            </div>
            <div className="flex flex-col gap-y-1 ms-5 text-sm">
              {categories?.map((category) => (
                <Link to={`/product-list?category=${category.id}`}>
                  <Disclosure.Panel>{category.name}</Disclosure.Panel>
                </Link>
              ))}
            </div>
          </>
        )}
      </Disclosure>
    </aside>
  );
};

export default Sidebar;
