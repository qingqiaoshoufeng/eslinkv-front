// import JSONStringify from '@/vendor/JSONStringify'

const isJsonEqual = (left, right) => {
    return left === right || JSON.stringify(left) === JSON.stringify(right)
}

export default isJsonEqual
