import * as p_ from 'pareto-core/interface/schema'

import type * as s_astn from "../interface/schemas/astn_unmarshalled_value.js"
import type * as s_parse_tree from "../interface/schemas/parse_tree.js"

export type Number = number


export type Boolean = boolean

export type Dictionary = {
    'value': s_parse_tree.Value;
    'entries': p_.Dictionary<s_parse_tree.Value>
}

export type List = s_astn.List

export type Nothing = null

export type Optional = s_astn.Optional

export type Property = s_parse_tree.Value

export type State = s_astn.State

export type Text = string

export type Verbose_Group = {
    'value': s_parse_tree.Value
    'properties': p_.Dictionary<s_parse_tree.Value>;
}