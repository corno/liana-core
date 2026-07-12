import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/deserialize_resolved.js"
import type * as s_out from "../../../interface/schemas/location.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Possible_Range
    >
}

//dependencies
import * as t_resolve_to_location from "../resolve/location.js"
import * as t_deserialize_to_location from "../deserialize/location.js"


export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize': return p_.option($, ($) => t_deserialize_to_location.Error($))
            case 'resolve error': return p_.option($, ($): s_out.Possible_Range => ['range', t_resolve_to_location.Error($)])
            default: return p_.exhaustive($[0])
        }
    })