import * as d_parse_result from "astn-core/dist/interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_resolve from "./resolve"
import * as d_unmarshall from "astn-core/dist/interface/to_be_generated/unmarshall"


export type Error =
    | ['parse error', d_parse_result.Error]
    | ['unmarshall error', d_unmarshall.Error]
    | ['resolve error', d_resolve.Error]