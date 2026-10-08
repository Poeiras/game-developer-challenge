// src/screens/GameScreen.tsx
import { useEffect, useRef, useState } from 'react'
import { Application, extend, useApplication } from '@pixi/react'
import { Container, Sprite } from 'pixi.js'
import { Player } from '../game/Player'
import { useKeys } from '../game/useKeys'
import { PauseOverlay } from '../components/PauseOverlay'
import { HealthBar } from '../components/HealthBar'
import { TopRightHUD } from '../components/TopRightHUD'
import './GameScreen.css'

extend({ Container, Sprite })

function PauseController({ paused }: { paused: boolean }) {
    const { app } = useApplication()

    useEffect(() => {
        if (paused) app.ticker.stop()
        else app.ticker.start()
    }, [app, paused])

    return null
}

type Props = { onExit: () => void }

export function GameScreen({ onExit }: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [paused, setPaused] = useState(false)

    // Estados da GUI
    const [health, setHealth] = useState(100)
    const [score, setScore] = useState(0)
    const [time, setTime] = useState("00:00")

    const { actions } = useKeys({
        onTogglePause: () => setPaused((p) => !p),
        onPause: () => setPaused(true),
    })

    return (
        <div className="screen game" ref={containerRef}>
            <Application resizeTo={containerRef} background="#1099bb">
                <PauseController paused={paused} />

                {/* Passe os setters para o Player atualizar o estado React */}
                <Player
                    actions={actions}
                    onUpdateHealth={setHealth}
                    onUpdateScore={setScore}
                    onUpdateTime={setTime}
                />
            </Application>

            {/* Camada de UI sobreposta ao Canvas */}
            <div className="game-ui-layer">
                <div className="ui-top-left">
                    <HealthBar health={health} />
                </div>

                <div className="ui-top-right">
                    <TopRightHUD
                        score={score}
                        time={time}
                        onPause={() => setPaused(true)}
                    />
                </div>
            </div>

            {paused && (
                <PauseOverlay onResume={() => setPaused(false)} onExit={onExit} />
            )}
        </div>
    )
}