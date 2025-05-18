// Game.tsx (main component)
import { createSignal, onMount, onCleanup, Show, createEffect } from 'solid-js';
import { store, setStore } from './store';
import { useNavigate } from '@solidjs/router';
import TimerDisplay from './Timer';
import ProblemTabs from './ProblemTabs';
import ProblemContent from './Problem';
import CodeEditor from './CodeEditor';
import SubmissionsList from './Submissions';
import Tutorial from './tutorial';

const getMatchStorageKey = (matchId: string) => `match_${matchId}_start_time`;
const clearMatchStorage = (matchId: string) => localStorage.removeItem(getMatchStorageKey(matchId));

export default function Game() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = createSignal('problem');
  const [problemIndex, setProblemIndex] = createSignal(0);
  const [code, setCode] = createSignal('');
  const [timeLeft, setTimeLeft] = createSignal(0);
  const [timerPhase, setTimerPhase] = createSignal<TimerPhase>('problem');
  let timerInterval: NodeJS.Timeout;
  type TimerPhase = 'problem' | 'tutorial';

  const currentProblem = () => store.currentMatch?.problems[problemIndex()];

  // Helper functions
const initializeFreshTimer = () => {
    const match = store.currentMatch;
    if (!match) return;

    const now = Date.now();
    const storageKey = getMatchStorageKey(match.match_id);
    
    localStorage.setItem(storageKey, now.toString());
    localStorage.setItem(`${storageKey}_phase`, 'problem');
    setTimerPhase('problem');
    setTimeLeft(match.seconds_per_problem);
  };

  const switchToTutorialPhase = () => {
    const match = store.currentMatch;
    if (!match) return;

    const now = Date.now();
    const storageKey = getMatchStorageKey(match.match_id);
    
    localStorage.setItem(storageKey, now.toString());
    localStorage.setItem(`${storageKey}_phase`, 'tutorial');
    setTimerPhase('tutorial');
    setTimeLeft(match.seconds_per_tutorial);
  };

  const startTimer = () => {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      const match = store.currentMatch;
      if (!match) return;

      const storageKey = getMatchStorageKey(match.match_id);
      const phaseKey = `${storageKey}_phase`;
      const now = Date.now();
      const storedStart = localStorage.getItem(storageKey);
      const storedPhase = localStorage.getItem(phaseKey);

      // If no stored data, initialize fresh timer
      if (!storedStart || !storedPhase) {
        initializeFreshTimer();
        return;
      }

      const startTime = parseInt(storedStart);
      const elapsed = now - startTime;
      const currentPhase = storedPhase as TimerPhase;

      if (currentPhase === 'problem') {
        const remainingProblemTime = (match.seconds_per_problem * 1000) - elapsed;
        
        if (remainingProblemTime <= 0) {
          // Problem time expired - switch to tutorial
          switchToTutorialPhase();
        } else {
          // Update problem time normally
          setTimeLeft(Math.floor(remainingProblemTime / 1000));
        }
      } else {
        // Tutorial phase
        const remainingTutorialTime = (match.seconds_per_tutorial * 1000) - elapsed;
        
        if (remainingTutorialTime <= 0) {
          // Tutorial time expired - move to next problem
          handleNextProblem();
        } else {
          // Update tutorial time normally
          setTimeLeft(Math.floor(remainingTutorialTime / 1000));
        }
      }
    }, 1000);
  };

  const handleNextProblem = () => {
    const match = store.currentMatch;
    if (!match) return;

    // Clear previous problem's storage
    clearMatchStorage(match.match_id);

    if (problemIndex() < match.num_problems - 1) {
      setProblemIndex(p => p + 1);
      setTimerPhase('problem'); // Reset to problem phase
      
      // Store new start time for the next problem
      const now = Date.now();
      localStorage.setItem(getMatchStorageKey(match.match_id), now.toString());
      localStorage.setItem(`${getMatchStorageKey(match.match_id)}_phase`, 'problem');
      
      // Reset timer with full problem time
      setTimeLeft(match.seconds_per_problem);
    } else {
      // Clear storage when match is complete
      clearMatchStorage(match.match_id);
      navigate('/');
    }
  };

  const handleSubmit = () => {
    if (!store.currentMatch) return;

    const newSubmission: Submission = {
      problem_id: currentProblem()?.problem_id || 0,
      timestamp: Date.now(),
      veredict: 'waiting'
    };

    setStore('currentMatch', (match) => match ? {
      ...match,
      submissions: [...match.submissions, newSubmission]
    } : null);

    setTimeout(() => {
      setStore('currentMatch', (prevMatch) => {
        if (!prevMatch) return prevMatch;
        
        const updatedSubmissions = prevMatch.submissions.map((sub, index) => {
          if (index === prevMatch.submissions.length - 1) {
            const veredict: typeof sub.veredict = 
              Math.random() > 0.5 ? 'accepted' : 'wrong answer';
            return { ...sub, veredict };
          }
          return sub;
        });

        return { ...prevMatch, submissions: updatedSubmissions } as ServerMatch;
      });
    }, 2000);
  };

  const initializeTimer = () => {
    const match = store.currentMatch;
    if (!match) return;

    const storageKey = getMatchStorageKey(match.match_id);
    const now = Date.now();
    
    // Check if we have stored phase and time
    const storedPhase = localStorage.getItem(`${storageKey}_phase`);
    const storedStart = localStorage.getItem(storageKey);
    
    if (storedStart && storedPhase) {
      const startTime = parseInt(storedStart);
      const elapsed = now - startTime;
      const currentPhase = storedPhase as TimerPhase;
      
      if (currentPhase === 'problem') {
        const problemTimeLeft = (match.seconds_per_problem * 1000) - elapsed;
        if (problemTimeLeft <= 0) {
          // Time for problem ended, switch to tutorial
          setTimerPhase('tutorial');
          const tutorialStart = now - Math.abs(problemTimeLeft);
          localStorage.setItem(`${storageKey}_phase`, 'tutorial');
          localStorage.setItem(storageKey, tutorialStart.toString());
          setTimeLeft(match.seconds_per_tutorial);
        } else {
          setTimeLeft(Math.floor(problemTimeLeft / 1000));
        }
      } else {
        // Tutorial phase
        const tutorialTimeLeft = (match.seconds_per_tutorial * 1000) - elapsed;
        if (tutorialTimeLeft <= 0) {
          handleNextProblem();
        } else {
          setTimeLeft(Math.floor(tutorialTimeLeft / 1000));
        }
      }
    } else {
      // Fresh start - first problem
      setTimerPhase('problem');
      setTimeLeft(match.seconds_per_problem);
      localStorage.setItem(`${storageKey}_phase`, 'problem');
      localStorage.setItem(storageKey, now.toString());
    }

    startTimer();
  };

  onMount(() => {
    initializeTimer();
  });

  createEffect(() => {
    problemIndex();
    initializeTimer();
  });

  onCleanup(() => {
    clearInterval(timerInterval);
    // Only clear storage when match is complete
    if (problemIndex() >= (store.currentMatch?.num_problems || 0) - 1) {
      store.currentMatch && clearMatchStorage(store.currentMatch.match_id);
    }
  });

  return (
    <div class="container py-4">
      <TimerDisplay timeLeft={timeLeft()} />
      
      {/* Tabs Navigation */}
      <div class="mb-4 d-flex justify-content-center gap-3">
        <button
          class={`btn btn-outline-primary ${activeTab() === 'problem' ? 'active' : ''}`}
          onClick={() => setActiveTab('problem')}
        >
          Problemas
        </button>
        <button
          class={`btn btn-outline-primary ${activeTab() === 'submissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('submissions')}
        >
          Envíos
        </button>
      </div>
      <Show when={activeTab() === 'problem'}>
        <ProblemTabs 
          problems={store.currentMatch?.problems || []} 
          currentIndex={problemIndex()}
          onTabChange={setProblemIndex}
          allowNavigation={timeLeft() <= 0}
        />
        <Show when={timerPhase() === 'problem'}>
        
        <ProblemContent problem={currentProblem()} />
        
        <CodeEditor 
          code={code()} 
          onCodeChange={setCode} 
          onSubmit={handleSubmit}
        />
        </Show>
        <Show when={timerPhase() === 'tutorial'}>
          <Tutorial 
            content={currentProblem()?.tutorial || null} 
            timeLeft={timeLeft()}
          />
        </Show>
      </Show>
      <Show when={activeTab() === 'submissions'}>
        <SubmissionsList submissions={store.currentMatch?.submissions || []} />
      </Show>
    </div>
  );
}