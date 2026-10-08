import { useEffect, useRef, useState } from 'react'
import {useApplication, useTick} from '@pixi/react'
import { Assets, Sprite, Texture } from 'pixi.js'
import { useKeys } from './useKeys'

const SPEED = 4

export function Player() {
    const [texture, setTexture] = useState<Texture | null>(null);
    const spriteRef = useRef<Sprite>(null);
    const {app} = useApplication();
    const start = useRef({x:app.screen.width/2, y:app.screen.height/2});
    const keys = useKeys();

    useEffect(() => {
        let active = true
        Assets.load<Texture>('src/assets/png/default/ships/ship_1.png').then((t) => {
            t.source.scaleMode = 'nearest' // mantém pixel art nítida
            if (active) setTexture(t)
        })
        return () => {
            active = false
        }
    }, [])

    useTick((ticker) => {
        const s = spriteRef.current
        if (!s) return
        const d = SPEED * ticker.deltaTime
        // independente da taxa de quadros
        if (keys.current.has('ArrowLeft') || keys.current.has('KeyA')) s.x -= d
        if (keys.current.has('ArrowRight') || keys.current.has('KeyD')) s.x += d
        if (keys.current.has('ArrowUp') || keys.current.has('KeyW')) s.y -= d
        if (keys.current.has('ArrowDown') || keys.current.has('KeyS')) s.y += d
    })

    if (!texture) return null

    return <pixiSprite
        ref={spriteRef}
        texture={texture}
        anchor={0.5}
        x={start.current.x}
        y={start.current.y} />
}