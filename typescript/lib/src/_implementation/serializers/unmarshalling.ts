import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../interface/schemas/unmarshalling.js"

namespace declarations {
    export type Error = p_.Phrase_Serializer<
        s_in.Error
    >
}

//dependencies
import * as api_astn_core from "astn-core/api"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Error: declarations.Error = ($) => sh.ph.composed([
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

                                            default: return p_.exhaustive($[0])
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

                                            default: return p_.exhaustive($[0])
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
                                            default: return p_.exhaustive($[0])
                                        }
                                    }))
                                default: return p_.exhaustive($[0])
                            }
                        }),
                ]))
                case 'astn value unmarshalling': return p_.option($, ($) => api_astn_core.api.serializers['value unmarshalling'].Error($))
                default: return p_.exhaustive($[0])
            }
        }),

])