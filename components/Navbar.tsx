import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex  bg-slate-400">
      <div className="m-auto">
        <ul className="flex p-2">
          <li className="px-2">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="px-2">
            <Link href="/categories">Categories</Link>
          </li>
          <li className="px-2">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="px-2">
            <Link href="/products">Products</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
