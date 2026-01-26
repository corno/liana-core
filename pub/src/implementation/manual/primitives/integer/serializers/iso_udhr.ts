import * as _p from 'pareto-core/dist/transformer'
import * as _pi from 'pareto-core/dist/interface'
import * as _ps from 'pareto-core/dist/serializer'

import { serialize as s_decimal } from "./decimal"

import * as signatures from "../../../../../interface/signatures"

export const $$: signatures.serializers.primitives.integer.iso_udhr = (udhr_day) => {

    const pad_left: _pi.Text_Serializer_With_Parameters<{ 'desired length': number, 'pad character': number }> = ($, $p) => _ps.text.deprecated_build(($i) => {
    // Add padding characters if current length is less than desired length
    for (let i = _p.natural.text_length($); i < $p['desired length']; i++) {
        $i.add_character($p['pad character'])
    }
    $i.add_snippet($)
})

    const iso_day_0_offset = - 711471 // the number of days that iso day 1 (0001-01-01) is offset relative to udhr day 0 (1948-12-10)

    type ISO_Date = {
        year: number
        month: number
        day: number
    }

    const is_leap_year = (year: number): boolean =>
        (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)

    const uhdr_to_iso_imp = (udhr_day: number): ISO_Date => {

        // Convert UDHR day to days since January 1, year 1 CE
        const total_days = udhr_day - iso_day_0_offset

        const number_of_days_in_400_years = 365 * 400 + 97
        const number_of_days_in_100_years = 365 * 100 + 24
        const number_of_days_in_4_years = 365 * 4 + 1
        const number_of_days_in_1_year = 365

        const number_of_400_year_blocks = _p.integer.divide(total_days, number_of_days_in_400_years,  () => _p.unreachable_code_path())
        const remaining_days_in_the_last_400_years = total_days % number_of_days_in_400_years

        const number_of_100_year_blocks = _p.integer.divide(remaining_days_in_the_last_400_years, number_of_days_in_100_years, () => _p.unreachable_code_path())
        const remaining_days_in_the_last_100_years = remaining_days_in_the_last_400_years % number_of_days_in_100_years

        const number_of_4_year_blocks = _p.integer.divide(remaining_days_in_the_last_100_years, number_of_days_in_4_years, () => _p.unreachable_code_path())
        const remaining_days_in_the_last_4_years = remaining_days_in_the_last_100_years % number_of_days_in_4_years

        const number_of_1_year_blocks = _p.integer.divide(remaining_days_in_the_last_4_years, number_of_days_in_1_year, () => _p.unreachable_code_path())
        const remaining_days_in_the_last_year = remaining_days_in_the_last_4_years % number_of_days_in_1_year

        const base_years = number_of_400_year_blocks * 400 + number_of_100_year_blocks * 100 + number_of_4_year_blocks * 4 + number_of_1_year_blocks * 1

        // When remaining_days_in_the_last_year === 0, we're at the end of a year boundary
        const days_in_current_year = remaining_days_in_the_last_year === 0
            // Special case: end of year, need full year length (leap or non-leap)
            ? (is_leap_year(base_years) ? 366 : 365)
            // Normal case: partial year, use the remaining days
            : remaining_days_in_the_last_year

        const number_of_years = remaining_days_in_the_last_year === 0
            ? base_years - 1
            : base_years

        const year = number_of_years + 1


        const month_day_table_normal = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
        const month_day_table_leap = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335]
        const month_day_table = is_leap_year(year) ? month_day_table_leap : month_day_table_normal

        const month = (() => {
            if (days_in_current_year <= month_day_table[1]) {
                return 1
            } else if (days_in_current_year <= month_day_table[2]) {
                return 2
            } else if (days_in_current_year <= month_day_table[3]) {
                return 3
            } else if (days_in_current_year <= month_day_table[4]) {
                return 4
            } else if (days_in_current_year <= month_day_table[5]) {
                return 5
            } else if (days_in_current_year <= month_day_table[6]) {
                return 6
            } else if (days_in_current_year <= month_day_table[7]) {
                return 7
            } else if (days_in_current_year <= month_day_table[8]) {
                return 8
            } else if (days_in_current_year <= month_day_table[9]) {
                return 9
            } else if (days_in_current_year <= month_day_table[10]) {
                return 10
            } else if (days_in_current_year <= month_day_table[11]) {
                return 11
            } else {
                return 12
            }
        })()

        const day = days_in_current_year - month_day_table[month - 1]

        return {
            year,
            month,
            day,
        }
    }
    const iso_date = uhdr_to_iso_imp(udhr_day)

    // Format with leading zeros using pad_left function
    // Year: 4 digits, Month and Day: 2 digits
    const year_str = pad_left(s_decimal(iso_date.year), { 'desired length': 4, 'pad character': 48 }) // '0'
    const month_str = pad_left(s_decimal(iso_date.month), { 'desired length': 2, 'pad character': 48 }) // '0'  
    const day_str = pad_left(s_decimal(iso_date.day), { 'desired length': 2, 'pad character': 48 }) // '0'

    return `${year_str}-${month_str}-${day_str}`
}

