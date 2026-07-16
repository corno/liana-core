import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../../unresolved_document_deserialization/schemas/unresolved_document_deserialization.js"
import type * as s_out from "../../../schemas/location.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Possible_Range
    >
}

//dependencies
import * as api_astn_core from "astn-core/api"
import * as t_unmarshalling_to_location from "../../../../value_unmarshalling/implementation/transformers/unmarshalling/location.js"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'parse tree deserialization': return p_.option($, ($) => api_astn_core.api.deserialization.transformers['parse tree deserialization'].location.Error($))
            case 'unmarshalling': return p_.option($, ($) => ['range', t_unmarshalling_to_location.Error($)])
            default: return p_.exhaustive($[0])
        }
    })