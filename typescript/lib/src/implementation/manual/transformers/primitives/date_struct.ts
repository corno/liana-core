import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'
import p_unreachable_code_path from 'pareto-core/dist/implementation/specials/unreachable_code_path'

export type Date_Struct = {
    year: number
    month: number
    day: number
}

export const iso_date_udhr: p_i.Transformer<number, Date_Struct> = (udhr_day) => {

    const iso_day_0_offset = - 711471 // the number of days that iso day 1 (0001-01-01) is offset relative to udhr day 0 (1948-12-10)

    const is_leap_year = (year: number): boolean =>
        (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)


    // Convert UDHR day to days since January 1, year 1 CE
    const total_days = udhr_day - iso_day_0_offset

    const number_of_days_in_400_years = 365 * 400 + 97
    const number_of_days_in_100_years = 365 * 100 + 24
    const number_of_days_in_4_years = 365 * 4 + 1
    const number_of_days_in_1_year = 365

    const number_of_400_year_blocks = p_.number.from.number.divide(
        total_days,
        number_of_days_in_400_years,
            ['towards zero', null],
        {
            divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 400-year block")
        }
    )
    const remaining_days_in_the_last_400_years = total_days % number_of_days_in_400_years

    const number_of_100_year_blocks = p_.number.from.number.divide(
        remaining_days_in_the_last_400_years,
        number_of_days_in_100_years,
            ['towards zero', null],
        {
            divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 100-year block")
        }
    )
    const remaining_days_in_the_last_100_years = remaining_days_in_the_last_400_years % number_of_days_in_100_years

    const number_of_4_year_blocks = p_.number.from.number.divide(
        remaining_days_in_the_last_100_years,
        number_of_days_in_4_years,
            ['towards zero', null],
        {
            divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 4-year block")
        }
    )
    const remaining_days_in_the_last_4_years = remaining_days_in_the_last_100_years % number_of_days_in_4_years

    const number_of_1_year_blocks = p_.number.from.number.divide(
        remaining_days_in_the_last_4_years,
        number_of_days_in_1_year,
            ['towards zero', null],
        {
            divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 1-year block")
        }
    )
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