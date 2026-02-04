import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import * as signatures from "../../../../../interface/signatures"

export const deserialize: signatures.deserializers.primitives.integer.decimal = ($, abort) => {
    const characters = $
    let result = 0
    let isNegative = false
    let startIndex = 0

    // _p.iterate(characters, (iterator) => {
    
    // })
    
    // Check for empty string
    if (characters.__get_number_of_items() === 0) {
        abort(`Empty string is not a valid decimal number`)
    }
    
    const get_character_at = (index: number): number => {
        return characters.__deprecated_get_item_at(
            index,
            () => abort(`index out of bounds`)
        )
    }
    
    // Check for negative sign
    if (characters.__get_number_of_items() > 0 && get_character_at(0) === 45) { // '-'
        isNegative = true
        startIndex = 1
    }
    
    // Parse digits from left to right
    for (let i = startIndex; i < characters.__get_number_of_items(); i++) {
        const charCode = get_character_at(i)
        
        // Check if character is a digit (48-57 for '0'-'9')
        if (charCode >= 48 && charCode <= 57) {
            const digit = charCode - 48
            result = result * 10 + digit
        } else {
            // Invalid character
            abort(`Invalid character in decimal string`)
        }
    }
    
    return isNegative ? -result : result
}