import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/deserialize_resolved"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/location/data"

//dependencies
import * as t_resolve_to_location from "../resolve/location"
import * as t_deserialize_to_location from "../deserialize/location"


export const Error: _pi.Transformer<d_in.Error, d_out.Range> = ($) => _p.decide.state($, ($) => {
    switch ($[0]) {
        case 'deserialize': return _p.ss($, ($) => t_deserialize_to_location.Error($))
        case 'resolve error': return _p.ss($, ($) => t_resolve_to_location.Error($))
        default: return _p.au($[0])
    }
})