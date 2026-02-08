import * as _p from 'pareto-core/dist/assign'

import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'

import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

import * as signatures from "../../../../../interface/signatures"

export const $$: signatures.serializers.primitives.integer.octal = ($) => {
    return _p_list_build_deprecated(($i) => {
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
    })
}