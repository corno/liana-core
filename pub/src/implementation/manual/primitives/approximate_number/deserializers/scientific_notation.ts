import * as _p from 'pareto-core/dist/deserializer'

import * as signatures from "../../../../../interface/signatures"

export const $$: signatures.deserializers.primitives.approximate_number.scientific_notation = ($, abort) => {
    const characters = _p.list.from_text($, ($) => $)
    let result = 0
    let isNegative = false
    let startIndex = 0
    let decimalPart = 0
    let decimalDivisor = 1
    let exponent = 0
    let isExponentNegative = false
    let hasDecimal = false
    let inExponent = false

    const get_character_at = (index: number): number => characters.__get_possible_element_at(index).__decide(
        ($) => $,
        () => abort(`index out of bounds`)
    )

    // Check for negative sign
    if (characters.__get_number_of_elements() > 0 && get_character_at(0) === 45) { // '-'
        isNegative = true
        startIndex = 1
    }

    // Parse the number
    for (let i = startIndex; i < characters.__get_number_of_elements(); i++) {
        const charCode = get_character_at(i)

        if (charCode === 46) { // '.'
            if (hasDecimal || inExponent) {
                abort(`Invalid decimal format: multiple decimal points or decimal in exponent`)
            }
            hasDecimal = true
        } else if (charCode === 101 || charCode === 69) { // 'e' or 'E'
            if (inExponent) {
                abort(`Invalid decimal format: multiple exponent markers`)
            }
            inExponent = true
            // Check for exponent sign
            if (i + 1 < characters.__get_number_of_elements()) {
                const nextChar = get_character_at(i + 1)
                if (nextChar === 45) { // '-'
                    isExponentNegative = true
                    i++
                } else if (nextChar === 43) { // '+'
                    i++
                }
            }
        } else if (charCode >= 48 && charCode <= 57) { // '0'-'9'
            const digit = charCode - 48

            if (inExponent) {
                exponent = exponent * 10 + digit
            } else if (hasDecimal) {
                decimalPart = decimalPart * 10 + digit
                decimalDivisor = decimalDivisor * 10
            } else {
                result = result * 10 + digit
            }
        } else {
            abort(`Invalid character in decimal string`)
        }
    }

    // Combine integer and decimal parts
    let finalResult = result + (decimalPart / decimalDivisor)

    // Apply exponent
    if (isExponentNegative) {
        exponent = -exponent
    }

    // Apply exponent by multiplying/dividing by 10
    if (exponent > 0) {
        for (let i = 0; i < exponent; i++) {
            finalResult = finalResult * 10
        }
    } else if (exponent < 0) {
        for (let i = 0; i < -exponent; i++) {
            finalResult = finalResult / 10
        }
    }

    return isNegative ? -finalResult : finalResult
}