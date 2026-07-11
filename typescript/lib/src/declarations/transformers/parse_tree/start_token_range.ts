
import type * as p_di from 'pareto-core/interface/data'
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as s_in from "astn-core/interface/data/parse_tree"
import type * as s_out from "../../../interface/schemas/document_and_location.js"

export namespace s_function {
    export type Parameters = {
        'subdocument context': p_di.Optional_Value<s_out.Subdocument>
    }
}


export type Value = p_.Transformer_With_Parameter<
    s_in.Value,
    s_out.Range,
    s_function.Parameters
>

