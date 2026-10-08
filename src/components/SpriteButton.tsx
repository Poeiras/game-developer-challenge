// src/components/SpriteButton.tsx
import './SpriteButton.css'

type Props = {
    normal: string
    hover: string
    pressed?: string
    label: string
    onClick: () => void
    autoFocus?: boolean
}

export function SpriteButton({ normal, hover, pressed, label, onClick, autoFocus }: Props) {
    return (
        <button
            className="sprite-button"
            onClick={onClick}
            autoFocus={autoFocus}
        >
            <img
                className="sprite-button__img sprite-button__img--normal"
                src={normal}
                alt=""
                draggable={false}
            />
            <img
                className="sprite-button__img sprite-button__img--hover"
                src={hover}
                alt=""
                draggable={false}
            />
            <img
                className="sprite-button__img sprite-button__img--pressed"
                src={pressed ?? hover}
                alt=""
                draggable={false}
            />
            <span className="sprite-button__label">{label}</span>
        </button>
    )
}