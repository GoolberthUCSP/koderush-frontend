// FinalResults.tsx
import { For } from "solid-js";

type FinalResultsProps = {
    match: MatchState;
};

export default function FinalResults(props: FinalResultsProps) {
    // Example: Compute score by counting correct submissions
    const getPlayerScores = () => {
        const scores: Record<string, number> = {};
        for (const submission of props.match.submissions) {
            if (submission.veredict === 'accepted') {
                scores[submission.player] = (scores[submission.player] || 0) + 1;
            }
        }
        return scores;
    };

    const scores = getPlayerScores();
    const sortedPlayers = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    return (
        <div>
            <h2>🏁 Match Results</h2>
            <ul>
                <For each={sortedPlayers}>
                    {([player, score]) => (
                        <li><strong>{player}</strong>: {score} points</li>
                    )}
                </For>
            </ul>
        </div>
    );
}
