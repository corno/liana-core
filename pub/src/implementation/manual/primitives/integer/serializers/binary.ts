import * as _p from 'pareto-core/dist/expression'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'
import _p_text_build_deprecated from 'pareto-core/dist/_p_text_build_deprecated'

import * as signatures from "../../../../../interface/signatures"

export const $$: signatures.serializers.primitives.integer.binary = ($) => _p_text_build_deprecated(($i) => {
    if ($ < 0) {
        $i.add_character(45) // '-'
        $ = -$
    }

    // Add "0b" prefix
    $i.add_character(48) // '0'
    $i.add_character(98) // 'b'

    const digits = _p_list_build_deprecated<number>(($i) => {
        do {
            const digit = $ % 2
            $i['add item'](digit)
            $ = _p.integer.divide($, 2, () => _p_unreachable_code_path())
        } while ($ > 0)

    })

    for (let j = digits.__get_number_of_items() - 1; j >= 0; j--) {
        const digit = digits.__deprecated_get_possible_item_at(j).__decide(
            ($) => $,
            () => _p_unreachable_code_path()
        )
        $i.add_character(48 + digit) // '0'-'1'
    }
})