import * as _p from 'pareto-core/dist/assign'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_astn_unmarshall_to_fountain_pen from "astn-core/dist/implementation/manual/transformers/unmarshall/fountain_pen"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error = ($: d_in.Error): d_out.Phrase => sh.ph.composed([
    _p.decide.state($, ($) => {
        switch ($[0]) {
            case 'liana': return _p.ss($, ($) => sh.ph.composed([
                sh.ph.literal(`${$.range.start.relative['document resource identifier']}:${$.range.start.relative.line}:${$.range.start.relative.column}-${$.range.end.relative.line}:${$.range.end.relative.column} > `),
                _p.decide.state($.type, ($) => {
                    switch ($[0]) {
                        case 'not a valid number': return _p.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("not a valid number, expected: '"),
                            sh.ph.literal($['expected format']),
                            sh.ph.literal("'")
                        ]))
                        case 'not a valid boolean': return _p.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("not a valid boolean, expected: '"),
                            sh.ph.literal($['expected format']),
                            sh.ph.literal("'")
                        ]))
                        case 'unknown option': return _p.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("unknown option: '"),
                            sh.ph.literal($),
                            sh.ph.literal("'")
                        ]))
                        case 'state': return _p.ss($, ($) => _p.decide.state($, ($) => {
                            switch ($[0]) {
                                case 'unknown option': return _p.ss($, ($) => sh.ph.composed([
                                    sh.ph.literal("unknown option: '"),
                                    sh.ph.literal($),
                                    sh.ph.literal("'")
                                ]))

                                default: return _p.au($[0])
                            }
                        }))
                        case 'dictionary': return _p.ss($, ($) => _p.decide.state($, ($) => {
                            switch ($[0]) {
                                case 'entry not set': return _p.ss($, ($) => sh.ph.composed([
                                    sh.ph.literal("entry not set: '"),
                                    sh.ph.literal($),
                                    sh.ph.literal("'")
                                ]))

                                default: return _p.au($[0])
                            }
                        }))
                        case 'type': return _p.ss($, ($) => _p.decide.state($, ($) => {
                            switch ($[0]) {
                                case 'property not set': return _p.ss($, ($) => sh.ph.composed([
                                    sh.ph.literal("property not set: '"),
                                    sh.ph.literal($),
                                    sh.ph.literal("'")
                                ]))
                                case 'missing property': return _p.ss($, ($) => sh.ph.composed([
                                    sh.ph.literal("missing property: '"),
                                    sh.ph.literal($),
                                    sh.ph.literal("'")
                                ]))
                                default: return _p.au($[0])
                            }
                        }))
                        default: return _p.au($[0])
                    }
                }),
            ]))
            case 'astn': return _p.ss($, ($) => t_astn_unmarshall_to_fountain_pen.Error($))
            default: return _p.au($[0])
        }
    }),

])

// export const Error = ($: d_in.Error): d_out.Phrase => _p.decide.state($, ($) => {
//     switch ($[0]) {

//         case 'expected a dictionary': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a dictionary")
//         ]))
//         case 'expected a group': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a group")
//         ]))
//         case 'expected a list': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a list")
//         ]))
//         case 'expected a nothing': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a nothing ( ~ )")
//         ]))
//         case 'expected an optional': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected an optional ( ~ or * -value- )")
//         ]))
//         case 'expected a state': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a state ( one of the allowed options )")
//         ]))
//         case 'expected a text': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a text")
//         ]))
//         case 'no such entry': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("no such entry: '"),
//             sh.ph.literal($),
//             sh.ph.literal("'")
//         ]))

//         default: return _p.au($[0])
//     }
// })