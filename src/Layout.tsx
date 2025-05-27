//@ts-nocheck
import { Link } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl">My Application</h1>
      </header>
      <main className="flex-1 p-4">
        {/* Main content goes here */}
        <p>Welcome to my application!</p>
        <Link to="/home" className="text-blue-500 hover:underline">
          Home
        </Link>
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2023 My Application
      </footer>
    </div>
  );
};

export default Layout;
