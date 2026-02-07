import * as _p from 'pareto-core/dist/assign'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'

import * as signatures from "../../../../../interface/signatures"

export const $$: signatures.serializers.primitives.integer.fractional_decimal = ($, $p) => {
    const fractionalDigits = $p['number of fractional digits']

    return _p_list_build_deprecated<number>(($i) => {
        let value = $

        // Handle negative numbers
        if (value < 0) {
            $i['add item'](45) // '-'
            value = -value
        }

        // Calculate the divisor for the fractional part (10^fractionalDigits)
        let divisor = 1
        for (let i = 0; i < fractionalDigits; i++) {
            divisor *= 10
        }

        // Split into integer and fractional parts
        const integerPart = _p.number.integer.divide(value, divisor, () => _p_unreachable_code_path("the divisor is hardcoded to 10^fractionalDigits"))
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
                    temp = _p.number.integer.divide(temp, 10, () => _p_unreachable_code_path("the divisor is hardcoded to 10"))
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
            for (let i = 0; i < fractionalDigits; i++) {
                const digit = temp % 10
                $i['add item'](digit)
                temp = _p.number.integer.divide(temp, 10, () => _p_unreachable_code_path("the divisor is hardcoded to 10"))
            }
        })

        // Add fractional part (reverse order)
        for (let j = fractionalDigits_list.__get_number_of_items() - 1; j >= 0; j--) {
            $i['add item'](48 + fractionalDigits_list.__deprecated_get_possible_item_at(j).__decide(
                ($) => $,
                () => _p_unreachable_code_path("index cannot be out of bounds")
            ))
        }
    })
}