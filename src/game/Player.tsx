// src/game/Player.tsx
import { useEffect, useRef, useState } from 'react';
import { useApplication, useTick } from '@pixi/react';
import { Assets, Sprite, Texture } from 'pixi.js';
import type { ActionsRef } from './useKeys';
import { Projectile } from './Projectile';

const SPEED = 4;
const TURN_SPEED = 0.05;
const SPRITE_ROTATION_OFFSET = 0;

type Props = {
    actions: ActionsRef;
    onUpdateHealth?: (health: number) => void;
    onUpdateScore?: (score: number) => void;
    onUpdateTime?: (time: string) => void;
};

interface ProjectileData {
    id: number;
    x: number;
    y: number;
    rotation: number;
    type: 'front' | 'left' | 'right';
}

export function Player({ actions, onUpdateHealth, onUpdateScore, onUpdateTime }: Props) {
    const [texture, setTexture] = useState<Texture | null>(null);
    const spriteRef = useRef<Sprite>(null);
    const { app } = useApplication();

    const start = useRef({ x: app.screen.width / 2, y: app.screen.height / 2 });
    const heading = useRef(0);

    const [projectiles, setProjectiles] = useState<ProjectileData[]>([]);
    const projectileIdRef = useRef(0);

    const PROJECTILE_SPRITES = {
        front: 'src/assets/png/default/ship_parts/cannon_loose.png',
        left: 'src/assets/png/default/ship_parts/cannon_loose.png',
        right: 'src/assets/png/default/ship_parts/cannon_loose.png',
    };

    useEffect(() => {
        let active = true;
        Assets.load<Texture>('src/assets/png/default/ships/ship_1.png').then((t) => {
            t.source.scaleMode = 'nearest';
            if (active) setTexture(t);
        });
        return () => {
            active = false;
        };
    }, []);

    const fireFront = () => {
        const s = spriteRef.current;
        if (!s) return;

        // Pega a posição EXATA da sprite no momento do disparo
        const newProjectile: ProjectileData = {
            id: projectileIdRef.current++,
            x: s.x,
            y: s.y,
            rotation: heading.current,
            type: 'front'
        };

        setProjectiles((prev) => [...prev, newProjectile]);
    };

    const fireSide = (side: 'left' | 'right') => {
        const s = spriteRef.current;
        if (!s) return;

        // Ângulo a 90° da rotação atual do navio
        const angle = side === 'left' ? heading.current - Math.PI / 2 : heading.current + Math.PI / 2;

        // CORREÇÃO: Loop de -1 a 1 para gerar os 3 projéteis paralelos
        for (let i = 1; i <= 1; i++) {
            const spacing = i * 20; // Espaçamento de 20px entre os tiros ao longo do casco
            const offsetX = Math.sin(heading.current) * spacing;
            const offsetY = -Math.cos(heading.current) * spacing;

            const newProjectile: ProjectileData = {
                id: projectileIdRef.current++,
                x: s.x + offsetX,
                y: s.y + offsetY,
                rotation: angle,
                type: side
            };
            setProjectiles((prev) => [...prev, newProjectile]);
        }
    };

    const removeProjectile = (id: number) => {
        setProjectiles((prev) => prev.filter((p) => p.id !== id));
    };

    useTick((ticker) => {
        const s = spriteRef.current;
        if (!s) return;

        const dt = ticker.deltaTime;
        const a = actions.current;

        if (a.has('turnLeft')) heading.current -= TURN_SPEED * dt;
        if (a.has('turnRight')) heading.current += TURN_SPEED * dt;

        if (a.has('forward')) {
            const newX = s.x + Math.sin(heading.current) * SPEED * dt;
            const newY = s.y - Math.cos(heading.current) * SPEED * dt;

            const margin = 32;
            s.x = Math.max(margin, Math.min(app.screen.width - margin, newX));
            s.y = Math.max(margin, Math.min(app.screen.height - margin, newY));
        }

        s.rotation = heading.current + SPRITE_ROTATION_OFFSET;

        // Lógica de disparo: executa na posição atual e CONSUME a ação para não repetir
        if (a.has('fireFront')) {
            fireFront();
            a.delete('fireFront');
        }
        if (a.has('fireLeft')) {
            fireSide('left');
            a.delete('fireLeft');
        }
        if (a.has('fireRight')) {
            fireSide('right');
            a.delete('fireRight');
        }
    });

    if (!texture) return null;

    return (
        <>
            <pixiSprite
                ref={spriteRef}
                texture={texture}
                anchor={0.5}
                x={start.current.x}
                y={start.current.y}
            />

            {projectiles.map((proj) => (
                <Projectile
                    key={proj.id}
                    id={proj.id}
                    x={proj.x}
                    y={proj.y}
                    rotation={proj.rotation}
                    texturePath={PROJECTILE_SPRITES[proj.type]}
                    onOutOfBounds={removeProjectile}
                />
            ))}
        </>
    );
}