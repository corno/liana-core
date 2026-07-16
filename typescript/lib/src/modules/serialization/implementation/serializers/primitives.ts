import * as p_ from 'pareto-core/implementation/serializer'
import type * as p_t from 'pareto-core/interface/transformer'
import type * as p_di from 'pareto-core/interface/schema'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'
import p_list_build_deprecated from 'pareto-core/implementation/refiner/specials/list_build_deprecated'
import p_ext_from_list from 'pareto-core/implementation/transformer/specials/text_from_list'
import p_unreachable_code_path from 'pareto-core/implementation/transformer/specials/unreachable_code_path'

import type * as s_date from "../../schemas/date.js"


namespace declarations {
    export type true_false = p_.Serializer<
        boolean
    >
    export type scientific_notation = p_.Serializer_With_Parameter<
        number,
        {
            digits: number
        }
    >
    export type binary = p_.Serializer<
        number
    >
    export type decimal = p_.Serializer<
        number
    >
    export type hexadecimal = p_.Serializer<
        number
    >
    export type fractional_decimal = p_.Serializer_With_Parameter<
        number,
        {
            'number of fractional digits': number
        }
    >
    export type iso_date_udhr = p_.Serializer<
        number
    >
    export type octal = p_.Serializer<
        number
    >
}


export const true_false: declarations.true_false = ($) => p_.ph.literal($ ? "true" : "false")

export const scientific_notation: declarations.scientific_notation = ($, $p) => p_.ph.list_of_characters(
    p_list_build_deprecated<number>(
        ($i) => {
            // Handle special case for zero in scientific notation
            if ($ === 0) {
                $i['add item'](48) // '0'

                // Add decimal point if we have more than 1 digit
                if ($p.digits > 1) {
                    $i['add item'](46) // '.'

                    // Add the required number of zeros after decimal point
                    for (let i = 0; i < $p.digits - 1; i++) {
                        $i['add item'](48) // '0'
                    }
                }

                // Add exponent part for zero: e+0
                $i['add item'](101) // 'e'
                $i['add item'](43)  // '+'
                $i['add item'](48)  // '0'
                return
            }

            // Handle negative numbers
            if ($ < 0) {
                $i['add item'](45) // '-'
                $ = -$
            }

            // Calculate exponent and mantissa for scientific notation
            let $v_exponent = 0
            let mantissa = $

            // Normalize to range [1, 10)
            if (mantissa >= 10) {
                while (mantissa >= 10) {
                    mantissa = mantissa / 10
                    $v_exponent++
                }
            } else if (mantissa < 1) {
                while (mantissa < 1) {
                    mantissa = mantissa * 10
                    $v_exponent--
                }
            }

            // Create scale factor by multiplying
            let scale_factor = 1
            for (let i = 0; i < $p.digits - 1; i++) {
                scale_factor = scale_factor * 10
            }

            // Simple rounding using integer operations
            const mantissa_scaled = p_.from.number(
                mantissa * scale_factor + 0.5
            ).divide(
                1,
                ['towards zero', null],
                {
                    divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 1")
                }
            )

            // Convert mantissa to string
            const digits = p_list_build_deprecated<number>(
                ($i) => {
                    let temp = mantissa_scaled
                    // temp is always > 0 here since mantissa_scaled = integer_division(mantissa * scale_factor + 0.5, 1)
                    // where mantissa >= 1.0 (normalized) and scale_factor >= 1, so result >= 1
                    do {
                        const digit = temp % 10
                        $i['add item'](digit)
                        temp = p_.from.number(temp).divide(
                            10,
                            ['towards zero', null],
                            {
                                divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 10")
                            }
                        )
                    } while (temp > 0)
                })

            // Add leading digit
            const first_digit = digits.__deprecated_get_item_at(
                p_.from.list(digits).amount_of_items() - 1,
                {
                    out_of_bounds: () => p_unreachable_code_path("index cannot be out of bounds")
                }
            )
            $i['add item'](48 + first_digit) // First digit

            // Add decimal point if we have more digits
            if ($p.digits > 1 && p_.from.list(digits).amount_of_items() > 1) {
                $i['add item'](46) // '.'

                // Add remaining digits in reverse order
                for (let j = p_.from.list(digits).amount_of_items() - 2; j >= 0; j--) {
                    const digit = digits.__deprecated_get_item_at(
                        j,
                        {
                            out_of_bounds: () => p_unreachable_code_path("index cannot be out of bounds")
                        }
                    )
                    $i['add item'](48 + digit)
                }
            }

            // Add exponent part
            $i['add item'](101) // 'e'
            if ($v_exponent < 0) {
                $i['add item'](45) // '-'
                $v_exponent = -$v_exponent
            } else {
                $i['add item'](43) // '+'
            }

            // Convert exponent to string
            const exp_digits = p_list_build_deprecated<number>(
                ($i) => {
                    if ($v_exponent === 0) {
                        $i['add item'](0)
                    } else {
                        do {
                            const digit = $v_exponent % 10
                            $i['add item'](digit)
                            $v_exponent = p_.from.number($v_exponent).divide(
                                10,
                                ['towards zero', null],
                                {
                                    divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 10")
                                }
                            )
                        } while ($v_exponent > 0)
                    }
                })

            // Add exponent digits in reverse order
            for (let j = p_.from.list(exp_digits).amount_of_items() - 1; j >= 0; j--) {
                const digit = exp_digits.__deprecated_get_item_at(
                    j,
                    {
                        out_of_bounds: () => p_unreachable_code_path("index cannot be out of bounds")
                    }
                )
                $i['add item'](48 + digit)
            }
        }
    )
)

export const binary: declarations.binary = ($) => p_.ph.list_of_characters(
    p_list_build_deprecated<number>(
        ($i) => {
            if ($ < 0) {
                $i['add item'](45) // '-'
                $ = -$
            }

            // Add "0b" prefix
            $i['add item'](48) // '0'
            $i['add item'](98) // 'b'

            const digits = p_list_build_deprecated<number>(
                ($i) => {
                    do {
                        const digit = $ % 2
                        $i['add item'](digit)
                        $ = p_.from.number($).divide(
                            2,
                            ['towards zero', null],
                            {
                                divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 2")
                            }
                        )
                    } while ($ > 0)

                })

            for (let j = p_.from.list(digits).amount_of_items() - 1; j >= 0; j--) {
                const digit = p_.from.optional(digits.__deprecated_get_possible_item_at(j)).decide(
                    ($) => $,
                    () => p_unreachable_code_path("index cannot be out of bounds")
                )
                $i['add item'](48 + digit) // '0'-'1'
            }
        }
    ),
)

export const decimal_imp = ($: number) => p_list_build_deprecated<number>(
    ($i) => {
        if ($ < 0) {
            $i['add item'](45) // '-'
            $ = -$
        }
        const digits = p_list_build_deprecated<number>(
            ($i) => {
                do {
                    const digit = $ % 10
                    $i['add item'](digit)
                    $ = p_.from.number($).divide(
                        10,
                        ['towards zero', null],
                        {
                            divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 10")
                        }
                    )
                } while ($ > 0)

            })

        for (let j = p_.from.list(digits).amount_of_items() - 1; j >= 0; j--) {
            $i['add item'](48 + digits.__deprecated_get_item_at(
                j,
                {
                    out_of_bounds: () => p_unreachable_code_path("index cannot be out of bounds")
                }
            ))
        }
    }
)

export const decimal: declarations.decimal = ($) => p_.ph.list_of_characters(
    decimal_imp($),
)


export const hexadecimal: declarations.hexadecimal = ($) => p_.ph.list_of_characters(
    p_list_build_deprecated<number>(
        ($i) => {
            if ($ < 0) {
                $i['add item'](45) // '-'
                $ = -$
            }

            // Add "0x" prefix
            $i['add item'](48) // '0'
            $i['add item'](120) // 'x'

            const digits = p_list_build_deprecated<number>(
                ($i) => {
                    do {
                        const digit = $ % 16
                        $i['add item'](digit)
                        $ = p_.from.number($).divide(
                            16,
                            ['towards zero', null],
                            {
                                divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 16")
                            }
                        )
                    } while ($ > 0)

                })

            for (let j = p_.from.list(digits).amount_of_items() - 1; j >= 0; j--) {
                const digit = digits.__deprecated_get_item_at(
                    j,
                    {
                        out_of_bounds: () => p_unreachable_code_path("index cannot be out of bounds")
                    }
                )
                if (digit < 10) {
                    $i['add item'](48 + digit) // '0'-'9'
                } else {
                    $i['add item'](65 + digit - 10) // 'A'-'F'
                }
            }
        }
    ),
)


export const fractional_decimal: declarations.fractional_decimal = ($, $p) => p_.ph.list_of_characters(
    p_list_build_deprecated<number>(
        ($i) => {
            let value = $

            // Handle negative numbers
            if (value < 0) {
                $i['add item'](45) // '-'
                value = -value
            }

            // Calculate the divisor for the fractional part (10^fractionalDigits)
            let divisor = 1
            for (let i = 0; i < $p['number of fractional digits']; i++) {
                divisor *= 10
            }

            // Split into integer and fractional parts
            const integerPart = p_.from.number(value).divide(
                divisor,
                ['towards zero', null],
                {
                    divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 10^fractionalDigits")
                }
            )
            const fractionalPart = value % divisor

            // Generate integer part digits
            const integerDigits = p_list_build_deprecated<number>(
                ($i) => {
                    let temp = integerPart
                    if (temp === 0) {
                        $i['add item'](0)
                    } else {
                        while (temp > 0) {
                            const digit = temp % 10
                            $i['add item'](digit)
                            temp = p_.from.number(temp).divide(
                                10,
                                ['towards zero', null],
                                {
                                    divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 10")
                                }
                            )
                        }
                    }
                })

            // Add integer part (reverse order)
            for (let j = p_.from.list(integerDigits).amount_of_items() - 1; j >= 0; j--) {
                $i['add item'](48 + p_.from.optional(integerDigits.__deprecated_get_possible_item_at(j)).decide(
                    ($) => $,
                    () => p_unreachable_code_path("index cannot be out of bounds")
                ))
            }

            // Add decimal point
            $i['add item'](46) // '.'

            // Generate fractional part digits
            const fractionalDigits_list = p_list_build_deprecated<number>(
                ($i) => {
                    let temp = fractionalPart
                    for (let i = 0; i < $p['number of fractional digits']; i++) {
                        const digit = temp % 10
                        $i['add item'](digit)
                        temp = p_.from.number(temp).divide(
                            10,
                            ['towards zero', null],
                            {
                                divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 10")
                            }
                        )
                    }
                })

            // Add fractional part (reverse order)
            for (let j = p_.from.list(fractionalDigits_list).amount_of_items() - 1; j >= 0; j--) {
                $i['add item'](48 + p_.from.optional(fractionalDigits_list.__deprecated_get_possible_item_at(j)).decide(
                    ($) => $,
                    () => p_unreachable_code_path("index cannot be out of bounds")
                ))
            }
        }
    ),
)

export const iso_date_udhr: declarations.iso_date_udhr = (udhr_day) => {

    const pad_left: p_t.Transformer_With_Parameter<
        p_di.List<number>,
        p_di.List<number>,
        {
            'desired length': number,
            'pad character': number
        }
    > = ($, $p) => p_list_build_deprecated(
        ($i) => {
            // Add padding characters if current length is less than desired length
            for (let i = p_.from.list($).amount_of_items(); i < $p['desired length']; i++) {
                $i['add item']($p['pad character'])
            }
            $i['add list']($)
        }
    )

    const iso_date_udhr = ($:number): s_date.Date => {

        const iso_day_0_offset = - 711471 // the number of days that iso day 1 (0001-01-01) is offset relative to udhr day 0 (1948-12-10)

        const is_leap_year = (year: number): boolean =>
            (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)


        // Convert UDHR day to days since January 1, year 1 CE
        const total_days = $ - iso_day_0_offset

        const number_of_days_in_400_years = 365 * 400 + 97
        const number_of_days_in_100_years = 365 * 100 + 24
        const number_of_days_in_4_years = 365 * 4 + 1
        const number_of_days_in_1_year = 365

        const $v_number_of_400_year_blocks = p_.from.number(total_days).divide(
            number_of_days_in_400_years,
            ['towards zero', null],
            {
                divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 400-year block")
            }
        )
        const $v_remaining_days_in_the_last_400_years = total_days % number_of_days_in_400_years

        const number_of_100_year_blocks = p_.from.number($v_remaining_days_in_the_last_400_years).divide(
            number_of_days_in_100_years,
            ['towards zero', null],
            {
                divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 100-year block")
            }
        )
        const $v_remaining_days_in_the_last_100_years = $v_remaining_days_in_the_last_400_years % number_of_days_in_100_years

        const number_of_4_year_blocks = p_.from.number($v_remaining_days_in_the_last_100_years).divide(
            number_of_days_in_4_years,
            ['towards zero', null],
            {
                divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 4-year block")
            }
        )
        const $v_remaining_days_in_the_last_4_years = $v_remaining_days_in_the_last_100_years % number_of_days_in_4_years

        const number_of_1_year_blocks = p_.from.number($v_remaining_days_in_the_last_4_years).divide(
            number_of_days_in_1_year,
            ['towards zero', null],
            {
                divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 1-year block")
            }
        )
        const $v_remaining_days_in_the_last_year = $v_remaining_days_in_the_last_4_years % number_of_days_in_1_year

        const $v_base_years = $v_number_of_400_year_blocks * 400 + number_of_100_year_blocks * 100 + number_of_4_year_blocks * 4 + number_of_1_year_blocks * 1

        // When remaining_days_in_the_last_year === 0, we're at the end of a year boundary
        const $v_days_in_current_year = $v_remaining_days_in_the_last_year === 0
            // Special case: end of year, need full year length (leap or non-leap)
            ? (is_leap_year($v_base_years) ? 366 : 365)
            // Normal case: partial year, use the remaining days
            : $v_remaining_days_in_the_last_year

        const number_of_years = $v_remaining_days_in_the_last_year === 0
            ? $v_base_years - 1
            : $v_base_years

        const year = number_of_years + 1


        const month_day_table_normal = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
        const month_day_table_leap = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335]
        const month_day_table = is_leap_year(year)
            ? month_day_table_leap
            : month_day_table_normal

        const month = (() => {
            if ($v_days_in_current_year <= month_day_table[1]!) {
                return 1
            } else if ($v_days_in_current_year <= month_day_table[2]!) {
                return 2
            } else if ($v_days_in_current_year <= month_day_table[3]!) {
                return 3
            } else if ($v_days_in_current_year <= month_day_table[4]!) {
                return 4
            } else if ($v_days_in_current_year <= month_day_table[5]!) {
                return 5
            } else if ($v_days_in_current_year <= month_day_table[6]!) {
                return 6
            } else if ($v_days_in_current_year <= month_day_table[7]!) {
                return 7
            } else if ($v_days_in_current_year <= month_day_table[8]!) {
                return 8
            } else if ($v_days_in_current_year <= month_day_table[9]!) {
                return 9
            } else if ($v_days_in_current_year <= month_day_table[10]!) {
                return 10
            } else if ($v_days_in_current_year <= month_day_table[11]!) {
                return 11
            } else {
                return 12
            }
        })()

        const day = $v_days_in_current_year - month_day_table[month - 1]!

        return {
            year,
            month,
            day,
        }
    }

    const iso_date = iso_date_udhr(udhr_day)

    // Format with leading zeros using pad_left function
    // Year: 4 digits, Month and Day: 2 digits
    const year_str = pad_left(decimal_imp(iso_date.year), { 'desired length': 4, 'pad character': 48 }) // '0'
    const month_str = pad_left(decimal_imp(iso_date.month), { 'desired length': 2, 'pad character': 48 }) // '0'  
    const day_str = pad_left(decimal_imp(iso_date.day), { 'desired length': 2, 'pad character': 48 }) // '0'

    return p_.ph.list_of_characters(
        p_.literal.segmented_list([
            year_str,
            p_.literal.list([
                45 // '-'
            ]),
            month_str,
            p_.literal.list([
                45 // '-'
            ]),
            day_str
        ])
    )
}

export const octal: declarations.octal = ($) => p_.ph.list_of_characters(
    p_list_build_deprecated<number>(
        ($i) => {
            if ($ < 0) {
                $i['add item'](45) // '-'
                $ = -$
            }

            // Add "0o" prefix
            $i['add item'](48) // '0'
            $i['add item'](111) // 'o'

            const digits = p_list_build_deprecated<number>(
                ($i) => {
                    do {
                        const digit = $ % 8
                        $i['add item'](digit)
                        $ = p_.from.number($).divide(
                            8,
                            ['towards zero', null],
                            {
                                divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 8")
                            }
                        )
                    } while ($ > 0)

                })

            for (let j = p_.from.list(digits).amount_of_items() - 1; j >= 0; j--) {
                const digit = p_.from.optional(digits.__deprecated_get_possible_item_at(j)).decide(
                    ($) => $,
                    () => p_unreachable_code_path("index cannot be out of bounds")
                )
                $i['add item'](48 + digit) // '0'-'7'
            }
        }
    )
)