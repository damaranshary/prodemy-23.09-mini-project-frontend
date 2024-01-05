import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="flex justify-center pt-6">{children}</div>
    </>
  );
}

export default Layout;
