import { Link, Outlet } from "react-router-dom";
import styles from "./App.module.scss";


export function App() {

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export function Nav() {
  return (
    <nav className={styles.navContainer}>
      <menu className={styles.appNav}>
        <li><Link to="/">דף הבית</Link></li>
        <li><Link to="/about">אודות</Link></li>
        <li><Link to="/contact">יצירת קשר</Link></li>
        <li><Link to="/treatments">טיפולים</Link></li>
        <li><Link to="/login">התחברות</Link></li>
        <li><Link to="/register">הרשמה</Link></li>
      </menu>
    </nav>
  );
}
