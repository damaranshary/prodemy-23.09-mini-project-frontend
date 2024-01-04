import { Disclosure } from "@headlessui/react";

const Sidebar = () => {
  return (
    <aside className="sticky left-0 top-0 flex min-h-screen flex-col flex-wrap gap-y-2 border border-transparent border-r-gray-200 bg-primary py-5 font-semibold text-black pe-5">
      <Disclosure>
        <Disclosure.Button className="py-1 text-base">Produk</Disclosure.Button>
        <div className="flex flex-col gap-y-2 ms-5 text-sm">
          <Disclosure.Panel>Makanan</Disclosure.Panel>
          <Disclosure.Panel>Minuman</Disclosure.Panel>
          <Disclosure.Panel>Snack</Disclosure.Panel>
        </div>
      </Disclosure>
    </aside>
  );
};

export default Sidebar;
