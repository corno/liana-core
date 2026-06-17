import * as p_ from 'pareto-core/dist/interface/data'

import * as d_deserialized_parse_tree from "astn-core/dist/interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_unmarshall from "../data/unmarshall"


export type Error_ = 
    | ['parse error', d_deserialized_parse_tree.Error]
    | ['unmarshall error', d_unmarshall.Error]

export { 
    Error_ as Error, 
}

export type Parameters = d_deserialized_parse_tree.Parameters