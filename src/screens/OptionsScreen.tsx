// src/screens/OptionsScreen.tsx
import { useEffect } from 'react'
import menuBg from '../assets/ui_scene_background.png'

type Props = { onBack: () => void }

export function OptionsScreen({ onBack }: Props) {
    // Esc volta para o menu
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.code === 'Escape') onBack()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onBack])

    return (
        <div className="screen menu" style={{ backgroundImage: `url(${menuBg})` }}>
            <h1 className="menu__title">Options</h1>
            <button onClick={onBack}>Voltar</button>
        </div>
    )
}