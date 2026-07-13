import * as p_ from 'pareto-core/interface/schema'

import type * as s_doc_and_loc from "./document_and_location.js"

export type Parameters = {
    'subdocument context': p_.Optional_Value<s_doc_and_loc.Subdocument>
}