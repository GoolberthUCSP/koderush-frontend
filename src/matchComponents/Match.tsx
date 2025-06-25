import { onCleanup, onMount, createSignal, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import Game from "./Game";
import WaitingHub from "./WaitingHub";
import FinalResults from "./FinalResults";
import { useNavigate, useSearchParams } from "@solidjs/router";

let socket: WebSocket;

export default function Match() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const player = params.name as string;
    const match_id = params.code as string;

    const [now, setNow] = createSignal(Math.floor(Date.now() / 1000));
    const matchEndedKey = `matchEnded:${match_id}`;
    const initialMatchEnded = localStorage.getItem(matchEndedKey) === "true";
    const [matchEnded, setMatchEnded] = createSignal(initialMatchEnded);

    let clockInterval: ReturnType<typeof setInterval> | null = null;

    const [match, setMatch] = createStore<MatchState>({
        match_id,
        player,
        start_timestamp: null,
        players: [],
        submissions: [],
        problems: {},
        seconds_per_problem: null,
        seconds_per_tutorial: null,
    });

    onMount(() => {
        socket = new WebSocket("wss://ngkia3mb99.execute-api.us-east-1.amazonaws.com/production");

        socket.onopen = () => {
            console.log("✅ WebSocket connected");
            clockInterval = setInterval(() => {
                setNow(Math.floor(Date.now() / 1000));
            }, 1000);

            socket.send(JSON.stringify({

                    action:"joinMatch",
                    match_id: match.match_id,
                    player: match.player,

            }));
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case "rejected":
                    navigate("/");
                    break;
                case "start_timestamp":
                    setMatch("start_timestamp", () => message.data);
                    break;
                case "new_player":
                    setMatch("players", (players) => [...players, message.data]);
                    break;
                case "state_update":
                    setMatch(() => message.data);
                    break;
                case "new_submission":
                    const s = message.data;
                    if (s.player === match.player) {
                        setMatch("submissions", s.index, () => s);
                    } else {
                        setMatch("submissions", (subs) => [...subs, s]);
                    }
                    break;
                case "new_problem":
                    setMatch("problems", message.data.problem_id, () => message.data);
                    break;
                case "new_tutorial":
                    setMatch("problems", message.data.problem_id, "tutorial", () => message.data.tutorial);
                    break;
                case "match_ended":
                    setMatchEnded(true);
                    localStorage.setItem(matchEndedKey, "true");
                    break;
                default:
                    console.warn("Mensaje no reconocido:", message);
            }

            console.log(message);
        };

        socket.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        socket.onclose = () => {
            console.log("🔌 WebSocket cerrado");
        };
    });

    createEffect(() => {
        if (match.start_timestamp && now() >= match.start_timestamp) {
            if (clockInterval) {
                clearInterval(clockInterval);
                clockInterval = null;
            }
        }
    });

    onCleanup(() => {
        if (clockInterval) clearInterval(clockInterval);
        socket.close();
    });

    const submitCode = (problemId: string, language: string, code: string) => {
        const index = match.submissions.length;
        const submission: Submission = {
            player: match.player,
            problem_id: problemId,
            timestamp: Math.floor(Date.now() / 1000),
            veredict: "waiting",
            index,
        };
        setMatch("submissions", (subs) => [...subs, submission]);

        socket.send(JSON.stringify({
            //type: "upload_solution",
            //data: {
                action: "uploadSolution",
                problem_id: problemId,
                language,
                solution: code,
                index,
                player: match.player,
                match_id: match.match_id,
            //},
        }));
    };

    const matchUI = () => {
        if (!match.start_timestamp || now() < match.start_timestamp) {
            return <WaitingHub match={match} />;
        } else {
            return matchEnded() ? (
                <FinalResults match={match} />
            ) : (
                <Game match={match} submitCode={submitCode} />
            );
        }
    };

    return <>{matchUI()}</>;
}
