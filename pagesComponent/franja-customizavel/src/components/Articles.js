import { Highlight } from "backstage-pages"
import Title from "./Title"

export default function Articles({ props }) {
    function renderHighlights(qtd) {
        let highlights = []
        for (let i = 0; i < qtd; i++) {
            highlights.push(
                <Highlight
                    idx={i}
                    key={`franja_customizavel_highlight_${i}`}
                    subtitle={false}
                    {...props}
                />
            )
        }
        return highlights
    }

    return (
        <div className="box articles">
            <Title>Lista de Matérias</Title>

            <div className="articles-list">{renderHighlights(4)}</div>
        </div>
    )
}
