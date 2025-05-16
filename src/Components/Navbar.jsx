import { usePageContext } from "../Contexts/PageContext";
import { useAuthContext } from "../Contexts/AuthContext";

const NavItems = [
    { name: 'Home', id: 'home', icon: 'bi-house', needLogged: false },
    { name: 'Leaderboard', id: 'leaderboard', icon: 'bi-trophy', needLogged: false },
    { name: 'Contests', id: 'contests', icon: 'bi-file-earmark-text', needLogged: false },
    { name: 'Profile', id: 'profile', icon: 'bi-person', needLogged: true },
];

function Navbar() {
    const { isLoggedIn } = useAuthContext();
    const { getSelectedPage, handleSelectPage } = usePageContext();

    const handleTabClick = (page) => {
        handleSelectPage(page);
    };

    return (
        <ul class="nav nav-tabs justify-content-end">
            {NavItems.map((item) => (
                <li class={`nav-item ${item.needLogged && !isLoggedIn() ? 'd-none' : ''}`} key={item.id}>
                    <a  
                        class={`nav-link ${getSelectedPage() === item.id ? 'active' : ''}`}
                        onClick={() => handleTabClick(item.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <i class={`bi ${item.icon} me-2`}></i>
                        {item.name}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default Navbar;