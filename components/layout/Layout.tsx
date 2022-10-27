import React from "react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { PromoBar } from "../PromoBar";
import { Basket } from "../Basket";

interface ILayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <div>
      <PromoBar />
      <Navbar />
      <div className="flex flex-row w-screen">
        <div className="flex m-auto w-full m-auto">
          {" "}
          <div className="w-4/6">{children}</div>
          <Basket />
        </div>
      </div>

      <Footer />
    </div>
  );
};
