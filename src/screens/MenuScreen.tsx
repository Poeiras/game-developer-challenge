import { SpriteButton } from '../components/SpriteButton'
import './MenuScreen.css'
import HoverImg from '../assets/png/default/ui/controls/button_round_hover.png'
import NormalImg from '../assets/png/default/ui/controls/button_round_normal.png'
import menuBg from '../assets/ui_scene_background.png'

type Props = {
    onPlay: () => void
    onOptions: () => void
}

export function MenuScreen({ onPlay, onOptions }: Props) {
    return (
        <div className="screen menu" style={{ backgroundImage: `url(${menuBg})` }}>
            <h1 className="menu__title">Pirate Battle</h1>

            <nav className="menu__buttons">
                <SpriteButton
                    normal={NormalImg}
                    hover={HoverImg}
                    label="Play"
                    onClick={onPlay}
                    autoFocus
                />
                <SpriteButton
                    normal={NormalImg}
                    hover={HoverImg}
                    label="Options"
                    onClick={onOptions}
                />
            </nav>
        </div>
    )
}