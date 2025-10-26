import { Outlet } from "react-router-dom";
import Footer from "./footer";

// Layout components with Outlet
const LayoutWrapper = () => {
  return (
    <>
      {/* <main className="flex flex-col grow"> */}
        <Outlet />
      {/* </main> */}
      <Footer />
    </>
  );
};



export  {LayoutWrapper};
