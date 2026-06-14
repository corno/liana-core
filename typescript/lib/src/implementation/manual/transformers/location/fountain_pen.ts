import * as pt from 'pareto-core/dist/assign'
import * as p_di from 'pareto-core/dist/data/interface'
import p_list_from_text from 'pareto-core/dist/specials/list_from_text'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/document_and_location"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_function from "astn-core/dist/interface/to_be_generated/location_to_fountain_pen"
import * as d_temp_text from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

//dependencies
import * as t_astn_location_to_fountain_pen from "astn-core/dist/implementation/manual/transformers/location/fountain_pen"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export namespace signatures {
    // export type Location = p_ti.Transformer_With_Parameter<d_in.Location, d_out.Phrase, d_function.Old_Parameters>
    export type Range = p_ti.Transformer_With_Parameter<d_in.Range, d_out.Phrase, {
        'character location reporting': d_function.character_location_reporting
        'document resource identifier': string
    }>
    // export type Possible_Range = p_ti.Transformer_With_Parameter<d_in.Possible_Range, d_out.Phrase, d_function.Old_Parameters>
}

export const Range: signatures.Range = ($, $p) => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'in main document': return pt.ss($, ($) => sh.ph.composed([
            sh.ph.literal($p['document resource identifier']),
            sh.ph.literal(':'),
            t_astn_location_to_fountain_pen.Range(
                $,
                {
                    'character location reporting': $p['character location reporting']
                }
            )
        ]))
        case 'in subdocument': return pt.ss($, ($) => sh.ph.composed([
            sh.ph.literal($.context['subdocument resource identifier']),
            sh.ph.literal(':'),
            t_astn_location_to_fountain_pen.Range(
                $['range'],
                {
                    'character location reporting': $p['character location reporting']
                }
            )
        ]))
        default: return pt.au($[0])
    }
})