import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../../interface/declarations/transformers/resolve/location.js"

export const Error: interface_.Error = ($) => p_.from.state($.location).decide(
    ($) => {
        switch ($[0]) {
            case 'in main document': return p_.option($, ($) => $)
            case 'in subdocument': return p_.option($, ($) => $.context['range of include in main document'])
            default: return p_.exhaustive($[0])
        }
    })