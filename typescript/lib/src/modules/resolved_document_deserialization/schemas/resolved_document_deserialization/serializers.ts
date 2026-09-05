import * as p_ from 'pareto-core/serializer'

//schemas
import type * as s_in from "./schema.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
}

//dependencies
import * as ser_resolving from "../resolving/serializers.js"
import * as ser_unresolved_document_deserialization from "../../../unresolved_document_deserialization/schemas/unresolved_document_deserialization/serializers.js"


export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'unresolved document deserialization': return p_.option($, ($) => ser_unresolved_document_deserialization.Error($))
            case 'resolving': return p_.option($, ($) => ser_resolving.Error($))
            default: return p_.exhaustive($[0])
        }
    })