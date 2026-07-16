import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../schemas/resolved_document_deserialization.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
}

//dependencies
import * as t_resolve_to_prose from "./resolving.js"
import * as t_deserialize_to_prose from "../../../unresolved_document_deserialization/implementation/serializers/unresolved_document_deserialization.js"


export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'unresolved document deserialization': return p_.option($, ($) => t_deserialize_to_prose.Error($))
            case 'resolving': return p_.option($, ($) => t_resolve_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    })