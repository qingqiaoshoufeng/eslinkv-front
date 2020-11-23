export const toThousand = value => {
    if (!value) {
        return ''
    } else {
        return value.toLocaleString()
    }
}