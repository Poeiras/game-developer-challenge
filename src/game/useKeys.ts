// src/game/useKeys.ts
import { useEffect, useRef } from 'react';

export type ActionsRef = React.MutableRefObject<Set<string>>;

interface UseKeysProps {
    onTogglePause?: () => void;
    onPause?: () => void;
}

export function useKeys({ onTogglePause, onPause }: UseKeysProps = {}) {
    const actions = useRef(new Set<string>()) as ActionsRef;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return;
            const key = e.key.toLowerCase();

            switch (key) {
                case 'w':
                case 'arrowup':
                    actions.current.add('forward');
                    break;
                case 'a':
                case 'arrowleft':
                    actions.current.add('turnLeft');
                    break;
                case 'd':
                case 'arrowright':
                    actions.current.add('turnRight');
                    break;
                case 'escape':
                    if (onTogglePause) onTogglePause();
                    break;
                // Disparos ignorados no keydown
                case ' ':
                case 'spacebar':
                case 'q':
                case 'e':
                    break;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();

            switch (key) {
                case 'w':
                case 'arrowup':
                    actions.current.delete('forward');
                    break;
                case 'a':
                case 'arrowleft':
                    actions.current.delete('turnLeft');
                    break;
                case 'd':
                case 'arrowright':
                    actions.current.delete('turnRight');
                    break;
                // Disparos registrados APENAS no release (keyup)
                case ' ':
                case 'spacebar':
                    actions.current.add('fireFront');
                    break;
                case 'q':
                    actions.current.add('fireLeft');
                    break;
                case 'e':
                    actions.current.add('fireRight');
                    break;
            }
        };

        const handleBlur = () => {
            actions.current.clear();
            if (onPause) onPause();
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('blur', handleBlur);
        };
    }, [onTogglePause, onPause]);

    return { actions };
}