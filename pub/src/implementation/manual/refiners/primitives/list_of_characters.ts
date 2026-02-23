import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

//data types
import * as d_loc from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

export const decimal: _pi.Refiner<number, string, d_loc.List_of_Characters> = ($, abort) => {
    const characters = $
    let result = 0
    let isNegative = false
    let startIndex = 0

    // _p.iterate(characters, (iterator) => {

    // })

    // Check for empty string
    if (characters.__get_number_of_items() === 0) {
        abort("Empty string is not a valid decimal number")
    }

    const get_character_at = (index: number): number => {
        return characters.__deprecated_get_item_at(
            index,
            {
                out_of_bounds: () => abort("index out of bounds")
            }
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
            abort("Invalid character in decimal string")
        }
    }

    return isNegative ? -result : result
}


export const scientific_notation: _pi.Refiner_With_Parameter<number, string, d_loc.List_of_Characters, { 'precision': number }> = ($, abort, $p) => {
    const characters = $
    let result = 0
    let isNegative = false
    let startIndex = 0
    let decimalPart = 0
    let decimalDivisor = 1
    let exponent = 0
    let isExponentNegative = false
    let hasDecimal = false
    let inExponent = false

    const get_character_at = (index: number): number => characters.__deprecated_get_item_at(
        index,
        {
            out_of_bounds: () => abort("index out of bounds")
        }
    )

    // Check for negative sign
    if (characters.__get_number_of_items() > 0 && get_character_at(0) === 45) { // '-'
        isNegative = true
        startIndex = 1
    }

    // Parse the number
    for (let i = startIndex; i < characters.__get_number_of_items(); i++) {
        const charCode = get_character_at(i)

        if (charCode === 46) { // '.'
            if (hasDecimal || inExponent) {
                abort("Invalid decimal format: multiple decimal points or decimal in exponent")
            }
            hasDecimal = true
        } else if (charCode === 101 || charCode === 69) { // 'e' or 'E'
            if (inExponent) {
                abort("Invalid decimal format: multiple exponent markers")
            }
            inExponent = true
            // Check for exponent sign
            if (i + 1 < characters.__get_number_of_items()) {
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
            abort("Invalid character in decimal string")
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

export const true_false: _pi.Refiner<boolean, string, d_loc.List_of_Characters> = ($, abort) => {
    const as_string = _p_text_from_list($, ($) => $)
    return as_string === "true"
        ? true
        : as_string === "false"
            ? false
            : abort("HANDLE UNEXPECTED VALUE!")
}



export const binary: _pi.Refiner<number, string, d_loc.List_of_Characters> = ($, abort) => {
    const characters = $
    let result = 0
    let isNegative = false
    let startIndex = 0

    // Check for empty string
    if (characters.__get_number_of_items() === 0) {
        abort("Empty string is not a valid binary number")
    }

    const get_character_at = (index: number): number => characters.__deprecated_get_item_at(
        index,
        {
            out_of_bounds: () => abort("index out of bounds")
        }
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
        abort("Binary number must have '0b' prefix")
    }
    startIndex += 2

    // Check if there are digits after the prefix
    if (startIndex >= characters.__get_number_of_items()) {
        abort("Binary number must have digits after '0b' prefix")
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
            abort("Invalid character in binary string")
        }
    }

    return isNegative ? -result : result
}


export const fractional_decimal: _pi.Refiner_With_Parameter<number, string, d_loc.List_of_Characters, { 'number of fractional digits': number }> = ($, abort, $p) => {
    const characters = $
    let isNegative = false
    let startIndex = 0
    let decimalPointIndex = -1

    // Check for empty string
    if (characters.__get_number_of_items() === 0) {
        abort("Empty string is not a valid fractional decimal number")
    }

    const get_character_at = (index: number): number => {
        return characters.__deprecated_get_item_at(
            index,
            {
                out_of_bounds: () => abort("index out of bounds")
            }
        )
    }

    // Check for negative sign
    if (characters.__get_number_of_items() > 0 && get_character_at(0) === 45) { // '-'
        isNegative = true
        startIndex = 1
    }

    // Find decimal point and validate characters
    for (let i = startIndex; i < characters.__get_number_of_items(); i++) {
        const charCode = get_character_at(i)

        if (charCode === 46) { // '.'
            if (decimalPointIndex !== -1) {
                abort("Multiple decimal points found")
            }
            decimalPointIndex = i
        } else if (!(charCode >= 48 && charCode <= 57)) {
            abort("Invalid character in fractional decimal string")
        }
    }

    // Must have a decimal point
    if (decimalPointIndex === -1) {
        abort("No decimal point found in fractional decimal string")
    }

    // Check that we have digits before decimal point
    if (decimalPointIndex === startIndex) {
        abort("No digits before decimal point")
    }

    // Calculate number of fractional digits in input
    const inputFractionalDigits = characters.__get_number_of_items() - decimalPointIndex - 1
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
    for (let i = decimalPointIndex + 1; i < characters.__get_number_of_items(); i++) {
        const charCode = get_character_at(i)
        const digit = charCode - 48
        result = result * 10 + digit
    }

    return isNegative ? -result : result
}


export const hexadecimal: _pi.Refiner<number, string, d_loc.List_of_Characters> = ($, abort) => {
    const characters = $
    let result = 0
    let isNegative = false
    let startIndex = 0

    // Check for empty string
    if (characters.__get_number_of_items() === 0) {
        abort("Empty string is not a valid hexadecimal number")
    }

    const get_character_at = (index: number): number => {
        return characters.__deprecated_get_item_at(
            index,
            {
                out_of_bounds: () => abort("index out of bounds")
            }
        )
    }

    // Check for negative sign
    if (characters.__get_number_of_items() > 0 && get_character_at(0) === 45) { // '-'
        isNegative = true
        startIndex = 1
    }

    // Check for "0x" prefix - REQUIRE it for hex
    if (characters.__get_number_of_items() <= startIndex + 1 ||
        get_character_at(startIndex) !== 48 || // '0'
        get_character_at(startIndex + 1) !== 120) { // 'x'
        abort("Hexadecimal number must have '0x' prefix")
    }
    startIndex += 2

    // Check if there are digits after the prefix
    if (startIndex >= characters.__get_number_of_items()) {
        abort("Hexadecimal number must have digits after '0x' prefix")
    }

    // Parse hex digits from left to right
    for (let i = startIndex; i < characters.__get_number_of_items(); i++) {
        const charCode = get_character_at(i)
        let digit: number

        // Check if character is a hex digit
        if (charCode >= 48 && charCode <= 57) { // '0'-'9'
            digit = charCode - 48
        } else if (charCode >= 65 && charCode <= 70) { // 'A'-'F'
            digit = charCode - 65 + 10
        } else if (charCode >= 97 && charCode <= 102) { // 'a'-'f'
            digit = charCode - 97 + 10
        } else {
            // Invalid character
            return abort("Invalid character in hexadecimal string")
        }

        result = result * 16 + digit
    }

    return isNegative ? -result : result
}


/**
 * 
 * uhdr is a numerical representation of dates where day 0 is 1948-12-10 (the date of the adoption of the Universal Declaration of Human Rights)
 * 
 * This function converts an ISO 8601 date string (YYYY-MM-DD) to a udhr day number
 */
export const iso_udhr: _pi.Refiner<number, string, d_loc.List_of_Characters> = ($, abort) => {

    const iso_day_0_offset = - 711471 // the number of days that iso day 1 (0001-01-01) is offset relative to udhr day 0 (1948-12-10)

    const month_day_table_normal = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
    const month_day_table_leap = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335]

    type ISO_Date = {
        year: number
        month: number
        day: number
    }

    const is_leap_year = (year: number): boolean =>
        (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)


    const characters = $

    const parse_iso_date = (
        characters: _pi.List<number>
    ): ISO_Date => {


        const get_certain_character_at = (characters: _pi.List<number>, index: number): number => {
            return characters.__deprecated_get_possible_item_at(index).__decide(
                ($) => $,
                () => abort("index out of bounds")
            )
        }

        const string_to_number = (characters: _pi.List<number>, start: number, end: number): number => {
            let result = 0
            for (let i = start; i < end; i++) {
                const digit = get_certain_character_at(characters, i) - 48
                if (digit < 0 || digit > 9) return abort("invalid date format")
                result = result * 10 + digit
            }
            return result
        }
        const dash = 45

        //validate format
        if (characters.__get_number_of_items() !== 10) { // YYYY-MM-DD
            return abort("invalid date format")
        }
        if (get_certain_character_at(characters, 4) !== dash) { // -
            return abort("invalid date format")
        }
        if (get_certain_character_at(characters, 7) !== dash) { // -
            return abort("invalid date format")
        }
        return {
            year: string_to_number(characters, 0, 4),
            month: string_to_number(characters, 5, 7),
            day: string_to_number(characters, 8, 10)
        }

    }

    const iso_date = parse_iso_date(characters)

    // Validate month (1-12)
    if (iso_date.month < 1 || iso_date.month > 12) {
        abort(`Invalid month: ${iso_date.month}. Month must be between 1 and 12`)
    }

    // Validate day (1-31, depending on month)
    if (iso_date.day < 1) {
        abort(`Invalid day: ${iso_date.day}. Day must be at least 1`)
    }

    // Check days per month
    const days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let max_day = days_in_month[iso_date.month - 1]

    // Adjust for leap year in February
    if (iso_date.month === 2 && is_leap_year(iso_date.year)) {
        max_day = 29
    }

    if (iso_date.day > max_day) {
        abort(`Invalid day: ${iso_date.day}. Month ${iso_date.month} has at most ${max_day} days`)
    }

    const full_years = iso_date.year - 1
    const leap_days_before_current_year =
        + _p.number.integer.divide(
            full_years,
            4,
            {
                divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 4")
            }
        )
        - _p.number.integer.divide(
            full_years,
            100,
            {
                divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 100")
            }
        )
        + _p.number.integer.divide(
            full_years,
            400,
            {
                divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 400")
            }
        )

    const total_days_before_current_year = full_years * 365 + leap_days_before_current_year

    const month_days = is_leap_year(iso_date.year) ? month_day_table_leap : month_day_table_normal
    const days_in_current_year = month_days[iso_date.month - 1] + iso_date.day

    // Calculate total days since January 1, year 1 CE
    const total_days_since_iso_year_1 = total_days_before_current_year + days_in_current_year

    // Convert to UDHR day number (add days from  1948-12-10)
    const udhr_day = total_days_since_iso_year_1 + iso_day_0_offset

    return udhr_day
}


export const octal: _pi.Refiner<number, string, d_loc.List_of_Characters> = ($, abort) => {
    const characters = $
    let result = 0
    let isNegative = false
    let startIndex = 0

    // Check for empty string
    if (characters.__get_number_of_items() === 0) {
        abort("Empty string is not a valid octal number")
    }

    const get_character_at = (index: number): number => characters.__deprecated_get_item_at(
        index,
        {
            out_of_bounds: () => abort("Index out of bounds while parsing octal string"),
        }
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
        abort("Octal number must have '0o' prefix")
    }
    startIndex += 2

    // Check if there are digits after the prefix
    if (startIndex >= characters.__get_number_of_items()) {
        abort("Octal number must have digits after '0o' prefix")
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
            abort("Invalid character in octal string")
        }
    }

    return isNegative ? -result : result
}