import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/parse_tree/start_token_range.js"

//data types
import type * as d_out from "../../../interface/schemas/document_and_location.js"

//dependencies
import * as t_pt_to_str from "astn-core/implementation/transformers/parse_tree/start_token_range"


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