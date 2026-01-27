import * as _pds from 'pareto-core/dist/deserializer'

import * as signatures from "../../../../../interface/signatures"

export const $$: signatures.deserializers.primitives.integer.binary = ($, abort) => {
    const characters = _pds.list.from_text($, ($) => $)
    let result = 0
    let isNegative = false
    let startIndex = 0

    // Check for empty string
    if (characters.__get_number_of_items() === 0) {
        abort(`Empty string is not a valid binary number`)
    }

    const get_character_at = (index: number): number => characters.__get_possible_item_at(index).__decide(
        ($) => $,
        () => abort(`index out of bounds`)
    )

    // Check for negative sign
    if (characters.__get_number_of_items() > 0 && get_character_at(0) === 45) { // '-'
        isNegative = true
        startIndex = 1
    }

    // Check for "0b" prefix - REQUIRE it for binary
    if (characters.__get_number_of_items() <= startIndex + 1 ||
        get_character_at(startIndex) !== 48 || // '0'
        get_character_at(startIndex + 1) !== 98) { // 'b'
        abort(`Binary number must have '0b' prefix`)
    }
    startIndex += 2

    // Check if there are digits after the prefix
    if (startIndex >= characters.__get_number_of_items()) {
        abort(`Binary number must have digits after '0b' prefix`)
    }

    // Parse binary digits from left to right
    for (let i = startIndex; i < characters.__get_number_of_items(); i++) {
        const charCode = get_character_at(i)

        // Check if character is a binary digit (48-49 for '0'-'1')
        if (charCode >= 48 && charCode <= 49) { // '0'-'1'
            const digit = charCode - 48
            result = result * 2 + digit
        } else {
            // Invalid character
            abort(`Invalid character in binary string`)
        }
    }

    return isNegative ? -result : result
}