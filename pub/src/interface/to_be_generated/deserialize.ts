import * as _pi from 'pareto-core/dist/interface'

import * as d_parse_result from "astn-core/dist/interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_unmarshall from "./unmarshall"


export type Error_ = 
    | ['parse error', d_parse_result.Error]
    | ['unmarshall error', d_unmarshall.Error]

export { 
    Error_ as Error, 
}
