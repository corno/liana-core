import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

import * as d_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/to_be_generated/document_and_location"

import * as t_pt_to_str from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"


export const Value: _pi.Transformer_With_Parameter<d_in.Value, d_out.Range, { 'subdocument context': _pi.Optional_Value<d_out.Subdocument> }> = ($, $p) => {
    const x = t_pt_to_str.Value($)
    return $p['subdocument context'].__decide(
        ($): d_out.Range => ['in subdocument', {
            'context': $,
            'range': x,
        }],
        () => ['in main document', x]
    )
}