import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/resolve.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >
}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Error: interface_.Error = ($) => sh.ph.composed([
    p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'constraint': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'state': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.literal("expected '"),
                                sh.ph.literal($.expected),
                                sh.ph.literal("' but found '"),
                                sh.ph.literal($.found),
                                sh.ph.literal("'"),
                            ]))
                            case 'optional value is not set': return p_.option($, ($) => sh.ph.literal("expected parameter/optional value to be set"))
                            case 'same node': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.literal($),
                                sh.ph.literal(", not the same node")
                            ]))
                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'lookup': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'cycle detected': return p_.option($, ($) => sh.ph.literal("cycle detected"))
                            case 'no such entry': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.literal("no such entry: '"),
                                sh.ph.literal($),
                                sh.ph.literal("'")
                            ]))
                            case 'no context lookup': return p_.option($, ($) => sh.ph.literal("there is is no context where this entry can be looked up"))
                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'missing required entries': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("missing required entries:"),
                    sh.ph.indent(
                        sh.pg.sentences(p_.from.dictionary($).convert_to_list(
                            ($, id) => sh.sentence([
                                sh.ph.literal("- "),
                                sh.ph.literal(id)
                            ])))
                    )
                ]))
                default: return p_.exhaustive($[0])
            }
        })
])