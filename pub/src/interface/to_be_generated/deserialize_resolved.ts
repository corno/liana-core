
import * as d_resolve from "./resolve"
import * as d_deserialize from "./deserialize"


export type Error =
    | ['deserialize', d_deserialize.Error]
    | ['resolve error', d_resolve.Error]

export type Parameters = d_deserialize.Parameters