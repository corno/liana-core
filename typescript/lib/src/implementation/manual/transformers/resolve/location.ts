import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/resolve.js"
import type * as d_out from "astn-core/interface/generated/liana/schemas/location/data"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Range
    >
}
import * as temp_interface_ from "../../../../interface/declarations/transformers/resolve/location.js"

export const Error: interface_.Error = ($) => p_.from.state($.location).decide(
    ($) => {
        switch ($[0]) {
            case 'in main document': return p_.option($, ($) => $)
            case 'in subdocument': return p_.option($, ($) => $.context['range of include in main document'])
            default: return p_.exhaustive($[0])
        }
    })