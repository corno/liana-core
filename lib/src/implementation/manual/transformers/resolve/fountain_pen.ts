import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

import * as d_in from "../../../../interface/to_be_generated/resolve"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

export type Error = _pi.Transformer<d_in.Error, d_out.Phrase>

//dependencies
import * as t_loc_to_fountain_pen from "astn-core/dist/implementation/manual/transformers/location/fountain_pen"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error: Error = ($) => sh.ph.composed([
    _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'constraint': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'state': return _p.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("expected '"),
                        sh.ph.literal($.expected),
                        sh.ph.literal("' but found '"),
                        sh.ph.literal($.found),
                        sh.ph.literal("'"),
                    ]))
                    case 'optional value is not set': return _p.ss($, ($) => sh.ph.literal("expected parameter/optional value to be set"))
                    case 'same node': return _p.ss($, ($) => sh.ph.composed([
                        sh.ph.literal($),
                        sh.ph.literal(", not the same node")
                    ]))
                    default: return _p.au($[0])
                }
            }))
            case 'lookup': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'cycle detected': return _p.ss($, ($) => sh.ph.literal("cycle detected"))
                    case 'no such entry': return _p.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("no such entry: '"),
                        sh.ph.literal($),
                        sh.ph.literal("'")
                    ]))
                    case 'no context lookup': return _p.ss($, ($) => sh.ph.literal("there is is no context where this entry can be looked up"))
                    default: return _p.au($[0])
                }
            }))
            case 'missing required entries': return _p.ss($, ($) => sh.ph.composed([
                sh.ph.literal("missing required entries:"),
                sh.ph.indent(
                    sh.pg.sentences($.__to_list(($, id) => sh.sentence([
                        sh.ph.literal("- "),
                        sh.ph.literal(id)
                    ])))
                )
            ]))
            default: return _p.au($[0])
        }
    })
])