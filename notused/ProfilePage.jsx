import { useAuthContext } from "../Contexts/AuthContext";
import { createSignal } from "solid-js";

function ProfileInfo() {
  const [editProfileMode, setEditProfileMode] = createSignal(false);
  const { userData, setUserData } = useAuthContext();

  // Estado local para los campos editables
  const [localName, setLocalName] = createSignal(userData().name);
  const [localLocation, setLocalLocation] = createSignal(userData().location);
  const [localEmail, setLocalEmail] = createSignal(userData().email);
  const [localBio, setLocalBio] = createSignal(userData().bio);

  const handleEditProfile = () => {
    setEditProfileMode(true);
    // Al entrar en modo edición, llenamos los campos locales con los datos actuales
    setLocalName(userData().name);
    setLocalLocation(userData().location);
    setLocalEmail(userData().email);
    setLocalBio(userData().bio);
  };

  const handleCancelEdit = () => {
    setEditProfileMode(false);
    // Al cancelar, los campos locales se descartan y la vista vuelve a userData
  };

  const handleSaveProfile = () => {
    // Actualiza el userData con los valores locales
    setUserData({
      ...userData(),
      name: localName(),
      location: localLocation(),
      email: localEmail(),
      bio: localBio(),
    });

    // Aquí se realiza la llamada a la API para guardar los datos
    console.log("Saving changes:", {
      username: userData().username,
      name: userData().name,
      profilePicture: userData().profilePicture,
      location: localLocation(),
      email: localEmail(),
      bio: localBio()
    });
    setEditProfileMode(false);
  };

  return (
    <div className="text-center">
      <img src={userData().profilePicture} alt="Profile" className="img-fluid rounded-circle mb-3" />
      {editProfileMode() ? (
        <>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" value={userData().username} readOnly />
            <div className="form-text">Este nombre de usuario no se puede modificar.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={localName()} onChange={(e) => setLocalName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input type="text" className="form-control" id="location" value={localLocation()} onChange={(e) => setLocalLocation(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={localEmail()} onChange={(e) => setLocalEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="bio" className="form-label">Bio</label>
            <textarea
              className="form-control"
              id="bio"
              value={localBio()}
              onChange={(e) => setLocalBio(e.target.value)}
              style={{ height: '200px' }}
            ></textarea>
          </div>
          <button className="btn btn-secondary me-2" onClick={handleCancelEdit}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSaveProfile}>Save</button>
        </>
      ) : (
        <>
          <h1 className="text-muted">{userData().name}</h1>
          <p className="text-muted">@{userData().username}</p>
          <i className="bi bi-geo-alt me-2"></i>
          <p className="text-muted">{userData().location}</p>
          <i className="bi bi-envelope me-2"></i>
          <p className="text-muted">{userData().email}</p>
          <i className="bi bi-info-circle me-2"></i>
          <p className="text-muted">{userData().bio}</p>
          <button className="btn btn-primary" onClick={handleEditProfile}>Edit Profile</button>
        </>
      )}
    </div>
  );
}

function ProfileStats() {
  return (
    <div>
      <h1>Profile Stats</h1>
      <p>This is the profile stats section.</p>
    </div>
  );
}

export function ProfilePage() {
  return (
    <div className="row">
      <aside className="col-md-3 my-3 border-end hiding">
        <ProfileInfo />
      </aside>
      <main className="col-md-9 py-3">
        <ProfileStats />
      </main>
    </div>
  );
}