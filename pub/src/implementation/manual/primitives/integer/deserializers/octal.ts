import * as _p from 'pareto-core/dist/deserializer'

import * as signatures from "../../../../../interface/signatures"

export const $$: signatures.deserializers.primitives.integer.octal = ($, abort) => {
    const characters = _p.list.from_text($, ($) => $)
    let result = 0
    let isNegative = false
    let startIndex = 0

    // Check for empty string
    if (characters.__get_number_of_items() === 0) {
        abort(`Empty string is not a valid octal number`)
    }

    const get_character_at = (index: number): number => characters.__deprecated_get_possible_item_at(index).__decide(
        ($) => $,
        () => abort(`index out of bounds`)
    )

    // Check for negative sign
    if (characters.__get_number_of_items() > 0 && get_character_at(0) === 45) { // '-'
        isNegative = true
        startIndex = 1
    }

    // Check for "0o" prefix - REQUIRE it for octal
    if (characters.__get_number_of_items() <= startIndex + 1 ||
        get_character_at(startIndex) !== 48 || // '0'
        get_character_at(startIndex + 1) !== 111) { // 'o'
        abort(`Octal number must have '0o' prefix`)
    }
    startIndex += 2

    // Check if there are digits after the prefix
    if (startIndex >= characters.__get_number_of_items()) {
        abort(`Octal number must have digits after '0o' prefix`)
    }

    // Parse octal digits from left to right
    for (let i = startIndex; i < characters.__get_number_of_items(); i++) {
        const charCode = get_character_at(i)

        // Check if character is an octal digit (48-55 for '0'-'7')
        if (charCode >= 48 && charCode <= 55) { // '0'-'7'
            const digit = charCode - 48
            result = result * 8 + digit
        } else {
            // Invalid character
            abort(`Invalid character in octal string`)
        }
    }

    return isNegative ? -result : result
}