import * as pt from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/to_be_generated/deserialize_resolved"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_resolve_to_fountain_pen from "../resolve/fountain_pen"
import * as t_deserialize_to_fountain_pen from "../deserialize/fountain_pen"


export const Error: p_i.Transformer<d_in.Error, d_out.Phrase> = ($) => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'deserialize': return pt.ss($, ($) => t_deserialize_to_fountain_pen.Error($))
        case 'resolve error': return pt.ss($, ($) => t_resolve_to_fountain_pen.Error($))
        default: return pt.au($[0])
    }
})