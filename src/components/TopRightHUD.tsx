// src/components/TopRightHUD.tsx
import React from 'react';
import { SpriteButton } from './SpriteButton';
import './TopRightHUD.css';

interface TopRightHUDProps {
    score: number;
    time: string;
    onPause: () => void;
}

export const TopRightHUD: React.FC<TopRightHUDProps> = ({ score, time, onPause }) => {
    return (
        <div className="top-right-hud">
            <div className="hud-stat">
                <img src="../assets/png/default/ui/hud/icon_score.png" alt="Pontos" className="hud-icon" />
                <span className="hud-text">{score.toString().padStart(6, '0')}</span>
            </div>

            <div className="hud-stat">
                <img src="../assets/png/default/ui/hud/icon_time.png" alt="Tempo" className="hud-icon" />
                <span className="hud-text">{time}</span>
            </div>

            {/*
              CORREÇÃO: Removido o children (❚❚) pois seu SpriteButton não aceita essa prop.
              Se o seu SpriteButton precisar de props de imagem, adicione-as aqui (ex: spriteNormal="...").
            */}
            <SpriteButton
                onClick={onPause} normal={""} hover={""} label={""}            />
        </div>
    );
};