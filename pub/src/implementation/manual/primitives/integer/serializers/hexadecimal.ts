import * as _p from 'pareto-core/dist/transformer'
import * as _ps from 'pareto-core/dist/serializer'

import * as signatures from "../../../../../interface/signatures"

export const $$: signatures.serializers.primitives.integer.hexadecimal = ($) => {
    return _ps.text.deprecated_build(($i) => {
        if ($ < 0) {
            $i.add_character(45) // '-'
            $ = -$
        }
        
        // Add "0x" prefix
        $i.add_character(48) // '0'
        $i.add_character(120) // 'x'
        
        const digits = _p.list.deprecated_build<number>(($i) => {
            do {
                const digit = $ % 16
                $i['add item'](digit)
                $ = _p.integer.divide($, 16, () => _p.unreachable_code_path())
            } while ($ > 0)

        })

        for (let j = digits.__get_number_of_items() - 1; j >= 0; j--) {
            const digit = digits.__get_possible_item_at(j).__decide(
                ($) => $,
                () => _p.unreachable_code_path() // index cannot be out of bounds
            )
            if (digit < 10) {
                $i.add_character(48 + digit) // '0'-'9'
            } else {
                $i.add_character(65 + digit - 10) // 'A'-'F'
            }
        }
    })
}