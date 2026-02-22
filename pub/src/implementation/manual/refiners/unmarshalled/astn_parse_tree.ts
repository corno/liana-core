import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

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