function LeaderboardContent() {
  const leaderboardData = [
    { name: 'Player 1', score: 100 },
    { name: 'Player 2', score: 80 },
    { name: 'Player 3', score: 60 },
    { name: 'Player 4', score: 40 },
    { name: 'Player 5', score: 20 },
  ];
  
  return (
    <>
    <h1>Leaderboard</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function LeaderboardAside() {
  return (
    <>
      <div className="sticky-top">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Leaderboard Info</h5>
            <p className="card-text">This is the leaderboard info section.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function LeaderboardPage() {
  return (
    <div className="row">
      <main className="col-md-8 py-3">
        <LeaderboardContent />
      </main>
      <aside className="col-md-4 my-3 border-end hiding">
        <LeaderboardAside />
      </aside>
    </div>
  );
}