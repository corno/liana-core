
import * as d_resolve from "./resolve"
import * as d_deserialize from "astn-core/dist/interface/to_be_generated/deserialize"


export type Error =
    | ['deserialize', d_deserialize.Error]
    | ['resolve error', d_resolve.Error]

export type Parameters = d_deserialize.Parameters