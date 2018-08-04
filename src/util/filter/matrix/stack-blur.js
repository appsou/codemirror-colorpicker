import {
    parseParamNumber
} from '../functions'

import StackBlur from '../../blur/StackBlur'

export default function (radius = 10, hasAlphaChannel = true) {
    radius = parseParamNumber(radius)

    return function (bitmap) {
        return StackBlur(bitmap, radius, hasAlphaChannel )
    }
}