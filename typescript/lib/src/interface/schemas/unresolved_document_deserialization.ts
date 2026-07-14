
import type * as s_parse_tree_deserialization from "../../private_schemas/parse_tree_deserialization.js"
import type * as s_unmarshalling from "./unmarshalling.js"


export type Error_ = 
    | ['parse tree deserialization', s_parse_tree_deserialization.Error]
    | ['unmarshalling', s_unmarshalling.Error]

export type { 
    Error_ as Error, 
}

export type Parameters = s_parse_tree_deserialization.Parameters