// src/components/PauseOverlay.tsx
import { SpriteButton } from './SpriteButton'
import './PauseOverlay.css'
import HoverImg from '../assets/png/default/ui/controls/button_round_hover.png'
import NormalImg from '../assets/png/default/ui/controls/button_round_normal.png'
import PressedImg from '../assets/png/default/ui/controls/button_round_pressed.png'
import PanelImg from '../assets/png/default/ui/menu/panel_menu.png'

type Props = {
    onResume: () => void
    onExit: () => void
}

export function PauseOverlay({ onResume, onExit }: Props) {
    return (
        <div className="pause-overlay" role="dialog" aria-modal="true" aria-label="Paused">
            <div className="pause-overlay__panel" style={{ backgroundImage: `url(${PanelImg})` }}>
                <h2 className="pause-overlay__title">Paused</h2>
                <nav className="pause-overlay__buttons">
                    <SpriteButton
                        normal={NormalImg}
                        hover={HoverImg}
                        pressed={PressedImg}
                        label="Resume"
                        onClick={onResume}
                        autoFocus
                    />
                    <SpriteButton
                        normal={NormalImg}
                        hover={HoverImg}
                        pressed={PressedImg}
                        label="Menu"
                        onClick={onExit}
                    />
                </nav>
            </div>
        </div>
    )
}