import * as p_ from 'pareto-core/interface/data'

import * as d_astn from "astn-core/interface/data/unmarshalled"
import * as d_parse_tree from "astn-core/interface/generated/liana/schemas/parse_tree/data"

export type Number = number


export type Boolean = boolean

export type Dictionary = {
    'value': d_parse_tree.Value;
    'entries': p_.Dictionary<d_parse_tree.Value>
}

export type List = d_astn.List

export type Nothing = null

export type Optional = d_astn.Optional

export type Property = d_parse_tree.Value

export type State = d_astn.State

export type Text = string

export type Verbose_Group = {
    'value': d_parse_tree.Value
    'properties': p_.Dictionary<d_parse_tree.Value>;
}