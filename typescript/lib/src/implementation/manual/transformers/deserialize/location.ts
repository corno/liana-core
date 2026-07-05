import * as p_ from 'pareto-core/implementation/transformer'
import * as p_i from 'pareto-core/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/deserialize.js"
import * as d_out from "astn-core/interface/generated/liana/schemas/location/data"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Possible_Range
    >
}

//dependencies
import * as t_deserialize_parse_tree_to_location from "astn-core/implementation/manual/transformers/deserialize_parse_tree/location"
import * as t_unmarshall_to_location from "../unmarshall/location_in_main_document.js"

export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'parse error': return p_.option($, ($) => t_deserialize_parse_tree_to_location.Error($))
            case 'unmarshall error': return p_.option($, ($) => ['range', t_unmarshall_to_location.Error($)])
            default: return p_.au($[0])
        }
    })