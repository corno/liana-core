
import type * as d_deserialized_parse_tree from "astn-core/interface/generated/liana/schemas/deserialize_parse_tree/data"
import type * as d_unmarshall from "../data/unmarshall.js"


export type Error_ = 
    | ['parse error', d_deserialized_parse_tree.Error]
    | ['unmarshall error', d_unmarshall.Error]

export type { 
    Error_ as Error, 
}

export type Parameters = d_deserialized_parse_tree.Parameters