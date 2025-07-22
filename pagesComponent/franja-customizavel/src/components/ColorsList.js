import { Field } from "redux-form";
import { ColorInput } from "backstage-admin"
import { requiredValidation, hexColorValidation } from "../includes/validation"
import Title from "./Title";

export default function ColorsList({ props }) {
    return (
        <div className="box colors">

            <Title>Cores da franja</Title>

            <div className="colors-list">
                <Field
                    name={props.getFieldName("bgColor")}
                    component={ColorInput}
                    floatingLabelText="Cor de fundo (hex)*"
                    options={{ hintText: "Ex: #ecf4fa" }}
                    helperText="Digite uma cor hexadecimal."
                    floatingLabelFixed
                    validate={[requiredValidation, hexColorValidation]}
                />

                <Field
                    name={props.getFieldName("bgLineColor")}
                    component={ColorInput}
                    floatingLabelText="Cor da linha (hex)*"
                    options={{ hintText: "Ex: #1e4c9a" }}
                    helperText="Digite uma cor hexadecimal."
                    floatingLabelFixed
                    validate={[requiredValidation, hexColorValidation]}
                />

                <Field
                    name={props.getFieldName("hatColor")}
                    component={ColorInput}
                    floatingLabelText="Cor do chapéu (hex)*"
                    options={{ hintText: "Ex: #1e4c9a" }}
                    helperText="Digite uma cor hexadecimal."
                    floatingLabelFixed
                    validate={[requiredValidation, hexColorValidation]}
                />

                <Field
                    name={props.getFieldName("titleColor")}
                    component={ColorInput}
                    floatingLabelText="Cor do título (hex)*"
                    options={{ hintText: "Ex: #000" }}
                    helperText="Digite uma cor hexadecimal."
                    floatingLabelFixed
                    validate={[requiredValidation, hexColorValidation]}
                />
            </div>
        </div>
    )
}
