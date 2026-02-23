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
        | ['state', State_Error]
        | ['dictionary', Dictionary_Error]
        | ['type', Type_Error]

        'range': d_location.Range
    }]



export type State_Error =
    | ['unknown option', string]

export type Dictionary_Error =
    | ['entry not set', string]


export type Type_Error = 
    | ['property not set', string]
    | ['missing property', string]
