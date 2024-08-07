/**
 * This code was generated by Builder.io.
 */
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <>
      <Header
        onSearch={function (searchTerm: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <Sidebar />
        <MainContent />
      </div>
      <div className="box-border flex flex-col shrink-0 px-5 pt-8 pb-20 w-screen text-black bg-white min-h-[100px] ml-[calc(50%_-_50vw)] max-sm:pb-10">
        <section className="box-border flex flex-col grow shrink-0 self-stretch px-5 pt-8 pb-20 mx-auto w-full text-black bg-white max-w-[1200px] min-h-[100px] max-sm:pb-10">
          <span className="box-border inline relative flex-col shrink-0" />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
