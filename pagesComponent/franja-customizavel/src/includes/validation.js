export const requiredValidation = value =>
    (value && value !== "") || inTemplate
        ? undefined
        : "Preenchimento obrigatório"

export const urlValidation = str => {
    if (!str || str === "") return undefined

    const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g
    return !!str.match(regex) ? undefined : "A URL é inválida"
}

export const templateValidation = value =>
    value && inTemplate ? "Deixe em branco no template" : undefined

export const comboValidation = value =>
    (typeof value === "string" && value.length > 0) || inTemplate
        ? undefined
        : "Selecione uma opção"

export const hexColorValidation = value => {
    if (!value || value.trim() === "") {
        return inTemplate ? undefined : "Digite uma cor hexadecimal"
    }

    const cleanValue = value.trim()
    const hexColorFormat = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/

    if (hexColorFormat.test(cleanValue)) {
        return undefined
    }

    return "Formato de cor inválido. Use: #RGB, #RRGGBB ou #RRGGBBAA (ex: #F0A, #FF00AA, #FF00AA80)"
}

export const minLengthValidation = min => value =>
    value && value.length < min
        ? `Digite pelo menos ${min} caracteres`
        : undefined

export const maxLengthValidation = max => value =>
    value && value.length > max ? `Digite no máximo ${max} caracteres` : undefined

export const minLength2 = minLengthValidation(2)
export const maxLenght20 = maxLengthValidation(20)
export const maxLength130 = maxLengthValidation(130)
export const maxLength2000 = maxLengthValidation(2000)

/* ArrayInput Validation */
export const inTemplate = window.location.href
    .toString()
    .includes("backstage-pages-template")

export const arrayInputRequiredValidation = value => {
    const notEmptyArray = Array.isArray(value) && value.length > 0
    const message = "Adicione pelo menos um card acima"
    return notEmptyArray || inTemplate ? undefined : message
}
