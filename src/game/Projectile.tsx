// src/game/Projectile.tsx
import { useEffect, useRef } from 'react';
import { useApplication, useTick } from '@pixi/react';
import { Assets, Sprite, Texture } from 'pixi.js';

type Props = {
    x: number;
    y: number;
    rotation: number;
    texturePath: string;
    onOutOfBounds: (id: number) => void;
    id: number;
};

const PROJECTILE_SPEED = 10;
const DESTROY_BUFFER = 50;

export function Projectile({ x, y, rotation, texturePath, onOutOfBounds, id }: Props) {
    const { app } = useApplication();
    const spriteRef = useRef<Sprite>(null);
    const textureRef = useRef<Texture | null>(null);

    useEffect(() => {
        let active = true;
        Assets.load<Texture>(texturePath).then((t) => {
            t.source.scaleMode = 'nearest';
            if (active) textureRef.current = t;
        });
        return () => {
            active = false;
        };
    }, [texturePath]);

    useTick((ticker) => {
        const s = spriteRef.current;
        if (!s) return;

        const dt = ticker.deltaTime;

        s.x += Math.sin(rotation) * PROJECTILE_SPEED * dt;
        s.y -= Math.cos(rotation) * PROJECTILE_SPEED * dt;

        if (
            s.x < -DESTROY_BUFFER ||
            s.x > app.screen.width + DESTROY_BUFFER ||
            s.y < -DESTROY_BUFFER ||
            s.y > app.screen.height + DESTROY_BUFFER
        ) {
            onOutOfBounds(id);
        }
    });

    if (!textureRef.current) return null;

    return (
        <pixiSprite
            ref={spriteRef}
            texture={textureRef.current}
            anchor={0.5}
            x={x}
            y={y}
            rotation={rotation}
        />
    );
}