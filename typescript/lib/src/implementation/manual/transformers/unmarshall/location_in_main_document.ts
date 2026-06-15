import * as pt from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/location/data"

export const Error: p_i.Transformer<d_in.Error, d_out.Range> = ($) => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'liana': return pt.ss($, ($): d_out.Range => pt.decide.state($.range, ($) => {
            switch ($[0]) {
                case 'in main document': return pt.ss($, ($) => $)
                case 'in subdocument': return pt.ss($, ($) => $.context['range of include in main document'])
                default: return pt.au($[0])
            }
        }))
        case 'astn': return pt.ss($, ($) => $.range)
        default: return pt.au($[0])
    }
})