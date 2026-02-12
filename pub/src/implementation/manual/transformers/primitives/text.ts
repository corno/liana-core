import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

//data types
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/text/data"
import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'


export const true_false: _pi.Transformer<boolean, d_out.Text> = ($) => {
    return $ ? "true" : "false"
}

export const scientific_notation: _pi.Transformer_With_Parameter<number, d_out.Text, { digits: number }> = ($, $p) => {
    return _p_text_from_list(
        _p_list_build_deprecated<number>(($i) => {
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
            let exponent = 0
            let mantissa = $

            // Normalize to range [1, 10)
            if (mantissa >= 10) {
                while (mantissa >= 10) {
                    mantissa = mantissa / 10
                    exponent++
                }
            } else if (mantissa < 1) {
                while (mantissa < 1) {
                    mantissa = mantissa * 10
                    exponent--
                }
            }

            // Create scale factor by multiplying
            let scale_factor = 1
            for (let i = 0; i < $p.digits - 1; i++) {
                scale_factor = scale_factor * 10
            }

            // Simple rounding using integer operations
            const mantissa_scaled = _p.number.integer.divide(
                mantissa * scale_factor + 0.5,
                1,
                {
                    divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 1")
                }
            )

            // Convert mantissa to string
            const digits = _p_list_build_deprecated<number>(($i) => {
                let temp = mantissa_scaled
                // temp is always > 0 here since mantissa_scaled = integer_division(mantissa * scale_factor + 0.5, 1)
                // where mantissa >= 1.0 (normalized) and scale_factor >= 1, so result >= 1
                do {
                    const digit = temp % 10
                    $i['add item'](digit)
                    temp = _p.number.integer.divide(
                        temp,
                        10,
                        {
                            divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 10")
                        }
                    )
                } while (temp > 0)
            })

            // Add leading digit
            const first_digit = digits.__deprecated_get_item_at(
                digits.__get_number_of_items() - 1,
                {
                    out_of_bounds: () => _p_unreachable_code_path("index cannot be out of bounds")
                }
            )
            $i['add item'](48 + first_digit) // First digit

            // Add decimal point if we have more digits
            if ($p.digits > 1 && digits.__get_number_of_items() > 1) {
                $i['add item'](46) // '.'

                // Add remaining digits in reverse order
                for (let j = digits.__get_number_of_items() - 2; j >= 0; j--) {
                    const digit = digits.__deprecated_get_item_at(
                        j,
                        {
                            out_of_bounds: () => _p_unreachable_code_path("index cannot be out of bounds")
                        }
                    )
                    $i['add item'](48 + digit)
                }
            }

            // Add exponent part
            $i['add item'](101) // 'e'
            if (exponent < 0) {
                $i['add item'](45) // '-'
                exponent = -exponent
            } else {
                $i['add item'](43) // '+'
            }

            // Convert exponent to string
            const exp_digits = _p_list_build_deprecated<number>(($i) => {
                if (exponent === 0) {
                    $i['add item'](0)
                } else {
                    do {
                        const digit = exponent % 10
                        $i['add item'](digit)
                        exponent = _p.number.integer.divide(
                            exponent,
                            10,
                            {
                                divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 10")
                            }
                        )
                    } while (exponent > 0)
                }
            })

            // Add exponent digits in reverse order
            for (let j = exp_digits.__get_number_of_items() - 1; j >= 0; j--) {
                const digit = exp_digits.__deprecated_get_item_at(
                    j,
                    {
                        out_of_bounds: () => _p_unreachable_code_path("index cannot be out of bounds")
                    }
                )
                $i['add item'](48 + digit)
            }
        }),
        ($) => $
    )
}

export const binary: _pi.Transformer<number, d_out.Text> = ($) => _p_text_from_list(
    _p_list_build_deprecated<number>(($i) => {
        if ($ < 0) {
            $i['add item'](45) // '-'
            $ = -$
        }

        // Add "0b" prefix
        $i['add item'](48) // '0'
        $i['add item'](98) // 'b'

        const digits = _p_list_build_deprecated<number>(($i) => {
            do {
                const digit = $ % 2
                $i['add item'](digit)
                $ = _p.number.integer.divide(
                    $,
                    2,
                    {
                        divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 2")
                    }
                )
            } while ($ > 0)

        })

        for (let j = digits.__get_number_of_items() - 1; j >= 0; j--) {
            const digit = digits.__deprecated_get_possible_item_at(j).__decide(
                ($) => $,
                () => _p_unreachable_code_path("index cannot be out of bounds")
            )
            $i['add item'](48 + digit) // '0'-'1'
        }
    }),
    ($) => $
)


export const decimal: _pi.Transformer<number, d_out.Text> = ($) => _p_text_from_list(
    _p_list_build_deprecated<number>(($i) => {
        if ($ < 0) {
            $i['add item'](45) // '-'
            $ = -$
        }
        const digits = _p_list_build_deprecated<number>(($i) => {
            do {
                const digit = $ % 10
                $i['add item'](digit)
                $ = _p.number.integer.divide(
                    $,
                    10,
                    {
                        divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 10")
                    }
                )
            } while ($ > 0)

        })

        for (let j = digits.__get_number_of_items() - 1; j >= 0; j--) {
            $i['add item'](48 + digits.__deprecated_get_item_at(
                j,
                {
                    out_of_bounds: () => _p_unreachable_code_path("index cannot be out of bounds")
                }
            ))
        }
    }),
    ($) => $
)


export const hexadecimal: _pi.Transformer<number, d_out.Text> = ($) => _p_text_from_list(
    _p_list_build_deprecated<number>(($i) => {
        if ($ < 0) {
            $i['add item'](45) // '-'
            $ = -$
        }

        // Add "0x" prefix
        $i['add item'](48) // '0'
        $i['add item'](120) // 'x'

        const digits = _p_list_build_deprecated<number>(($i) => {
            do {
                const digit = $ % 16
                $i['add item'](digit)
                $ = _p.number.integer.divide(
                    $,
                    16,
                    {
                        divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 16")
                    }
                )
            } while ($ > 0)

        })

        for (let j = digits.__get_number_of_items() - 1; j >= 0; j--) {
            const digit = digits.__deprecated_get_item_at(
                j,
                {
                    out_of_bounds: () => _p_unreachable_code_path("index cannot be out of bounds")
                }
            )
            if (digit < 10) {
                $i['add item'](48 + digit) // '0'-'9'
            } else {
                $i['add item'](65 + digit - 10) // 'A'-'F'
            }
        }
    }),
    ($) => $
)


export const fractional_decimal: _pi.Transformer_With_Parameter<number, d_out.Text, { 'number of fractional digits': number }> = ($, $p) => _p_text_from_list(
    _p_list_build_deprecated<number>(($i) => {
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
        const integerPart = _p.number.integer.divide(
            value,
            divisor,
            {
                divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 10^fractionalDigits")
            }
        )
        const fractionalPart = value % divisor

        // Generate integer part digits
        const integerDigits = _p_list_build_deprecated<number>(($i) => {
            let temp = integerPart
            if (temp === 0) {
                $i['add item'](0)
            } else {
                while (temp > 0) {
                    const digit = temp % 10
                    $i['add item'](digit)
                    temp = _p.number.integer.divide(
                        temp,
                        10,
                        {
                            divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 10")
                        }
                    )
                }
            }
        })

        // Add integer part (reverse order)
        for (let j = integerDigits.__get_number_of_items() - 1; j >= 0; j--) {
            $i['add item'](48 + integerDigits.__deprecated_get_possible_item_at(j).__decide(
                ($) => $,
                () => _p_unreachable_code_path("index cannot be out of bounds")
            ))
        }

        // Add decimal point
        $i['add item'](46) // '.'

        // Generate fractional part digits
        const fractionalDigits_list = _p_list_build_deprecated<number>(($i) => {
            let temp = fractionalPart
            for (let i = 0; i < $p['number of fractional digits']; i++) {
                const digit = temp % 10
                $i['add item'](digit)
                temp = _p.number.integer.divide(
                    temp,
                    10,
                    {
                        divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 10")
                    }
                )
            }
        })

        // Add fractional part (reverse order)
        for (let j = fractionalDigits_list.__get_number_of_items() - 1; j >= 0; j--) {
            $i['add item'](48 + fractionalDigits_list.__deprecated_get_possible_item_at(j).__decide(
                ($) => $,
                () => _p_unreachable_code_path("index cannot be out of bounds")
            ))
        }
    }),
    ($) => $
)

export const iso_udhr: _pi.Transformer<number, d_out.Text> = (udhr_day) => {

    const pad_left: _pi.Transformer_With_Parameter<string, _pi.List<number>, { 'desired length': number, 'pad character': number }> = ($, $p) => _p_list_build_deprecated(($i) => {
        const as_list_of_characters = _p_list_from_text($, ($) => $)
        // Add padding characters if current length is less than desired length
        for (let i = _p.number.natural.from.list(as_list_of_characters).amount_of_items(); i < $p['desired length']; i++) {
            $i['add item']($p['pad character'])
        }
        $i['add list'](as_list_of_characters)
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

        const number_of_400_year_blocks = _p.number.integer.divide(
            total_days,
            number_of_days_in_400_years,
            {
                divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 400-year block")
            }
        )
        const remaining_days_in_the_last_400_years = total_days % number_of_days_in_400_years

        const number_of_100_year_blocks = _p.number.integer.divide(
            remaining_days_in_the_last_400_years,
            number_of_days_in_100_years,
            {
                divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 100-year block")
            }
        )
        const remaining_days_in_the_last_100_years = remaining_days_in_the_last_400_years % number_of_days_in_100_years

        const number_of_4_year_blocks = _p.number.integer.divide(
            remaining_days_in_the_last_100_years,
            number_of_days_in_4_years,
            {
                divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 4-year block")
            }
        )
        const remaining_days_in_the_last_4_years = remaining_days_in_the_last_100_years % number_of_days_in_4_years

        const number_of_1_year_blocks = _p.number.integer.divide(
            remaining_days_in_the_last_4_years,
            number_of_days_in_1_year,
            {
                divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 1-year block")
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
    const iso_date = uhdr_to_iso_imp(udhr_day)

    // Format with leading zeros using pad_left function
    // Year: 4 digits, Month and Day: 2 digits
    const year_str = pad_left(decimal(iso_date.year), { 'desired length': 4, 'pad character': 48 }) // '0'
    const month_str = pad_left(decimal(iso_date.month), { 'desired length': 2, 'pad character': 48 }) // '0'  
    const day_str = pad_left(decimal(iso_date.day), { 'desired length': 2, 'pad character': 48 }) // '0'

    return _p_text_from_list(
        _p.list.nested_literal_old([
            year_str,
            [
                45 // '-'
            ],
            month_str,
            [
                45 // '-'
            ],
            day_str
        ]),
        ($) => $
    )
}

export const octal: _pi.Transformer<number, d_out.Text> = ($) => _p_text_from_list(
    _p_list_build_deprecated<number>(($i) => {
        if ($ < 0) {
            $i['add item'](45) // '-'
            $ = -$
        }

        // Add "0o" prefix
        $i['add item'](48) // '0'
        $i['add item'](111) // 'o'

        const digits = _p_list_build_deprecated<number>(($i) => {
            do {
                const digit = $ % 8
                $i['add item'](digit)
                $ = _p.number.integer.divide(
                    $,
                    8,
                    {
                        divided_by_zero: () => _p_unreachable_code_path("the divisor is hardcoded to 8")
                    }
                )
            } while ($ > 0)

        })

        for (let j = digits.__get_number_of_items() - 1; j >= 0; j--) {
            const digit = digits.__deprecated_get_possible_item_at(j).__decide(
                ($) => $,
                () => _p_unreachable_code_path("index cannot be out of bounds")
            )
            $i['add item'](48 + digit) // '0'-'7'
        }
    }),
    ($) => $
)