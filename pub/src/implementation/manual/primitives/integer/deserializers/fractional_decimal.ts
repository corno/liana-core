import * as _pds from 'pareto-core/dist/deserializer'

import * as signatures from "../../../../../interface/signatures"

export const $$: signatures.deserializers.primitives.integer.fractional_decimal = ($, abort, $p) => {
    const characters = _pds.list.from_text($, ($) => $)
    let isNegative = false
    let startIndex = 0
    let decimalPointIndex = -1
    
    // Check for empty string
    if (characters.__get_number_of_elements() === 0) {
        abort(`Empty string is not a valid fractional decimal number`)
    }
    
    const get_character_at = (index: number): number => {
        return characters.__get_possible_element_at(index).__decide(
            ($) => $,
            () => abort(`index out of bounds`)
        )
    }
    
    // Check for negative sign
    if (characters.__get_number_of_elements() > 0 && get_character_at(0) === 45) { // '-'
        isNegative = true
        startIndex = 1
    }
    
    // Find decimal point and validate characters
    for (let i = startIndex; i < characters.__get_number_of_elements(); i++) {
        const charCode = get_character_at(i)
        
        if (charCode === 46) { // '.'
            if (decimalPointIndex !== -1) {
                abort(`Multiple decimal points found`)
            }
            decimalPointIndex = i
        } else if (!(charCode >= 48 && charCode <= 57)) {
            abort(`Invalid character in fractional decimal string`)
        }
    }
    
    // Must have a decimal point
    if (decimalPointIndex === -1) {
        abort(`No decimal point found in fractional decimal string`)
    }
    
    // Check that we have digits before decimal point
    if (decimalPointIndex === startIndex) {
        abort(`No digits before decimal point`)
    }
    
    // Calculate number of fractional digits in input
    const inputFractionalDigits = characters.__get_number_of_elements() - decimalPointIndex - 1
    const expectedFractionalDigits = $p['number of fractional digits']
    
    // Check that the number of fractional digits matches expected
    if (inputFractionalDigits !== expectedFractionalDigits) {
        abort(`Expected ${expectedFractionalDigits} fractional digits, but found ${inputFractionalDigits}`)
    }
    
    // Parse integer part
    let result = 0
    for (let i = startIndex; i < decimalPointIndex; i++) {
        const charCode = get_character_at(i)
        const digit = charCode - 48
        result = result * 10 + digit
    }
    
    // Parse fractional part
    for (let i = decimalPointIndex + 1; i < characters.__get_number_of_elements(); i++) {
        const charCode = get_character_at(i)
        const digit = charCode - 48
        result = result * 10 + digit
    }
    
    return isNegative ? -result : result
}