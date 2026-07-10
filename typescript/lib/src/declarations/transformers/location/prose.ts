
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/data/document_and_location.js"
import type * as d_out from "pareto-fountain-pen/interface/data/prose"
import type * as d_function from "astn-core/interface/data/location_to_prose"

export type Range = p_.Transformer_With_Parameter<
    d_in.Range,
    d_out.Phrase,
    {
        'character location reporting': d_function.character_location_reporting
        'document resource identifier': string
    }
>

