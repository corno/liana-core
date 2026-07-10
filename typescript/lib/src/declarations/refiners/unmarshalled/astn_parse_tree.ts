
import type * as p_di from 'pareto-core/interface/data'
import type * as p_ from 'pareto-core/interface/refiner'

import type * as d_in from "astn-core/interface/data/parse_tree"
import type * as d_out from "../../../interface/data/unmarshalled.js"
import type * as d_function from "../../../interface/data/unmarshall.js"
import type * as d_function_loc from "../../../interface/data/document_and_location.js"

export type Number = p_.Refiner_With_Parameter<
    d_out.Number,
    d_function.Error,
    d_in.Value,
    {
        'type':
        | ['binary', null]
        | ['decimal', null]
        | ['fractional decimal', {
            'digits': number
        }]
        | ['hexadecimal', null]
        | ['iso date', null]
        | ['octal', null]
        | ['scientific notation', {
            'precision': number
        }]
        'subdocument context': p_di.Optional_Value<d_function_loc.Subdocument>
    }
>

export type Boolean = p_.Refiner_With_Parameter<
    d_out.Boolean,
    d_function.Error,
    d_in.Value,
    {
        'type':
        | ['true/false', null]
        'subdocument context': p_di.Optional_Value<d_function_loc.Subdocument>
    }
>


export type Dictionary = p_.Refiner_With_Parameter<
    d_out.Dictionary,
    d_function.Error,
    d_in.Value,
    {
        'subdocument context': p_di.Optional_Value<d_function_loc.Subdocument>
    }
>

export type List = p_.Refiner_With_Parameter<
    d_out.List,
    d_function.Error,
    d_in.Value,
    {
        'subdocument context': p_di.Optional_Value<d_function_loc.Subdocument>
    }
>

export type Nothing = p_.Refiner<
    d_out.Nothing,
    d_function.Error,
    d_in.Value
>

export type Optional = p_.Refiner<
    d_out.Optional,
    d_function.Error,
    d_in.Value
>

export type Property = p_.Refiner_With_Parameter<
    d_out.Property,
    d_function.Error,
    d_out.Verbose_Group,
    {
        'id': string
        'subdocument context': p_di.Optional_Value<d_function_loc.Subdocument>
    }
>

export type State = p_.Refiner<
    d_out.State,
    d_function.Error,
    d_in.Value
>

export type Text = p_.Refiner<
    d_out.Text,
    d_function.Error,
    d_in.Value
>

export type Verbose_Group = p_.Refiner_With_Parameter<
    d_out.Verbose_Group,
    d_function.Error,
    d_in.Value,
    {
        'expected properties': p_di.Dictionary<null>
        'subdocument context': p_di.Optional_Value<d_function_loc.Subdocument>
    }
>

