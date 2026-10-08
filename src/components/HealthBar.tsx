// src/components/HealthBar.tsx
import React, { useState, useEffect } from 'react';
import './HealthBar.css';

interface HealthBarProps {
    health: number; // Valor entre 0 e 100
}

export const HealthBar: React.FC<HealthBarProps> = ({ health }) => {
    const [testHealth, setTestHealth] = useState(health);

    useEffect(() => {
        setTestHealth(health);
    }, [health]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '9') {
                setTestHealth((prev) => Math.max(0, prev - 10));
            } else if (e.key === '0') {
                setTestHealth((prev) => Math.min(100, prev + 10));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const widthPercentage = Math.max(0, Math.min(100, testHealth));
    const isLowHealth = testHealth <= 50;

    return (
        <div className="health-bar-container">
            <div className="health-fill-area">
                <div
                    className={`health-fill ${isLowHealth ? 'health-red' : 'health-green'}`}
                    style={{ width: `${widthPercentage}%` }}
                />
            </div>
            <div className="health-test-indicator">
                {testHealth}
            </div>
        </div>
    );
};