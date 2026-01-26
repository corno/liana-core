import * as _p from 'pareto-core/dist/transformer'
import * as _ps from 'pareto-core/dist/serializer'

import * as signatures from "../../../../../interface/signatures"

export const $$: signatures.serializers.primitives.integer.binary = ($) => _ps.text.deprecated_build(($i) => {
    if ($ < 0) {
        $i.add_character(45) // '-'
        $ = -$
    }

    // Add "0b" prefix
    $i.add_character(48) // '0'
    $i.add_character(98) // 'b'

    const digits = _p.list.deprecated_build<number>(($i) => {
        do {
            const digit = $ % 2
            $i['add element'](digit)
            $ = _p.integer.divide($, 2, () => _p.unreachable_code_path())
        } while ($ > 0)

    })

    for (let j = digits.__get_number_of_elements() - 1; j >= 0; j--) {
        const digit = digits.__get_possible_element_at(j).__decide(
            ($) => $,
            () => _p.unreachable_code_path()
        )
        $i.add_character(48 + digit) // '0'-'1'
    }
})