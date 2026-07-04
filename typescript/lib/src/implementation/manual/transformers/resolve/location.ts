import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

import * as d_in from "../../../../interface/data/resolve"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Error = p_i.Transformer<
    d_in.Error,
    d_out.Range
>

export const Error: Error = ($) => p_.from.state($.location).decide(
    ($) => {
        switch ($[0]) {
            case 'in main document': return p_.option($, ($) => $)
            case 'in subdocument': return p_.option($, ($) => $.context['range of include in main document'])
            default: return p_.au($[0])
        }
    })