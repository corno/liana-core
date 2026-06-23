import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/deserialize_resolved"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/location/data"

//dependencies
import * as t_resolve_to_location from "../resolve/location"
import * as t_deserialize_to_location from "../deserialize/location"


export const Error: p_i.Transformer<
d_in.Error, d_out.Possible_Range
> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize': return p_.ss($, ($) => t_deserialize_to_location.Error($))
            case 'resolve error': return p_.ss($, ($): d_out.Possible_Range => ['range', t_resolve_to_location.Error($)])
            default: return p_.au($[0])
        }
    })