
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/document_and_location.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"
import type * as d_function from "astn-core/interface/data/location_to_prose"

//dependencies
import * as t_astn_location_to_prose from "astn-core/implementation/manual/transformers/location/prose"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"



export type Range = p_.Transformer_With_Parameter<
    d_in.Range,
    d_out.Phrase,
    {
        'character location reporting': d_function.character_location_reporting
        'document resource identifier': string
    }
>

