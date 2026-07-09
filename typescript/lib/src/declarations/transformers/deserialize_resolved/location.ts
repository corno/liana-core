
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/data/deserialize_resolved.js"
import type * as d_out from "astn-core/interface/generated/liana/schemas/location/data"


export type Error = p_.Transformer<
    d_in.Error,
    d_out.Possible_Range
>

