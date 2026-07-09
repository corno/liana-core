import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/unmarshall/location_in_main_document.js"

export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'liana': return p_.option($, ($) => p_.from.state($.range).decide(
                ($) => {
                    switch ($[0]) {
                        case 'in main document': return p_.option($, ($) => $)
                        case 'in subdocument': return p_.option($, ($) => $.context['range of include in main document'])
                        default: return p_.exhaustive($[0])
                    }
                }))
            case 'astn': return p_.option($, ($) => $.range)
            default: return p_.exhaustive($[0])
        }
    })