import * as _p from 'pareto-core/dist/assign'

import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

import * as signatures from "../../../../../interface/signatures"

export const serialize: signatures.serializers.primitives.integer.decimal = ($) => _p_list_build_deprecated(($i) => {
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
})