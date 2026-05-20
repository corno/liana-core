import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

//data types
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/text/data"
import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

//dependencies
import * as t_to_date_struct from "./date_struct"


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

export const iso_date_udhr: _pi.Transformer<number, d_out.Text> = (udhr_day) => {

    const pad_left: _pi.Transformer_With_Parameter<string, _pi.List<number>, { 'desired length': number, 'pad character': number }> = ($, $p) => _p_list_build_deprecated(($i) => {
        const as_list_of_characters = _p_list_from_text($, ($) => $)
        // Add padding characters if current length is less than desired length
        for (let i = _p.number.natural.from.list(as_list_of_characters).amount_of_items(); i < $p['desired length']; i++) {
            $i['add item']($p['pad character'])
        }
        $i['add list'](as_list_of_characters)
    })

    const iso_date = t_to_date_struct.iso_date_udhr(udhr_day)

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