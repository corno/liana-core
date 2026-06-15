import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_di from 'pareto-core/dist/data/interface'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/deserialize"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/location/data"

//dependencies
import * as t_deserialize_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/deserialize_parse_tree/location"
import * as t_unmarshall_to_location from "../unmarshall/location_in_main_document"

export const Error: p_ti.Transformer<d_in.Error, d_out.Possible_Range> = ($) => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'parse error': return pt.ss($, ($) => t_deserialize_parse_tree_to_location.Error($))
        case 'unmarshall error': return pt.ss($, ($) => ['range', t_unmarshall_to_location.Error($)])
        default: return pt.au($[0])
    }
})