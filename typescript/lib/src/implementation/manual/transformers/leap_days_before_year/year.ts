import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'
import p_unreachable_code_path from 'pareto-core/dist/implementation/transformer/specials/unreachable_code_path'

export const Year: p_i.Transformer<number, number> = ($) => {
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