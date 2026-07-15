import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../interface/schemas/resolving.js"

namespace declarations {
    export type Error = p_.Phrase_Serializer<
        s_in.Error
    >
}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose_simple/deprecated"

export const Error: declarations.Error = ($) => sh.ph.composed([
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
                    sh.ph.composed(
                        p_.from.dictionary($).convert_to_list(
                            ($, id) => sh.ph.composed([
                                sh.ph.literal(" -"),
                                sh.ph.literal(id)
                            ]))
                    )
                ]))
                default: return p_.exhaustive($[0])
            }
        })
])