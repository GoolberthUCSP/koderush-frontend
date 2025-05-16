import { useAuthContext } from "../Contexts/AuthContext";
import { usePageContext } from "../Contexts/PageContext";
import { createSignal } from "solid-js";
import  LoginModal  from "./LoginModal";
import RegisterModal  from "./RegisterModal";

function Header(props) {
  const { handleSelectPage } = usePageContext();
  const { isLoggedIn, logout } = useAuthContext();
  const [showLoginModal, setShowLoginModal] = createSignal(false);
  const [showRegisterModal, setShowRegisterModal] = createSignal(false);

  const openLoginModal = () => {
      setShowLoginModal(true);
  }
  const closeLoginModal = () => {
      setShowLoginModal(false);
  }

  const openRegisterModal = () => {
      setShowRegisterModal(true);
  }
  const closeRegisterModal = () => {
      setShowRegisterModal(false);
  }

  const handleLogout = () => {
      logout();
      handleSelectPage('home');
  }

  return (
    <header className="py-3 d-flex align-items-center justify-content-between container-fluid">
      <h2 className="text-primary">Koderush</h2>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Type contest ID" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">
          Join
        </button>
      </form>
      <div>
        {isLoggedIn() ? (
          <button className="btn btn-outline-primary" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>
        ) : (
          <>
            <button className="btn btn-outline-primary me-2" onClick={openLoginModal}>
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Login
            </button>
            <button className="btn btn-outline-secondary" onClick={openRegisterModal}>
              <i className="bi bi-person-plus me-2"></i>
              Register
            </button>
          </>
          )}
      </div>
      <LoginModal show={showLoginModal} onClose={closeLoginModal} />
      <RegisterModal show={showRegisterModal} onClose={closeRegisterModal} />
    </header>
  );
}

export default Header;