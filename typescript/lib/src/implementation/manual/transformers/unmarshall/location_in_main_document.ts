import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/location/data"

export const Error: _pi.Transformer<d_in.Error, d_out.Range> = ($) => _p.decide.state($, ($) => {
    switch ($[0]) {
        case 'liana': return _p.ss($, ($): d_out.Range => _p.decide.state($.range, ($) => {
            switch ($[0]) {
                case 'in main document': return _p.ss($, ($) => $)
                case 'in subdocument': return _p.ss($, ($) => $.context['range of include in main document'])
                default: return _p.au($[0])
            }
        }))
        case 'astn': return _p.ss($, ($) => $.range)
        default: return _p.au($[0])
    }
})