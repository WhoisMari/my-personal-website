import { Outlet } from "react-router-dom";
import Layout from "./Layout";
import Contact from "../Contact/Contact";

const RootLayout = () => (
  <div className="body-wrapper">
    <Layout />
    <Outlet />
    <Contact />
  </div>
);

export default RootLayout;
