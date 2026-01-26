import * as _p from 'pareto-core/dist/refiner'
import * as _pi from 'pareto-core/dist/interface'
import * as _pd from 'pareto-core/dist/deserializer'

import * as signatures from "../../../../../interface/signatures"

/**
 * 
 * uhdr is a numerical representation of dates where day 0 is 1948-12-10 (the date of the adoption of the Universal Declaration of Human Rights)
 * 
 * This function converts an ISO 8601 date string (YYYY-MM-DD) to a udhr day number
 */
export const $$: signatures.deserializers.primitives.integer.iso_udhr = ($, abort) => {

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


    const characters = _pd.list.from_text($, ($) => $)

    const parse_iso_date = (
        characters: _pi.List<number>
    ): ISO_Date => {


        const get_certain_character_at = (characters: _pi.List<number>, index: number): number => {
            return characters.__get_possible_element_at(index).__decide(
                ($) => $,
                () => abort(`index out of bounds`)
            )
        }

        const string_to_number = (characters: _pi.List<number>, start: number, end: number): number => {
            let result = 0
            for (let i = start; i < end; i++) {
                const digit = get_certain_character_at(characters, i) - 48
                if (digit < 0 || digit > 9) return abort(`invalid date format`)
                result = result * 10 + digit
            }
            return result
        }
        const dash = 45

        //validate format
        if (characters.__get_number_of_elements() !== 10) { // YYYY-MM-DD
            return abort(`invalid date format`)
        }
        if (get_certain_character_at(characters, 4) !== dash) { // -
            return abort(`invalid date format`)
        }
        if (get_certain_character_at(characters, 7) !== dash) { // -
            return abort(`invalid date format`)
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
        + _p.integer.divide(full_years, 4, () =>_p.unreachable_code_path())
        - _p.integer.divide(full_years, 100, () => _p.unreachable_code_path())
        + _p.integer.divide(full_years, 400, () => _p.unreachable_code_path())

    const total_days_before_current_year = full_years * 365 + leap_days_before_current_year

    const month_days = is_leap_year(iso_date.year) ? month_day_table_leap : month_day_table_normal
    const days_in_current_year = month_days[iso_date.month - 1] + iso_date.day

    // Calculate total days since January 1, year 1 CE
    const total_days_since_iso_year_1 = total_days_before_current_year + days_in_current_year

    // Convert to UDHR day number (add days from  1948-12-10)
    const udhr_day = total_days_since_iso_year_1 + iso_day_0_offset

    return udhr_day
}