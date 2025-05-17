export const mockServerProblem: ServerProblem = {
  problem_id: 1,
  title: "Sum of Two Numbers",
  memory_limit: 256,
  time_limit: 2,
  statement: "<p>Given two integers A and B, return their sum.</p>",
  input_description: "Two space-separated integers",
  output_description: "A single integer",
  examples: [{
    input: "2 3",
    output: "5",
    explanation: "2 + 3 = 5"
  }],
  tutorial: "Basic addition tutorial...",
  users_with_problem_access: ["*"], // Allow all users
  users_with_tutorial_access: ["*"]
};

export const mockServerMatch: ServerMatch = {
  match_id: "TEST123",
  start_timestamp: null,
  users: ["Player1", "Player2"],
  submissions: [],
  problems: [mockServerProblem],
  num_problems: 1,
  seconds_per_problem: 30,
  seconds_per_tutorial: 60
};

// Utility function to transform server data to client format
export function transformMatch(match: ServerMatch, username: string): UserMatch {
  return {
    match_id: match.match_id,
    user_id: username,
    start_timestamp: match.start_timestamp,
    users: match.users,
    scoreboard: [], // You'd need to calculate this from submissions
    submissions: match.submissions,
    problems: match.problems.map(p => ({
      problem_id: p.problem_id,
      title: p.title,
      memory_limit: p.memory_limit,
      time_limit: p.time_limit,
      statement: p.statement,
      input_description: p.input_description,
      output_description: p.output_description,
      examples: p.examples,
      tutorial: p.users_with_tutorial_access.includes('*') ? p.tutorial : null
    })),
    num_problems: match.num_problems,
    seconds_per_problem: match.seconds_per_problem,
    seconds_per_tutorial: match.seconds_per_tutorial
  };
}