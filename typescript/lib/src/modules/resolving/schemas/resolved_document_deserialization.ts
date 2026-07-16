
import type * as s_resolve from "./resolving.js"
import type * as s_unresolved_document_deserialization from "../../unresolved_document_deserialization/schemas/unresolved_document_deserialization.js"


export type Error =
    | ['unresolved document deserialization', s_unresolved_document_deserialization.Error]
    | ['resolving', s_resolve.Error]

export type Parameters = s_unresolved_document_deserialization.Parameters