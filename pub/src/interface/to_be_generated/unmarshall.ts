import * as d_astn_unmarshall from "astn-core/dist/interface/to_be_generated/unmarshall"
import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Error =
    | readonly ['astn', d_astn_unmarshall.Error]
    | readonly ['liana', {
        'type':
        | readonly ['not a valid number', string]
        | readonly ['not a valid boolean', null]
        | readonly ['unknown option', null]
        'range': d_location.Range
    }]