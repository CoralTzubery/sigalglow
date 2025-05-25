import { Link, Outlet } from "react-router-dom";
import styles from "./App.module.scss";


export function App() {

  return (
    <>
      <p>Hello</p>
      <Nav />
      <Outlet />
    </>
  );
}

export function Nav() {
  return (
    <nav className={styles.navContainer}>
      <menu className={styles.appNav}>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </menu>
    </nav>
  );
}
