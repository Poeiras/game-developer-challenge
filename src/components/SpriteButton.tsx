// src/components/SpriteButton.tsx
import './SpriteButton.css'

type Props = {
    normal: string   // imagem do estado normal
    hover: string    // imagem com o mouse em cima
    label: string    // texto para leitores de tela
    onClick: () => void
    autoFocus?: boolean
}

export function SpriteButton({ normal, hover, label, onClick, autoFocus }: Props) {
    return (
        <button
            className="sprite-button"
            onClick={onClick}
            aria-label={label}
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
        </button>
    )
}