import type * as s_astn_location from "astn-core/interface/data/location"

export type Subdocument = {
    readonly 'range of include in main document': s_astn_location.Range
    readonly 'subdocument resource identifier': string
}

export type Subdocument_Range = {
    readonly 'context': Subdocument
    readonly 'range': s_astn_location.Range
}

export type Range =
|['in main document', s_astn_location.Range]
|['in subdocument', Subdocument_Range]