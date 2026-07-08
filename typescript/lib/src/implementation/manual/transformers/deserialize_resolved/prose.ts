import * as p_ from 'pareto-core/implementation/transformer'
import * as p_i from 'pareto-core/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/deserialize_resolved.js"
import * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >
}

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