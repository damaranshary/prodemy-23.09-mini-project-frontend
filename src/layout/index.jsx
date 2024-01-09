import Sidebar from "./Sidebar";

const Layout = ({ children }) => (
  <div className="flex flex-row gap-x-10">
    <Sidebar />
    <main className="flex-1">{children}</main>
  </div>
);

export default Layout;
