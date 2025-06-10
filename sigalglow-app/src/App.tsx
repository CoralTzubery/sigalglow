import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import { AuthProvider } from "./context/auth.context";

import styles from "./App.module.scss";

export function App() {
  return (
    <>
    <AuthProvider>
      <Nav />
      <Outlet />
    </AuthProvider>

    </>
  );
}

export function Nav() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className={styles.navContainer}>
      <menu className={styles.appNav}>
        <li><Link to="/">דף הבית</Link></li>
        <li><Link to="/about">אודות</Link></li>
        <li><Link to="/contact">יצירת קשר</Link></li>
        <li><Link to="/treatments">טיפולים</Link></li>
        <li><Link to="/appointments">תורים</Link></li>
        <li><Link to="/reviews">ביקורות</Link></li>
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">התחברות</Link></li>
            <li><Link to="/register">הרשמה</Link></li>
          </>
        ) : (
          <li>
            <button onClick={logout} className={styles.logoutButton}>התנתקות</button>
          </li>
        )}
      </menu>
    </nav>
  );
}
