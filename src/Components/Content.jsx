import { usePageContext } from "../Contexts/PageContext";
import { HomePage } from './HomePage';
import { LeaderboardPage } from './LeaderboardPage';
import { ContestsPage } from './ContestsPage';
import { ProfilePage } from './ProfilePage';

function Content(props) {
    const { getSelectedPage } = usePageContext();

    return (
        <>
            {getSelectedPage() === 'home' && <HomePage />}
            {getSelectedPage() === 'leaderboard' && <LeaderboardPage />}
            {getSelectedPage() === 'contests' && <ContestsPage />}
            {getSelectedPage() === 'profile' && <ProfilePage />}
        </>
    );
}

export default Content;