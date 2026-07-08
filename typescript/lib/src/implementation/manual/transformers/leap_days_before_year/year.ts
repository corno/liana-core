import * as p_ from 'pareto-core/implementation/transformer'
import p_unreachable_code_path from 'pareto-core/implementation/transformer/specials/unreachable_code_path'

import type * as interface_ from "../../../../interface/declarations/transformers/leap_days_before_year/year.js"

export const Year: interface_.Year = ($) => {
    return + p_.from.number($).divide(
        4,
        ['towards zero', null],
        {
            divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 4")
        }
    )
        - p_.from.number($).divide(
            100,
            ['towards zero', null],
            {
                divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 100")
            }
        )
        + p_.from.number($).divide(
            400,
            ['towards zero', null],
            {
                divided_by_zero: () => p_unreachable_code_path("the divisor is hardcoded to 400")
            }
        )
}