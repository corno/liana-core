import * as _pi from 'pareto-core/dist/interface'

import * as d_astn_location from "astn-core/dist/interface/generated/liana/schemas/location/data"

export type Range = {
    'subdocument resource identifier': _pi.Optional_Value<string>,
    'start': d_astn_location.Location,
    'end': d_astn_location.Location
}