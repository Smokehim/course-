//@ts-nocheck
import { Link } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl">CareerCampus</h1>
      </header>
      <main className="flex-1 p-4">
        {/* Main content goes here */}
        <div className="flex flex-col items-center justify-center h-full space-y-4 gap-4">
          <p className="text-8xl font-bold text-gray-800">Welcome to CareerCampus!</p>
        <button className="border border-blue-700 p-3 rounded-xl hover:bg-blue-700"><Link to="/home" className="text-blue-500 hover:underline text-2xl font-bold">Home</Link></button>
        </div>
        
      </main>
      <footer className="bg-blue-500 text-white p-4 text-center">
        © 2023 My Application
      </footer>
    </div>
  );
};

export default Layout;
