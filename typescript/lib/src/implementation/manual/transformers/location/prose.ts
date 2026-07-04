import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/document_and_location"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_function from "astn-core/dist/interface/data/location_to_fountain_pen"

//dependencies
import * as t_astn_location_to_prose from "astn-core/dist/implementation/manual/transformers/location/fountain_pen"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"

export namespace signatures {

    export type Range = p_i.Transformer_With_Parameter<
        d_in.Range,
        d_out.Phrase,
        {
            'character location reporting': d_function.character_location_reporting
            'document resource identifier': string
        }
    >
}

export const Range: signatures.Range = ($, $p) => p_.from.state($).decide(
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
            default: return p_.au($[0])
        }
    })