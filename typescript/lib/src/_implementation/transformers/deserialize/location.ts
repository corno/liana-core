// import * as p_ from 'pareto-core/implementation/transformer'

// //schemas
// import type * as s_in from "../../../private_schemas/deserialization.js"
// import type * as s_out from "../../../private_schemas/location.js"

// namespace declarations {
//     export type Error = p_.Transformer<
//         s_in.Error,
//         s_out.Possible_Range
//     >
// }

// //dependencies
// import * as api_astn_core from "astn-core/api"
// import * as t_unmarshall_to_location from "../unmarshall/location_in_main_document.js"

// export const Error: declarations.Error = ($) => p_.from.state($).decide(
//     ($) => {
//         switch ($[0]) {
//             case 'parse error': return p_.option($, ($) => api_astn_core.api.transformers['parse tree deserialization'].location.Error($))
//             case 'unmarshall error': return p_.option($, ($) => ['range', t_unmarshall_to_location.Error($)])
//             default: return p_.exhaustive($[0])
//         }
//     })