import * as _p from 'pareto-core/dist/transformer'
import * as _ps from 'pareto-core/dist/serializer'

import * as signatures from "../../../../../interface/signatures"

export const $$: signatures.serializers.primitives.approximate_number.scientific_notation = ($, $p) => {
    return _ps.text.deprecated_build(($i) => {
        // Handle special case for zero in scientific notation
        if ($ === 0) {
            $i.add_character(48) // '0'

            // Add decimal point if we have more than 1 digit
            if ($p.digits > 1) {
                $i.add_character(46) // '.'

                // Add the required number of zeros after decimal point
                for (let i = 0; i < $p.digits - 1; i++) {
                    $i.add_character(48) // '0'
                }
            }

            // Add exponent part for zero: e+0
            $i.add_character(101) // 'e'
            $i.add_character(43)  // '+'
            $i.add_character(48)  // '0'
            return
        }

        // Handle negative numbers
        if ($ < 0) {
            $i.add_character(45) // '-'
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
        const mantissa_scaled = _p.integer.divide(mantissa * scale_factor + 0.5, 1, () => _p.unreachable_code_path())

        // Convert mantissa to string
        const digits = _p.list.deprecated_build<number>(($i) => {
            let temp = mantissa_scaled
            // temp is always > 0 here since mantissa_scaled = integer_division(mantissa * scale_factor + 0.5, 1)
            // where mantissa >= 1.0 (normalized) and scale_factor >= 1, so result >= 1
            do {
                const digit = temp % 10
                $i['add element'](digit)
                temp = _p.integer.divide(temp, 10, () => _p.unreachable_code_path())
            } while (temp > 0)
        })

        // Add leading digit
        const first_digit = digits.__get_possible_element_at(digits.__get_number_of_elements() - 1).__decide(
            ($) => $,
            () => _p.unreachable_code_path() // index cannot be out of bounds
        )
        $i.add_character(48 + first_digit) // First digit

        // Add decimal point if we have more digits
        if ($p.digits > 1 && digits.__get_number_of_elements() > 1) {
            $i.add_character(46) // '.'

            // Add remaining digits in reverse order
            for (let j = digits.__get_number_of_elements() - 2; j >= 0; j--) {
                const digit = digits.__get_possible_element_at(j).__decide(
                    ($) => $,
                    () => _p.unreachable_code_path() // index cannot be out of bounds
                )
                $i.add_character(48 + digit)
            }
        }

        // Add exponent part
        $i.add_character(101) // 'e'
        if (exponent < 0) {
            $i.add_character(45) // '-'
            exponent = -exponent
        } else {
            $i.add_character(43) // '+'
        }

        // Convert exponent to string
        const exp_digits = _p.list.deprecated_build<number>(($i) => {
            if (exponent === 0) {
                $i['add element'](0)
            } else {
                do {
                    const digit = exponent % 10
                    $i['add element'](digit)
                    exponent = _p.integer.divide(exponent, 10, () => _p.unreachable_code_path())
                } while (exponent > 0)
            }
        })

        // Add exponent digits in reverse order
        for (let j = exp_digits.__get_number_of_elements() - 1; j >= 0; j--) {
            const digit = exp_digits.__get_possible_element_at(j).__decide(
                ($) => $,
                () => _p.unreachable_code_path() // index cannot be out of bounds
            )
            $i.add_character(48 + digit)
        }
    })
}