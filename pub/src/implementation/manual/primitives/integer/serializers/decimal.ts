import * as _p from 'pareto-core/dist/transformer'
import * as _ps from 'pareto-core/dist/serializer'
import { _p_unreachable_code_path } from 'pareto-core/dist/unreachable_code_path'

import * as signatures from "../../../../../interface/signatures"

export const serialize: signatures.serializers.primitives.integer.decimal = ($) => _ps.text.deprecated_build(($i) => {
    if ($ < 0) {
        $i.add_character(45) // '-'
        $ = -$
    }
    const digits = _p.list.deprecated_build<number>(($i) => {
        do {
            const digit = $ % 10
            $i['add item'](digit)
            $ = _p.integer.divide($, 10, () => _p_unreachable_code_path())
        } while ($ > 0)

    })

    for (let j = digits.__get_number_of_items() - 1; j >= 0; j--) {
        $i.add_character(48 + digits.__deprecated_get_item_at(
            j,
            () => _p_unreachable_code_path() // index cannot be out of bounds
        ))
    }
})