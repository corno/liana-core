
import type * as d_resolve from "./resolve.js"
import type * as d_deserialize from "./deserialize.js"


export type Error =
    | ['deserialize', d_deserialize.Error]
    | ['resolve error', d_resolve.Error]

export type Parameters = d_deserialize.Parameters