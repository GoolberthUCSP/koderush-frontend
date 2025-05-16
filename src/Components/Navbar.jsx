import { usePageContext } from "../Contexts/PageContext";

const NavItems = [
    { name: 'Home', id: 'home'},
    { name: 'Leaderboard', id: 'leaderboard'},
    { name: 'Contests', id: 'contests'},
    { name: 'Profile', id: 'profile'},
];

function Navbar() {
    const { getSelectedPage, handleSelectPage } = usePageContext();

    const handleTabClick = (page) => {
        handleSelectPage(page);
    };

    return (
        <ul class="nav nav-tabs justify-content-center">
            {NavItems.map((item) => (
                <li class="nav-item" key={item.id}>
                    <a
                        class={`nav-link ${getSelectedPage() === item.id ? 'active' : ''}`}
                        onClick={() => handleTabClick(item.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {item.name}
                    </a>
                </li>
            ))}
        </ul>
    );
}

export default Navbar;