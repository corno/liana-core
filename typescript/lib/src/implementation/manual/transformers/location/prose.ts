import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/document_and_location.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"
import type * as d_function from "astn-core/interface/data/location_to_prose"

//dependencies
import * as t_astn_location_to_prose from "astn-core/implementation/manual/transformers/location/prose"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export namespace interface_ {

    export type Range = p_i.Transformer_With_Parameter<
        d_in.Range,
        d_out.Phrase,
        {
            'character location reporting': d_function.character_location_reporting
            'document resource identifier': string
        }
    >
}
import * as temp_interface_ from "../../../../interface/declarations/transformers/location/prose.js"

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