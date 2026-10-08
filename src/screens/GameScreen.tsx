// src/screens/GameScreen.tsx
import { useEffect, useRef } from 'react'
import { Application, extend } from '@pixi/react'
import { Container, Sprite } from 'pixi.js'
import { Player } from '../game/Player'

extend({ Container, Sprite })

type Props = { onExit: () => void }

export function GameScreen({ onExit }: Props) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.code === 'Escape') onExit()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onExit])

    return (
        <div className="screen" ref={containerRef}>
            <Application resizeTo={containerRef} background="#1099bb">
                <Player />
            </Application>
        </div>
    )
}