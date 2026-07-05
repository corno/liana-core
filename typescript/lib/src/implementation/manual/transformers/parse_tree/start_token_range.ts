import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/data/document_and_location"

export namespace d_function {
    export type Parameters = {
        'subdocument context': p_di.Optional_Value<d_out.Subdocument>
    }
}

export namespace interface_ {
    export type Value = p_i.Transformer_With_Parameter<
        d_in.Value,
        d_out.Range,
        d_function.Parameters
    >
}

//dependencies
import * as t_pt_to_str from "astn-core/dist/implementation/manual/transformers/parse_tree/start_token_range"


export const Value: interface_.Value = ($, $p) => {
    const x = t_pt_to_str.Value($)
    return p_.from.optional($p['subdocument context']).decide(
        ($): d_out.Range => ['in subdocument', {
            'context': $,
            'range': x,
        }],
        () => ['in main document', x]
    )
}