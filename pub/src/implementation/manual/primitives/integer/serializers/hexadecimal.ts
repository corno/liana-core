import * as _p from 'pareto-core/dist/assign'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'

import * as signatures from "../../../../../interface/signatures"

export const $$: signatures.serializers.primitives.integer.hexadecimal = ($) => {
    return _p_list_build_deprecated(($i) => {
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
                $ = _p.number.integer.divide($, 16, () => _p_unreachable_code_path("the divisor is hardcoded to 16"))
            } while ($ > 0)

        })

        for (let j = digits.__get_number_of_items() - 1; j >= 0; j--) {
            const digit = digits.__deprecated_get_item_at(
                j,
                () => _p_unreachable_code_path("index cannot be out of bounds")
            )
            if (digit < 10) {
                $i['add item'](48 + digit) // '0'-'9'
            } else {
                $i['add item'](65 + digit - 10) // 'A'-'F'
            }
        }
    })
}