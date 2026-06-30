import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_astn_unmarshall_to_fountain_pen from "astn-core/dist/implementation/manual/transformers/unmarshall/fountain_pen"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"

export const Error: p_i.Transformer<
d_in.Error, d_out.Phrase
> = ($) => sh.ph.composed([
    p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'liana': return p_.option($, ($) => sh.ph.composed([
                    p_.from.state($.type).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'not a valid number': return p_.option($, ($) => sh.ph.composed([
                                    sh.ph.literal("not a valid number, expected: '"),
                                    sh.ph.literal($['expected format']),
                                    sh.ph.literal("'")
                                ]))
                                case 'not a valid boolean': return p_.option($, ($) => sh.ph.composed([
                                    sh.ph.literal("not a valid boolean, expected: '"),
                                    sh.ph.literal($['expected format']),
                                    sh.ph.literal("'")
                                ]))
                                case 'unknown option': return p_.option($, ($) => sh.ph.composed([
                                    sh.ph.literal("unknown option: '"),
                                    sh.ph.literal($),
                                    sh.ph.literal("'")
                                ]))
                                case 'state': return p_.option($, ($) => p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'unknown option': return p_.option($, ($) => sh.ph.composed([
                                                sh.ph.literal("unknown option: '"),
                                                sh.ph.literal($),
                                                sh.ph.literal("'")
                                            ]))

                                            default: return p_.au($[0])
                                        }
                                    }))
                                case 'dictionary': return p_.option($, ($) => p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'entry not set': return p_.option($, ($) => sh.ph.composed([
                                                sh.ph.literal("entry not set: '"),
                                                sh.ph.literal($),
                                                sh.ph.literal("'")
                                            ]))

                                            default: return p_.au($[0])
                                        }
                                    }))
                                case 'type': return p_.option($, ($) => p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'property not set': return p_.option($, ($) => sh.ph.composed([
                                                sh.ph.literal("property not set: '"),
                                                sh.ph.literal($),
                                                sh.ph.literal("'")
                                            ]))
                                            case 'missing property': return p_.option($, ($) => sh.ph.composed([
                                                sh.ph.literal("missing property: '"),
                                                sh.ph.literal($),
                                                sh.ph.literal("'")
                                            ]))
                                            default: return p_.au($[0])
                                        }
                                    }))
                                default: return p_.au($[0])
                            }
                        }),
                ]))
                case 'astn': return p_.option($, ($) => t_astn_unmarshall_to_fountain_pen.Error($))
                default: return p_.au($[0])
            }
        }),

])

// export const Error = ($: d_in.Error): d_out.Phrase => p_.from.state($).decide(
// ($) => {
//     switch ($[0]) {

//         case 'expected a dictionary': return p_.option($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a dictionary")
//         ]))
//         case 'expected a group': return p_.option($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a group")
//         ]))
//         case 'expected a list': return p_.option($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a list")
//         ]))
//         case 'expected a nothing': return p_.option($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a nothing ( ~ )")
//         ]))
//         case 'expected an optional': return p_.option($, ($) => sh.ph.composed([
//             sh.ph.literal("expected an optional ( ~ or * -value- )")
//         ]))
//         case 'expected a state': return p_.option($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a state ( one of the allowed options )")
//         ]))
//         case 'expected a text': return p_.option($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a text")
//         ]))
//         case 'no such entry': return p_.option($, ($) => sh.ph.composed([
//             sh.ph.literal("no such entry: '"),
//             sh.ph.literal($),
//             sh.ph.literal("'")
//         ]))

//         default: return p_.au($[0])
//     }
// })