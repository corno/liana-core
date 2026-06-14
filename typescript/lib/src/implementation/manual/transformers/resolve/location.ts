import * as pt from 'pareto-core/dist/assign'
import * as p_di from 'pareto-core/dist/data/interface'
import * as p_ti from 'pareto-core/dist/transformer/interface'

import * as d_in from "../../../../interface/to_be_generated/resolve"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Error = p_ti.Transformer<d_in.Error, d_out.Range>

export const Error: Error = ($) => pt.decide.state($.location, ($) => {
    switch ($[0]) {
        case 'in main document': return pt.ss($, ($) => $)
        case 'in subdocument':return pt.ss($, ($) => $.context['range of include in main document'])
        default: return pt.au($[0])
    }
})