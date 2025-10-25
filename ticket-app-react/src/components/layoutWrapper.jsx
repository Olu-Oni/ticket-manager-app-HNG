import { Outlet } from "react-router-dom";
import Footer from "./footer";

// Layout components with Outlet
const LayoutWrapper = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-col grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};



export  {LayoutWrapper};
