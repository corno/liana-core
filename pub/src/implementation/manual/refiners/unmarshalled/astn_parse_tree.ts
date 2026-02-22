import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_cc from 'pareto-core/dist/_p_change_context'

import * as d_in from "astn-core/dist/interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/to_be_generated/unmarshalled"
import * as d_function from "../../../../interface/to_be_generated/unmarshall"

//dependencies
import * as t_parse_tree_to_location from "astn-core/dist/implementation/manual/transformers/parse_tree/location"
import * as r_astn_unmarshalled_from_parse_tree from "astn-core/dist/implementation/manual/refiners/unmarshalled/parse_tree"
import * as t_from_loc from "../primitives/list_of_characters"

export type Number = _pi.Refiner_With_Parameter<
    d_out.Number,
    d_function.Error,
    d_in.Value,
    {
        'type':
        | ['decimal', null]
    }
>

export type Boolean = _pi.Refiner_With_Parameter<
    d_out.Boolean,
    d_function.Error,
    d_in.Value,
    {
        'type':
        | ['true/false', null]
    }
>


export type Dictionary = _pi.Refiner<
    d_out.Dictionary,
    d_function.Error,
    d_in.Value
>

export type List = _pi.Refiner<
    d_out.List,
    d_function.Error,
    d_in.Value
>

export type Nothing = _pi.Refiner<
    d_out.Nothing,
    d_function.Error,
    d_in.Value
>

export type Optional = _pi.Refiner<
    d_out.Optional,
    d_function.Error,
    d_in.Value
>

export type Property = _pi.Refiner_With_Parameter<
    d_out.Property,
    d_function.Error,
    d_out.Verbose_Group,
    {
        'id': string
    }
>

export type State = _pi.Refiner<
    d_out.State,
    d_function.Error,
    d_in.Value
>

export type Text = _pi.Refiner<
    d_out.Text,
    d_function.Error,
    d_in.Value
>

export type Verbose_Group = _pi.Refiner_With_Parameter<
    d_out.Verbose_Group,
    d_function.Error,
    d_in.Value,
    {
        'expected properties': _pi.Dictionary<null>
    }
>

export const Number: Number = ($, abort) => {
    const value = $

    const as_loc = _p_list_from_text(
        r_astn_unmarshalled_from_parse_tree.Text(
            $,
            ($) => abort(['astn', $])
        ).value,
        ($) => $
    )

    return t_from_loc.decimal(
        as_loc,
        ($) => abort(['liana', {
            'type': ['not a valid number', {
                'expected format': "-?(0|[1-9][0-9]*)"
            }],
            range: t_parse_tree_to_location.Value(value)
        }]),
    )
}

export const Boolean: Boolean = ($, abort) => {
    const value = $

    const as_loc = _p_list_from_text(
        r_astn_unmarshalled_from_parse_tree.Text(
            $,
            ($) => abort(['astn', $])
        ).value,
        ($) => $
    )

    return t_from_loc.true_false(
        as_loc,
        ($) => abort(['liana', {
            'type': ['not a valid boolean', {
                'expected format': "true|false"
            }],
            range: t_parse_tree_to_location.Value(value)
        }]),
    )
}

export const Dictionary: Dictionary = ($, abort) => {
    return _p_cc(
        r_astn_unmarshalled_from_parse_tree.Dictionary($, ($) => abort(['astn', $])),
        ($) => {
            const value = $.value
            return {
                'value': $.value,
                'entries': $.entries.__d_map(($, id) => $.value.__decide(
                    ($) => $,
                    () => abort(['liana', {
                        'range': t_parse_tree_to_location.Value(value),
                        'type': ['dictionary', ['entry not set', id]]
                    }])
                ))
            }
        }
    )
}

export const List: List = ($, abort) => {
    return r_astn_unmarshalled_from_parse_tree.List($, ($) => abort(['astn', $]))
}

export const Nothing: Nothing = ($, abort) => {
    return r_astn_unmarshalled_from_parse_tree.Nothing($, ($) => abort(['astn', $])).null
}

export const Optional: Optional = ($, abort) => {
    return r_astn_unmarshalled_from_parse_tree.Optional($, ($) => abort(['astn', $]))
}

export const Property: Property = ($, abort, $p) => {
    const value = $
    return _p.select.entry(
        $.properties,
        $p.id,
        {
            no_such_entry: ($) => abort(['liana', {
                'range': t_parse_tree_to_location.Value(value.value),
                'type': ['type', ['missing property', $p.id]]
            }])
        }
    ).value
}

export const State: State = ($, abort) => {
    return r_astn_unmarshalled_from_parse_tree.State($, ($) => abort(['astn', $]))
}

export const Text: Text = ($, abort) => {
    return r_astn_unmarshalled_from_parse_tree.Text($, ($) => abort(['astn', $])).value
}

export const Verbose_Group: Verbose_Group = ($, abort, $p) => {
    return _p_cc(
        r_astn_unmarshalled_from_parse_tree.Verbose_Group($, ($) => abort(['astn', $]), $p),
        ($) => {
            const value = $.value
            return {
                'value': $.value,
                'properties': $.properties.__d_map(($, id) => $.value.__decide(
                    ($) => $,
                    () => abort(['liana', {
                        'range': t_parse_tree_to_location.Value(value),
                        'type': ['dictionary', ['entry not set', id]]
                    }])
                ))
            }
        }
    )
}