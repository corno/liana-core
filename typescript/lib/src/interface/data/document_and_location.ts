import type * as d_astn_location from "astn-core/interface/data/location"

export type Subdocument = {
    readonly 'range of include in main document': d_astn_location.Range
    readonly 'subdocument resource identifier': string
}

export type Subdocument_Range = {
    readonly 'context': Subdocument
    readonly 'range': d_astn_location.Range
}

export type Range =
|['in main document', d_astn_location.Range]
|['in subdocument', Subdocument_Range]