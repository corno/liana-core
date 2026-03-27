import * as _pi from 'pareto-core/dist/interface'

import * as d_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/to_be_generated/location"

import * as t_pt_to_str from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"


export const Value: _pi.Transformer_With_Parameter<d_in.Value, d_out.Range, { 'subdocument resource identifier': _pi.Optional_Value<string> }> = ($, $p) => {
    const x = t_pt_to_str.Value($)
    return {
        'subdocument resource identifier': $p['subdocument resource identifier'],
        'start': x.start,
        'end': x.end,
    }
}