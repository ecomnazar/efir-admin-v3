import { navbarLinks } from "@/shared/lib";
import clsx from "clsx";
import { NavLink, Outlet } from "react-router-dom";

export const BaseLayout = () => {
  return (
    <div className="w-screen h-screen flex items-start justify-between bg-background text-textColor">
      <nav
        className={`fixed w-[200px] lg:w-[275px] bg-secondary h-full shadow-boxShadow p-4 flex flex-col gap-y-1`}
      >
        {navbarLinks.map((link, i) => {
          return (
            <NavLink
            key={i}
              to={link.url}
              className={clsx(`text-textColor py-2 px-3 rounded-md hover:bg-background`)}
            >
              {link.text}
            </NavLink>
          );
        })}
      </nav>
      <main className={`ml-auto w-[calc(100vw-200px)] lg:w-[calc(100vw-275px)] p-4 h-full`}>
        <Outlet />
      </main>
      {/* <div className="bg-[#e3e3e3] w-screen h-[100px] flex gap-x-2 absolute bottom-0 left-0">
        <div className="w-[250px] h-[50px] bg-primary">primary</div>
        <div className="w-[250px] h-[50px] bg-secondary">secondary</div>
        <div className="w-[250px] h-[50px] bg-background">background</div>
        <div className="w-[250px] h-[50px] bg-textColor">textcolor</div>
      </div> */}
    </div>
  );
};
