import * as _pi from 'pareto-core/dist/interface'

import * as d_astn from "astn-core/dist/interface/to_be_generated/unmarshalled"
import * as d_parse_tree from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"

export type Number = number


export type Boolean = boolean

export type Dictionary = {
    'value': d_parse_tree.Value;
    'entries': _pi.Dictionary<d_parse_tree.Value>
}

export type List = d_astn.List

export type Nothing = null

export type Optional = d_astn.Optional

export type Property = d_parse_tree.Value

export type State = d_astn.State

export type Text = string

export type Verbose_Group = {
    'value': d_parse_tree.Value
    'properties': _pi.Dictionary<d_parse_tree.Value>;
}