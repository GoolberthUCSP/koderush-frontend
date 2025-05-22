import { onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { io, Socket } from 'socket.io-client'
import Header from "./Header";
import Footer from "./Footer";
import Game from "./Game";
import WaitingHub from "./WaitingHub";

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

type MatchProps = {
    match_id: string,
    player: string
}

let socket: Socket

export default function Match({match_id, player}: MatchProps) {
    const [match, setMatch] = createStore<MatchState>({
        match_id: match_id,
        player: player,
        start_timestamp: null,
        players: [],
        submissions: [],
        problems: {},
        seconds_per_problem: null,
        seconds_per_tutorial: null,
    })
    onMount(() => {
        socket = io();
        console.log('Socket connected');
        socket.emit('join_match', {
            match: match.match_id,
            player: match.player,
        })
        socket.on('rejected', () => {
            console.log('Rejected from match');
        })
        socket.on('new_player', (player) => {
            setMatch('players', (players) => [...players, player])
            console.log('New player');
        })
        socket.on('state_update', (state) => {
            setMatch(() => state)
            console.log('Update state');
        })
        socket.on('new_submission', (submission) => {
            if (submission.player == match.player) {
                setMatch('submissions', submission.index, () => submission)
            } else {
                setMatch('submissions', (submissions) => [...submissions, submission])
            }
            console.log('New submission');
        })
        socket.on('new_problem', (problem) => {
            setMatch('problems', problem.problem_id, () => problem)
            console.log('New problem');
        })
        socket.on('new_tutorial', (tutorial) => {
            setMatch('problems', tutorial.problem_id, 'tutorial', () => tutorial.tutorial)
            console.log('New tutorial');
        })
        socket.on('match_ended', () => {
            console.log('Match ended');
        })
    })

    onCleanup(() => {
        socket.disconnect();
        console.log('Socket disconnected');
    })

    const matchUI = () => {
        if (!match.start_timestamp || Date.now() < match.start_timestamp) {
            return <WaitingHub match={match} />
        } else {
            return <Game match={match}/>
        }
    }

    return (
        <>
        <Header />
        { matchUI() }
        <Footer />
        </>
    )
}