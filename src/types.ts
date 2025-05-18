type ProblemExample = {
    input: string,
    output: string,
    explanation: string,
}

type ServerProblem = {
    problem_id: number,
    title: string,
    memory_limit: number, // en megabytes
    time_limit: number, // en segundos
    statement: string,
    input_description: string,
    output_description: string,
    examples: ProblemExample[],
    tutorial: string,
    users_with_problem_access: string[],
    users_with_tutorial_access: string[]
}

type Submission = {
    problem_id: number,
    timestamp: number,
    veredict: 'waiting' | 'accepted' | 'wrong answer' | 'time limit exceeded' | 'memory limit exceeded' | 'compilation error' | 'runtime error' | 'internal error'
}

type ServerMatch = {
    match_id: string,
    start_timestamp: number | null,
    users: string[],
    submissions: Submission[],
    problems: ServerProblem[],
    num_problems: number,
    seconds_per_problem: number,
    seconds_per_tutorial: number,
}

type UserProblem = {
    problem_id: number,
    title: string,
    memory_limit: number, // en megabytes
    time_limit: number, // en segundos
    statement: string,
    input_description: string,
    output_description: string,
    examples: ProblemExample[],
    tutorial: string | null,
}

type ScoreboardEntry = {
    user_id: string,
}

type UserMatch = {
    match_id: string,
    user_id: string,
    start_timestamp: number | null,
    users: string[],
    scoreboard: ScoreboardEntry[],
    problems: UserProblem[],
    num_problems: number,
    seconds_per_problem: number,
    seconds_per_tutorial: number,
    submissions: Submission[],
}

type UserMessage = {
    dtype: 'notification' | 'state_update',
    data: string | UserMatch,
    timestamp: number
}


