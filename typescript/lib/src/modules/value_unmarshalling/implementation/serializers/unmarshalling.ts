import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../schemas/unmarshalling.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
}

//dependencies
import * as api_astn_core from "astn-core/api"

export const Error: declarations.Error = ($) => p_.ph.composed([
    p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'liana': return p_.option($, ($) => p_.ph.composed([
                    p_.from.state($.type).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'not a valid number': return p_.option($, ($) => p_.ph.composed([
                                    p_.ph.literal("not a valid number, expected: '"),
                                    p_.ph.literal($['expected format']),
                                    p_.ph.literal("'")
                                ]))
                                case 'not a valid boolean': return p_.option($, ($) => p_.ph.composed([
                                    p_.ph.literal("not a valid boolean, expected: '"),
                                    p_.ph.literal($['expected format']),
                                    p_.ph.literal("'")
                                ]))
                                case 'unknown option': return p_.option($, ($) => p_.ph.composed([
                                    p_.ph.literal("unknown option: '"),
                                    p_.ph.literal($),
                                    p_.ph.literal("'")
                                ]))
                                case 'state': return p_.option($, ($) => p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'unknown option': return p_.option($, ($) => p_.ph.composed([
                                                p_.ph.literal("unknown option: '"),
                                                p_.ph.literal($),
                                                p_.ph.literal("'")
                                            ]))

                                            default: return p_.exhaustive($[0])
                                        }
                                    }))
                                case 'dictionary': return p_.option($, ($) => p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'entry not set': return p_.option($, ($) => p_.ph.composed([
                                                p_.ph.literal("entry not set: '"),
                                                p_.ph.literal($),
                                                p_.ph.literal("'")
                                            ]))

                                            default: return p_.exhaustive($[0])
                                        }
                                    }))
                                case 'type': return p_.option($, ($) => p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'property not set': return p_.option($, ($) => p_.ph.composed([
                                                p_.ph.literal("property not set: '"),
                                                p_.ph.literal($),
                                                p_.ph.literal("'")
                                            ]))
                                            case 'missing property': return p_.option($, ($) => p_.ph.composed([
                                                p_.ph.literal("missing property: '"),
                                                p_.ph.literal($),
                                                p_.ph.literal("'")
                                            ]))
                                            default: return p_.exhaustive($[0])
                                        }
                                    }))
                                default: return p_.exhaustive($[0])
                            }
                        }),
                ]))
                case 'astn value unmarshalling': return p_.option($, ($) => api_astn_core.api.unmarshalling.serializers['value unmarshalling'].Error($))
                default: return p_.exhaustive($[0])
            }
        }),

])