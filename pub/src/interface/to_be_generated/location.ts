import * as d_astn_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Range = {
    'document resource identifier': string,
    'start': d_astn_location.Location,
    'end': d_astn_location.Location
}