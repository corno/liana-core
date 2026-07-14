import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/unmarshalling.js"
import type * as s_out from "../../../interface/schemas/location.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Range
    >
}


export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'liana': return p_.ss($, ($) => $.range)
            case 'astn value unmarshalling': return p_.ss($, ($) => $.range)
            default: return p_.exhaustive($[0])
        }
    })