import koderushIcon from "../assets/favicon.ico";

function Header(props) {
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
            <button className="btn btn-outline-primary me-2">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Login
            </button>
            <button className="btn btn-outline-secondary">
              <i className="bi bi-person-plus me-2"></i>
              Register
            </button>
      </div>
    </header>
  );
}

export default Header;