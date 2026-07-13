
import type * as s_resolve from "./resolving.js"
import type * as s_document_unmarshalling from "./document_unmarshalling.js"


export type Error =
    | ['document unmarshalling', s_document_unmarshalling.Error]
    | ['resolving', s_resolve.Error]

export type Parameters = s_document_unmarshalling.Parameters