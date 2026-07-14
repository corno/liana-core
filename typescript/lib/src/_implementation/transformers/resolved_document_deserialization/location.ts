import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/resolved_document_deserialization.js"
import type * as s_out from "../../../interface/schemas/location.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Possible_Range
    >
}

//dependencies
import * as t_deserialize_to_location from "../unresolved_document_deserialization/location.js"


export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'unresolved document deserialization': return p_.option($, ($) => t_deserialize_to_location.Error($))
            case 'resolving': return p_.option($, ($): s_out.Possible_Range => ['range', $.location])
            default: return p_.exhaustive($[0])
        }
    })