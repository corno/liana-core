import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../schemas/unresolved_document_deserialization.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
}

//dependencies
import * as api_astn_core from "astn-core/api"

import * as t_unmarshall_to_prose from "../../../value_unmarshalling/implementation/serializers/unmarshalling.js"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'parse tree deserialization': return p_.option($, ($) => api_astn_core.api.deserialization.serializers['parse tree deserialization'].Error($))
            case 'unmarshalling': return p_.option($, ($) => t_unmarshall_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    })