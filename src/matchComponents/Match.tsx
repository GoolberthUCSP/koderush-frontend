import { onCleanup, onMount, createSignal, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { io, Socket } from 'socket.io-client'
import Game from "./Game";
import WaitingHub from "./WaitingHub";
import FinalResults from "./FinalResults";
import { useNavigate, useSearchParams } from "@solidjs/router";

let socket: Socket

export default function Match() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const player = params.name as string;
    const match_id = params.code as string;
    const [now, setNow] = createSignal(Math.floor(Date.now() / 1000));
    const matchEndedKey = `matchEnded:${match_id}`;
    const initialMatchEnded = localStorage.getItem(matchEndedKey) === 'true';
    const [matchEnded, setMatchEnded] = createSignal(initialMatchEnded);

    let clockInterval: ReturnType<typeof setInterval> | null = null;
    console.log(matchEnded())

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
        socket = io("http://127.0.0.1:5000");
        console.log('Socket connected');
        clockInterval = setInterval(() => {
            console.log('time left', match.start_timestamp, now());
            setNow(Math.floor(Date.now() / 1000));
        }, 1000);
        socket.emit('join_match', {
            match_id: match.match_id,
            player: match.player,
        })
        socket.on('rejected', () => {
            console.log('Rejected from match');
            navigate('/')
        })
        socket.on('start_timestamp', (timestamp) => {
            setMatch('start_timestamp', () => timestamp)
            console.log("Start timestamp", timestamp)
        })
        socket.on('new_player', (player) => {
            setMatch('players', (players) => [...players, player])
            console.log('New player');
        })
        socket.on('state_update', (state) => {
            setMatch(() => state)
            console.log('Update state', state);
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
            setMatchEnded(true);
            localStorage.setItem(matchEndedKey, 'true');
            console.log('Match ended');
        })
    })

    createEffect(() => {
        if (match.start_timestamp && now() >= match.start_timestamp) {
            if (clockInterval) {
            clearInterval(clockInterval);
            clockInterval = null;
            console.log("Clock interval stopped");
            }
        }
    });

    onCleanup(() => {
        if (clockInterval) clearInterval(clockInterval);
        socket.disconnect();
        console.log('Socket disconnected');
    })

    const submitCode = (problemId: string, language: string, code: string) => {
        const index: number = match.submissions.length
        const submission: Submission = {
            player: match.player,
            problem_id: problemId,
            timestamp: Math.floor(Date.now() / 1000),
            veredict: 'waiting',
            index: index
        }
        setMatch('submissions', (submissions) => [...submissions, submission])
        socket.emit('upload_solution', {
            problem_id: problemId,
            language: language,
            solution: code,
            index: index
        })
    }

    const matchUI = () => {
        // !match.start_timestamp || now() < match.start_timestamp
        if (!match.start_timestamp || now() < match.start_timestamp) {
            return <WaitingHub match={match} />
        } else {
            if (matchEnded()){
                return <FinalResults match={match}></FinalResults>
            }
            else {
                return <Game match={match} submitCode={submitCode}/>
            }
        }
    }

    return (
        <>
        { matchUI() }
        </>
    )
}