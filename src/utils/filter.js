export const toThousand = value => {
    if (!value) {
        return ''
    } else {
        return Number(value).toLocaleString()
    }
}
