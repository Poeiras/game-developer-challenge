import { SpriteButton } from '../components/SpriteButton'
import './MenuScreen.css'
import HoverImg from '../assets/png/default/ui/controls/button_round_hover.png'
import NormalImg from '../assets/png/default/ui/controls/button_round_normal.png'
import PressedImg from '../assets/png/default/ui/controls/button_round_pressed.png'
import PanelImg from '../assets/png/default/ui/menu/panel_menu.png'
import menuBg from '../assets/ui_scene_background.png'
import TitleImg from '../assets/png/default/ui/menu/title_pirate_battle.png'

type Props = {
    onPlay: () => void
    onOptions: () => void
}

export function MenuScreen({ onPlay, onOptions }: Props) {
    return (

        <div className="screen menu" style={{ backgroundImage: `url(${menuBg})` }}>
            <h1 className="menu__title" style={{ backgroundImage: `url(${TitleImg})` }}>
                Pirate Battle
            </h1>
            <div className="menu__panel" style={{ backgroundImage: `url(${PanelImg})` }}>
                <nav className="menu__buttons">
                    <SpriteButton
                        normal={NormalImg}
                        hover={HoverImg}
                        pressed={PressedImg}
                        label="Play"
                        onClick={onPlay}
                        autoFocus
                    />
                    <SpriteButton
                        normal={NormalImg}
                        hover={HoverImg}
                        pressed={PressedImg}
                        label="Options"
                        onClick={onOptions}
                    />
                </nav>
            </div>
        </div>
    )
}