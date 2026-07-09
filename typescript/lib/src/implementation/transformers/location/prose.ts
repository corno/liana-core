import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/location/prose.js"

//dependencies
import * as t_astn_location_to_prose from "astn-core/implementation/manual/transformers/location/prose"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Range: interface_.Range = ($, $p) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'in main document': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal($p['document resource identifier']),
                sh.ph.literal(':'),
                t_astn_location_to_prose.Range(
                    $,
                    {
                        'character location reporting': $p['character location reporting']
                    }
                )
            ]))
            case 'in subdocument': return p_.option($, ($) => sh.ph.composed([
                sh.ph.literal($.context['subdocument resource identifier']),
                sh.ph.literal(':'),
                t_astn_location_to_prose.Range(
                    $['range'],
                    {
                        'character location reporting': $p['character location reporting']
                    }
                )
            ]))
            default: return p_.exhaustive($[0])
        }
    })