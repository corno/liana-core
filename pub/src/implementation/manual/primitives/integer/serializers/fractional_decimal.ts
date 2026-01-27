import * as _p from 'pareto-core/dist/transformer'
import * as _ps from 'pareto-core/dist/serializer'

import * as signatures from "../../../../../interface/signatures"

export const $$: signatures.serializers.primitives.integer.fractional_decimal = ($, $p) => {
    const fractionalDigits = $p['number of fractional digits']

    return _ps.text.from_list(
        _p.list.deprecated_build<number>(($i) => {
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
            const integerPart = _p.integer.divide(value, divisor, () => _p.unreachable_code_path())
            const fractionalPart = value % divisor

            // Generate integer part digits
            const integerDigits = _p.list.deprecated_build<number>(($i) => {
                let temp = integerPart
                if (temp === 0) {
                    $i['add item'](0)
                } else {
                    while (temp > 0) {
                        const digit = temp % 10
                        $i['add item'](digit)
                        temp = _p.integer.divide(temp, 10, () => _p.unreachable_code_path())
                    }
                }
            })

            // Add integer part (reverse order)
            for (let j = integerDigits.__get_number_of_items() - 1; j >= 0; j--) {
                $i['add item'](48 + integerDigits.__get_possible_item_at(j).__decide(
                    ($) => $,
                    () => _p.unreachable_code_path() // index cannot be out of bounds
                ))
            }

            // Add decimal point
            $i['add item'](46) // '.'

            // Generate fractional part digits
            const fractionalDigits_list = _p.list.deprecated_build<number>(($i) => {
                let temp = fractionalPart
                for (let i = 0; i < fractionalDigits; i++) {
                    const digit = temp % 10
                    $i['add item'](digit)
                    temp = _p.integer.divide(temp, 10, () => _p.unreachable_code_path())
                }
            })

            // Add fractional part (reverse order)
            for (let j = fractionalDigits_list.__get_number_of_items() - 1; j >= 0; j--) {
                $i['add item'](48 + fractionalDigits_list.__get_possible_item_at(j).__decide(
                    ($) => $,
                    () => _p.unreachable_code_path() // index cannot be out of bounds
                ))
            }
        }),
        ($) => $,
    )
}