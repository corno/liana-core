import * as _p from "pareto-core/dist/expression"

//data types
import * as d_in from "../../../../../interface/to_be_generated/deserialize"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/block/data"

//dependencies
import * as t_deserialize_parse_tree_to_fountain_pen from "astn-core/dist/implementation/manual/schemas/deserialize_parse_tree/transformers/fountain_pen"
import * as t_resolve_to_fountain_pen from "../../resolve/transformers/fountain_pen"
import * as t_unmarshall_to_fountain_pen from "astn-core/dist/implementation/manual/schemas/unmarshall/transformers/fountain_pen"

export const Error = ($: d_in.Error): d_out.Phrase => _p.decide.state($, ($) => {
    switch ($[0]) {

        case 'parse error': return _p.ss($, ($) => t_deserialize_parse_tree_to_fountain_pen.Error($, { 'position info': ['zero based', null] }))
        case 'unmarshall error': return _p.ss($, ($) => t_unmarshall_to_fountain_pen.Error($))
        case 'resolve error': return _p.ss($, ($) => t_resolve_to_fountain_pen.Error($))
        default: return _p.au($[0])
    }
})