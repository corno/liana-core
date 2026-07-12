import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/parse_tree.js"
import type * as s_out from "../../../interface/schemas/document_and_location.js"
import type * as s_parameters from "../../../interface/schemas/parse_tree_to_start_token_range.js"

namespace declarations {
    export type Value = p_.Transformer_With_Parameter<
        s_in.Value,
        s_out.Range,
        s_parameters.Parameters
    >
}

//schemas

//dependencies
import * as t_pt_to_str from "astn-core/implementation/transformers/parse_tree/start_token_range"


export const Value: declarations.Value = ($, $p) => {
    const x = t_pt_to_str.Value($)
    return p_.from.optional($p['subdocument context']).decide(
        ($): s_out.Range => ['in subdocument', {
            'context': $,
            'range': x,
        }],
        () => ['in main document', x]
    )
}