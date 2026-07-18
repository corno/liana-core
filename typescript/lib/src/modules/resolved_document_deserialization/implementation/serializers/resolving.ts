import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../schemas/resolving.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
}

export const Error: declarations.Error = ($) => p_.ph.composed([
    p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'constraint': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'state': return p_.option($, ($) => p_.ph.composed([
                                p_.ph.literal("expected '"),
                                p_.ph.literal($.expected),
                                p_.ph.literal("' but found '"),
                                p_.ph.literal($.found),
                                p_.ph.literal("'"),
                            ]))
                            case 'optional value is not set': return p_.option($, ($) => p_.ph.literal("expected parameter/optional value to be set"))
                            case 'same node': return p_.option($, ($) => p_.ph.composed([
                                p_.ph.literal($),
                                p_.ph.literal(", not the same node")
                            ]))
                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'lookup': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'cycle detected': return p_.option($, ($) => p_.ph.literal("cycle detected"))
                            case 'no such entry': return p_.option($, ($) => p_.ph.composed([
                                p_.ph.literal("no such entry: '"),
                                p_.ph.literal($),
                                p_.ph.literal("'")
                            ]))
                            case 'no context lookup': return p_.option($, ($) => p_.ph.literal("there is is no context where this entry can be looked up"))
                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'missing required entries': return p_.option($, ($) => p_.ph.composed([
                    p_.ph.literal("missing required entries:"),
                    p_.ph.list(
                        p_.from.dictionary($).convert_to_list(
                            ($, id) => p_.ph.composed([
                                p_.ph.literal(" -"),
                                p_.ph.literal(id)
                            ])
                        )
                    )
                ]))
                default: return p_.exhaustive($[0])
            }
        })
])