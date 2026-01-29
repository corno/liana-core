import * as _p from 'pareto-core/dist/transformer'
import * as _ps from 'pareto-core/dist/serializer'
import { _p_unreachable_code_path } from 'pareto-core/dist/unreachable_code_path'

import * as signatures from "../../../../../interface/signatures"

export const $$: signatures.serializers.primitives.integer.octal = ($) => {
    return _ps.text.deprecated_build(($i) => {
        if ($ < 0) {
            $i.add_character(45) // '-'
            $ = -$
        }
        
        // Add "0o" prefix
        $i.add_character(48) // '0'
        $i.add_character(111) // 'o'
        
        const digits = _p.list.deprecated_build<number>(($i) => {
            do {
                const digit = $ % 8
                $i['add item'](digit)
                $ = _p.integer.divide($, 8, () => _p_unreachable_code_path())
            } while ($ > 0)

        })

        for (let j = digits.__get_number_of_items() - 1; j >= 0; j--) {
            const digit = digits.__deprecated_get_possible_item_at(j).__decide(
                ($) => $,
                () => _p_unreachable_code_path() // index cannot be out of bounds
            )
            $i.add_character(48 + digit) // '0'-'7'
        }
    })
}