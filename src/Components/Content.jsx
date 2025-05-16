import { usePageContext } from "../Contexts/PageContext";
import { HomePage } from './HomePage';
import { LeaderboardPage } from './LeaderboardPage';
import { ContestsPage } from './ContestsPage';
import { ProfilePage } from './ProfilePage';

function Content(props) {
    const { getSelectedPage } = usePageContext();

    return (
        <div className="row">
            <aside className="col-md-3 my-3 border-end hiding">
                {/* Aside content */}
                This is the sidebar
            </aside>
            <main className="col-md-9 py-3">
                {/* Main content */}
                {getSelectedPage() === 'home' && <HomePage />}
                {getSelectedPage() === 'leaderboard' && <LeaderboardPage />}
                {getSelectedPage() === 'contests' && <ContestsPage />}
                {getSelectedPage() === 'profile' && <ProfilePage />}
            </main>
        </div>
    );
}

export default Content;