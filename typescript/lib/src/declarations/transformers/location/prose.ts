
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as s_in from "../../../interface/schemas/document_and_location.js"
import type * as s_out from "pareto-fountain-pen/interface/data/prose"
import type * as s_function from "astn-core/interface/data/location_to_prose"

export type Range = p_.Transformer_With_Parameter<
    s_in.Range,
    s_out.Phrase,
    {
        'character location reporting': s_function.character_location_reporting
        'document resource identifier': string
    }
>

