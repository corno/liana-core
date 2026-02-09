import * as _p from 'pareto-core/dist/assign'

//data types
import * as d_in from "../../../../../interface/to_be_generated/deserialize_resolved"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_resolve_to_fountain_pen from "../../resolve/transformers/fountain_pen"
import * as t_deserialize_to_fountain_pen from "../../deserialize/transformers/fountain_pen"

export const Error = ($: d_in.Error): d_out.Phrase => _p.decide.state($, ($) => {
    switch ($[0]) {

        case 'deserialize': return _p.ss($, ($) => t_deserialize_to_fountain_pen.Error($))
        case 'resolve error': return _p.ss($, ($) => t_resolve_to_fountain_pen.Error($))
        default: return _p.au($[0])
    }
})