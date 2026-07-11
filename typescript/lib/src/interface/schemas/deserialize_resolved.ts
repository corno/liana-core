
import type * as s_resolve from "./resolve.js"
import type * as s_deserialize from "./deserialize.js"


export type Error =
    | ['deserialize', s_deserialize.Error]
    | ['resolve error', s_resolve.Error]

export type Parameters = s_deserialize.Parameters