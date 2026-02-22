import * as d_astn_unmarshall from "astn-core/dist/interface/to_be_generated/unmarshall"
import * as d_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Error =
    | readonly ['astn', d_astn_unmarshall.Error]
    | readonly ['liana', {
        'type':
        | readonly ['not a valid number', {
            'expected format': string
        }]
        | readonly ['not a valid boolean', {
            'expected format': string
        }]
        | readonly ['unknown option', string]
        'range': d_location.Range
    }]