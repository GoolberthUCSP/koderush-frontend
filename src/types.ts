type Submission = {
    player: string,
    problem_id: number,
    timestamp: number,
    veredict: 'waiting' | 'accepted' | 'wrong answer' | 'time limit exceeded' | 'memory limit exceeded' | 'compilation error' | 'runtime error' | 'internal error',
    index: number | null | undefined
}

type ProblemExample = {
    input: string,
    output: string,
    explanation: string,
}

type Problem = {
    problem_id: string,
    title: string,
    memory_limit: number, // en megabytes
    time_limit: number, // en segundos
    statement: string,
    input_description: string,
    output_description: string,
    examples: ProblemExample[],
    tutorial: string | null,
}

type MatchState = {
    match_id: string,
    player: string,
    start_timestamp: number | null,
    players: string[],
    submissions: Submission[],
    problems: { [problem_id: string]: Problem }, // Map<string, Problem>
    seconds_per_problem: number | null,
    seconds_per_tutorial: number | null,
}