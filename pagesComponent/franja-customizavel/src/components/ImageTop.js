
import { Field } from "redux-form"
import { ImageSelectorInput } from "backstage-admin"
import Title from "./Title"

export default function ImageTop({ props }) {
    return (
        <div className="box image-top">
            <Title>Imagem do topo</Title>

            <p>Imagem que fica no topo, no centro da linha | <span className="image-top-info">Altura da imagem: 20px</span></p>

            <Field
                name={props.getFieldName("imageTop")}
                floatingLabelText="Se não adicionar a imagem, a linha de fundo também não será exibida"
                component={ImageSelectorInput}
                buttonProps={{
                    label: "Selecionar imagem",
                    size: "medium",
                    variant: "text",
                    color: "primary",
                }}
                className="image-selector"
            />
        </div>
    )
}
