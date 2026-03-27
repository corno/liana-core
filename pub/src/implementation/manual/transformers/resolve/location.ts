import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

import * as d_in from "../../../../interface/to_be_generated/resolve"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Error = _pi.Transformer<d_in.Error, d_out.Range>

export const Error: Error = ($) => _p.decide.state($.location, ($) => {
    switch ($[0]) {
        case 'in main document': return _p.ss($, ($) => $)
        case 'in subdocument':return _p.ss($, ($) => $.context['range of include in main document'])
        default: return _p.au($[0])
    }
})