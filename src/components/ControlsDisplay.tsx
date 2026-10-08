// src/components/ControlsDisplay.tsx
import React from 'react';
import './ControlsDisplay.css';

export const ControlsDisplay: React.FC = () => {
    return (
        <div className="controls-display">
            <h3 className="controls-display__title">Controles</h3>
            <div className="controls-display__grid">
                <div className="controls-display__item">
                    <kbd>W</kbd> ou <kbd>↑</kbd>
                    <span>Mover para frente</span>
                </div>
                <div className="controls-display__item">
                    <kbd>A</kbd> ou <kbd>←</kbd>
                    <span>Virar à esquerda</span>
                </div>
                <div className="controls-display__item">
                    <kbd>D</kbd> ou <kbd>→</kbd>
                    <span>Virar à direita</span>
                </div>
                <div className="controls-display__item">
                    <kbd>Espaço</kbd>
                    <span>Disparo frontal</span>
                </div>
                <div className="controls-display__item">
                    <kbd>Q</kbd>
                    <span>Disparo lateral esquerdo</span>
                </div>
                <div className="controls-display__item">
                    <kbd>E</kbd>
                    <span>Disparo lateral direito</span>
                </div>
            </div>
        </div>
    );
};