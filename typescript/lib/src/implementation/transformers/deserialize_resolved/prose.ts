import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/deserialize_resolved/prose.js"

//dependencies
import * as t_resolve_to_prose from "../resolve/prose.js"
import * as t_deserialize_to_prose from "../deserialize/prose.js"


export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize': return p_.option($, ($) => t_deserialize_to_prose.Error($))
            case 'resolve error': return p_.option($, ($) => t_resolve_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    })