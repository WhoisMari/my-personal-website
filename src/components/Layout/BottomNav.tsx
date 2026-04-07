import { NavLink } from "react-router-dom";
import "./BottomNav.scss";

const tabs = [
  { to: "/about/", icon: "fa-solid fa-user", label: "About" },
  { to: "/my-skills/", icon: "fa-solid fa-code", label: "Skills" },
  { to: "/projects/", icon: "fa-solid fa-briefcase", label: "Projects" },
  { to: "/blog/", icon: "fa-solid fa-pen-to-square", label: "Blog" },
];

const BottomNav = () => (
  <nav className="bottom-nav">
    {tabs.map((tab) => (
      <NavLink
        key={tab.to}
        to={tab.to}
        className={({ isActive }) => `bottom-nav-tab${isActive ? " active" : ""}`}
      >
        <i className={tab.icon} />
        <span>{tab.label}</span>
      </NavLink>
    ))}
  </nav>
);

export default BottomNav;
