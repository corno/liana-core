import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

//data types
import * as d_in from "../../../../interface/to_be_generated/location"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_function from "astn-core/dist/interface/to_be_generated/location_to_fountain_pen"
import * as d_temp_text from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

//dependencies
import * as t_astn_location_to_fountain_pen from "astn-core/dist/implementation/manual/transformers/location/fountain_pen"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"



export namespace signatures {
    // export type Location = _pi.Transformer_With_Parameter<d_in.Location, d_out.Phrase, d_function.Old_Parameters>
    export type Range = _pi.Transformer_With_Parameter<d_in.Range, d_out.Phrase, { 'character location reporting': d_function.character_location_reporting }>
    // export type Possible_Range = _pi.Transformer_With_Parameter<d_in.Possible_Range, d_out.Phrase, d_function.Old_Parameters>
}


const temp_serialize_number = (n: number): d_temp_text.List_of_Characters => {
    return _p_list_from_text(`${n}`, ($) => $)
}

export const Range: signatures.Range = ($, $p) => t_astn_location_to_fountain_pen.Range(
    $,
    {
        'document resource identifier': $['document resource identifier'],
        'character location reporting': $p['character location reporting']
    }
)