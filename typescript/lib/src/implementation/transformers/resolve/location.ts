import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/resolve.js"
import type * as s_out from "../../../interface/schemas/location.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Range
    >
}

export const Error: declarations.Error = ($) => p_.from.state($.location).decide(
    ($) => {
        switch ($[0]) {
            case 'in main document': return p_.option($, ($) => $)
            case 'in subdocument': return p_.option($, ($) => $.context['range of include in main document'])
            default: return p_.exhaustive($[0])
        }
    })