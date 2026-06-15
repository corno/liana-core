import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_di from 'pareto-core/dist/data/interface'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_astn_unmarshall_to_fountain_pen from "astn-core/dist/implementation/manual/transformers/unmarshall/fountain_pen"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error: p_ti.Transformer<d_in.Error, d_out.Phrase> = ($) => sh.ph.composed([
    pt.decide.state($, ($) => {
        switch ($[0]) {
            case 'liana': return pt.ss($, ($) => sh.ph.composed([
                pt.decide.state($.type, ($) => {
                    switch ($[0]) {
                        case 'not a valid number': return pt.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("not a valid number, expected: '"),
                            sh.ph.literal($['expected format']),
                            sh.ph.literal("'")
                        ]))
                        case 'not a valid boolean': return pt.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("not a valid boolean, expected: '"),
                            sh.ph.literal($['expected format']),
                            sh.ph.literal("'")
                        ]))
                        case 'unknown option': return pt.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("unknown option: '"),
                            sh.ph.literal($),
                            sh.ph.literal("'")
                        ]))
                        case 'state': return pt.ss($, ($) => pt.decide.state($, ($) => {
                            switch ($[0]) {
                                case 'unknown option': return pt.ss($, ($) => sh.ph.composed([
                                    sh.ph.literal("unknown option: '"),
                                    sh.ph.literal($),
                                    sh.ph.literal("'")
                                ]))

                                default: return pt.au($[0])
                            }
                        }))
                        case 'dictionary': return pt.ss($, ($) => pt.decide.state($, ($) => {
                            switch ($[0]) {
                                case 'entry not set': return pt.ss($, ($) => sh.ph.composed([
                                    sh.ph.literal("entry not set: '"),
                                    sh.ph.literal($),
                                    sh.ph.literal("'")
                                ]))

                                default: return pt.au($[0])
                            }
                        }))
                        case 'type': return pt.ss($, ($) => pt.decide.state($, ($) => {
                            switch ($[0]) {
                                case 'property not set': return pt.ss($, ($) => sh.ph.composed([
                                    sh.ph.literal("property not set: '"),
                                    sh.ph.literal($),
                                    sh.ph.literal("'")
                                ]))
                                case 'missing property': return pt.ss($, ($) => sh.ph.composed([
                                    sh.ph.literal("missing property: '"),
                                    sh.ph.literal($),
                                    sh.ph.literal("'")
                                ]))
                                default: return pt.au($[0])
                            }
                        }))
                        default: return pt.au($[0])
                    }
                }),
            ]))
            case 'astn': return pt.ss($, ($) => t_astn_unmarshall_to_fountain_pen.Error($))
            default: return pt.au($[0])
        }
    }),

])

// export const Error = ($: d_in.Error): d_out.Phrase => pt.decide.state($, ($) => {
//     switch ($[0]) {

//         case 'expected a dictionary': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a dictionary")
//         ]))
//         case 'expected a group': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a group")
//         ]))
//         case 'expected a list': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a list")
//         ]))
//         case 'expected a nothing': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a nothing ( ~ )")
//         ]))
//         case 'expected an optional': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected an optional ( ~ or * -value- )")
//         ]))
//         case 'expected a state': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a state ( one of the allowed options )")
//         ]))
//         case 'expected a text': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a text")
//         ]))
//         case 'no such entry': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("no such entry: '"),
//             sh.ph.literal($),
//             sh.ph.literal("'")
//         ]))

//         default: return pt.au($[0])
//     }
// })