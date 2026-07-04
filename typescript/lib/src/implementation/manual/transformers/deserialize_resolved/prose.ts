import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/deserialize_resolved"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_resolve_to_fountain_pen from "../resolve/prose"
import * as t_deserialize_to_fountain_pen from "../deserialize/prose"


export const Error: p_i.Transformer<
d_in.Error, d_out.Phrase
> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize': return p_.option($, ($) => t_deserialize_to_fountain_pen.Error($))
            case 'resolve error': return p_.option($, ($) => t_resolve_to_fountain_pen.Error($))
            default: return p_.au($[0])
        }
    })