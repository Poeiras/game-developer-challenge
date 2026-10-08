// src/App.tsx
import { useState } from 'react'
import { MenuScreen } from './screens/MenuScreen'
import { GameScreen } from './screens/GameScreen'
import { OptionsScreen } from './screens/OptionsScreen'

type Screen = 'menu' | 'game' | 'options'

export default function App() {
    const [screen, setScreen] = useState<Screen>('menu')

    return (
        <>
            {screen === 'menu' && (
                <MenuScreen
                    onPlay={() => setScreen('game')}
                    onOptions={() => setScreen('options')}
                />
            )}
            {screen === 'options' && <OptionsScreen onBack={() => setScreen('menu')} />}
            {screen === 'game' && <GameScreen onExit={() => setScreen('menu')} />}
        </>
    )
}