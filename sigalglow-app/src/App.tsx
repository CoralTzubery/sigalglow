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
        <li><Link to="/about">אודות</Link></li>
        <li><Link to="/contact">יצירת קשר</Link></li>
        <li><Link to="/treatments">טיפולים</Link></li>
      </menu>
    </nav>
  );
}
