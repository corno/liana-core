import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/deserialize_resolved.js"
import type * as s_out from "../../../interface/schemas/prose.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Phrase
    >
}

//dependencies
import * as t_resolve_to_prose from "../resolve/prose.js"
import * as t_deserialize_to_prose from "../deserialize/prose.js"


export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize': return p_.option($, ($) => t_deserialize_to_prose.Error($))
            case 'resolve error': return p_.option($, ($) => t_resolve_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    })