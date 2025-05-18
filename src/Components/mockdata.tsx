export const mockServerMatch: ServerMatch = {
    match_id: "match_001",
    start_timestamp: 1684500000, // A UNIX timestamp
    users: ["user123", "user456"],
    submissions: [
        {
            problem_id: 1,
            timestamp: 1684500050,
            veredict: "accepted",
        },
        {
            problem_id: 2,
            timestamp: 1684500150,
            veredict: "wrong answer",
        },
        {
            problem_id: 2,
            timestamp: 1684500250,
            veredict: "accepted",
        },
    ],
    problems: [
        {
            problem_id: 1,
            title: "Sum of Two Numbers",
            memory_limit: 64,
            time_limit: 1,
            statement: "Given two integers, output their sum.",
            input_description: "Two space-separated integers a and b.",
            output_description: "A single integer, the sum of a and b.",
            examples: [
                {
                    input: "2 3",
                    output: "5",
                    explanation: "2 + 3 = 5",
                },
                {
                    input: "-1 5",
                    output: "4",
                    explanation: "-1 + 5 = 4",
                },
            ],
            tutorial: "Just add the two integers using a + b.",
            users_with_problem_access: ["user123", "user456"],
            users_with_tutorial_access: ["user123"],
        },
        {
            problem_id: 2,
            title: "Check Palindrome",
            memory_limit: 128,
            time_limit: 2,
            statement: "Check whether a given string is a palindrome.",
            input_description: "A single string s containing lowercase letters.",
            output_description: "Output 'yes' if the string is a palindrome, otherwise 'no'.",
            examples: [
                {
                    input: "racecar",
                    output: "yes",
                    explanation: "racecar is the same forwards and backwards.",
                },
                {
                    input: "hello",
                    output: "no",
                    explanation: "hello reversed is 'olleh', which is not the same.",
                },
            ],
            tutorial: "Reverse the string and compare it to the original.",
            users_with_problem_access: ["user123", "user456"],
            users_with_tutorial_access: ["user456"],
        },
    ],
    num_problems: 2,
    seconds_per_problem: 10,
    seconds_per_tutorial: 10,
};