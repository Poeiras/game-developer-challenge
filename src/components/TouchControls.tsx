// src/components/TouchControls.tsx
import React from 'react';
import './TouchControls.css';

type Props = {
    onActionStart: (action: string) => void;
    onActionEnd: (action: string) => void;
};

export const TouchControls: React.FC<Props> = ({ onActionStart, onActionEnd }) => {
    const handleTouchStart = (action: string) => (e: React.TouchEvent) => {
        e.preventDefault();
        onActionStart(action);
    };

    const handleTouchEnd = (action: string) => (e: React.TouchEvent) => {
        e.preventDefault();
        onActionEnd(action);
    };

    return (
        <div className="touch-controls">
            {/* Controles de movimento (lado esquerdo) */}
            <div className="touch-controls__movement">
                <button
                    className="touch-btn touch-btn--turn-left"
                    onTouchStart={handleTouchStart('turnLeft')}
                    onTouchEnd={handleTouchEnd('turnLeft')}
                >
                    ←
                </button>
                <button
                    className="touch-btn touch-btn--forward"
                    onTouchStart={handleTouchStart('forward')}
                    onTouchEnd={handleTouchEnd('forward')}
                >
                    ↑
                </button>
                <button
                    className="touch-btn touch-btn--turn-right"
                    onTouchStart={handleTouchStart('turnRight')}
                    onTouchEnd={handleTouchEnd('turnRight')}
                >
                    →
                </button>
            </div>

            {/* Controles de disparo (lado direito) */}
            <div className="touch-controls__fire">
                <button
                    className="touch-btn touch-btn--fire-left"
                    onTouchStart={handleTouchStart('fireLeft')}
                    onTouchEnd={handleTouchEnd('fireLeft')}
                >
                    ◀
                </button>
                <button
                    className="touch-btn touch-btn--fire-front"
                    onTouchStart={handleTouchStart('fireFront')}
                    onTouchEnd={handleTouchEnd('fireFront')}
                >
                    ●
                </button>
                <button
                    className="touch-btn touch-btn--fire-right"
                    onTouchStart={handleTouchStart('fireRight')}
                    onTouchEnd={handleTouchEnd('fireRight')}
                >
                    ▶
                </button>
            </div>
        </div>
    );
};