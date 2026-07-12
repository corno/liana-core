import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/document_and_location.js"
import type * as s_out from "../../../interface/schemas/prose.js"
import type * as s_parameters from "../../../interface/schemas/astn_location_to_prose.js"

namespace declarations {
    export type Range = p_.Transformer_With_Parameter<
        s_in.Range,
        s_out.Phrase,
        {
        'character location reporting': s_parameters.character_location_reporting
        'document resource identifier': string
    }
    >
}

//dependencies
import * as t_astn_location_to_prose from "astn-core/implementation/transformers/location/prose"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Range: declarations.Range = ($, $p) => p_.from.state($).decide(
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