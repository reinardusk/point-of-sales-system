import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="flex bg-gray-900 justify-between items-center px-5 py-3 fixed w-full border border-b-2 border-t-0 border-l-0 border-r-0 border-teal-500">
        <Link to="/">
          <h1 className="text-4xl first-letter:text-teal-500 font-bold text-white">
            invoice
          </h1>
        </Link>
        <div className="w-[30%]">
          <form className="flex w-full"></form>
        </div>
        <ul className="flex gap-5 items-center tracking-wider font-semibold text-xl text-teal-500">
          <Link to="/invoice-list">
            <li className="cursor-pointer">Invoice List</li>
          </Link>
          <li className="cursor-pointer">
            <Link to="/create">Create Invoice</Link>
          </li>
        </ul>
      </nav>
      <div className="pt-20"></div>
    </>
  );
}
