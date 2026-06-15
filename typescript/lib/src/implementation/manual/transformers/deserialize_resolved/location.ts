import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_di from 'pareto-core/dist/data/interface'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/deserialize_resolved"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/location/data"

//dependencies
import * as t_resolve_to_location from "../resolve/location"
import * as t_deserialize_to_location from "../deserialize/location"


export const Error: p_ti.Transformer<d_in.Error, d_out.Possible_Range> = ($) => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'deserialize': return pt.ss($, ($) => t_deserialize_to_location.Error($))
        case 'resolve error': return pt.ss($, ($): d_out.Possible_Range => ['range', t_resolve_to_location.Error($)])
        default: return pt.au($[0])
    }
})