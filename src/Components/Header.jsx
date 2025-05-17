import { useAuthContext } from "../Contexts/AuthContext";
import { usePageContext } from "../Contexts/PageContext";
import { createSignal } from "solid-js";
import  LoginModal  from "./LoginModal";
import RegisterModal  from "./RegisterModal";
import koderushIcon from "../assets/favicon.ico";

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
      <div className="col d-flex">
        <img
            src={koderushIcon}
            alt="Koderush Icon"
            className="me-2"
            style={{ height: '3em' }}
        />
        <h2 className="text-primary mb-0">Koderush</h2>
      </div>
      <div className="col d-flex m-auto">
        <a className="ms-3">About Us</a>
        <a className="ms-3">Contact</a>
        <a className="ms-3">Help</a>
      </div>
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