
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/deserialize_resolved.js"
import type * as d_out from "astn-core/interface/generated/liana/schemas/location/data"


    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Possible_Range
    >

