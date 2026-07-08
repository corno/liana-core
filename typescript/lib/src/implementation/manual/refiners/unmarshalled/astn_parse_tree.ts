import * as p_ from 'pareto-core/implementation/refiner'
import type * as p_di from 'pareto-core/interface/data'
import type * as p_i from 'pareto-core/interface/refiner'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'
import p_change_context from 'pareto-core/implementation/refiner/specials/change_context'

import type * as d_in from "astn-core/interface/generated/liana/schemas/parse_tree/data"
import type * as d_out from "../../../../interface/data/unmarshalled.js"
import type * as d_function from "../../../../interface/data/unmarshall.js"
import type * as d_function_loc from "../../../../interface/data/document_and_location.js"


//dependencies
import * as t_parse_tree_to_location from "../../transformers/parse_tree/start_token_range.js"
import * as r_astn_unmarshalled_from_parse_tree from "astn-core/implementation/manual/refiners/unmarshalled/parse_tree"
import * as t_from_loc from "../primitives/list_of_characters.js"

export namespace interface_ {
    export type Number = p_i.Refiner_With_Parameter<
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

    export type Boolean = p_i.Refiner_With_Parameter<
        d_out.Boolean,
        d_function.Error,
        d_in.Value,
        {
            'type':
            | ['true/false', null]
            'subdocument context': p_di.Optional_Value<d_function_loc.Subdocument>
        }
    >


    export type Dictionary = p_i.Refiner_With_Parameter<
        d_out.Dictionary,
        d_function.Error,
        d_in.Value,
        {
            'subdocument context': p_di.Optional_Value<d_function_loc.Subdocument>
        }
    >

    export type List = p_i.Refiner_With_Parameter<
        d_out.List,
        d_function.Error,
        d_in.Value,
        {
            'subdocument context': p_di.Optional_Value<d_function_loc.Subdocument>
        }
    >

    export type Nothing = p_i.Refiner<
        d_out.Nothing,
        d_function.Error,
        d_in.Value
    >

    export type Optional = p_i.Refiner<
        d_out.Optional,
        d_function.Error,
        d_in.Value
    >

    export type Property = p_i.Refiner_With_Parameter<
        d_out.Property,
        d_function.Error,
        d_out.Verbose_Group,
        {
            'id': string
            'subdocument context': p_di.Optional_Value<d_function_loc.Subdocument>
        }
    >

    export type State = p_i.Refiner<
        d_out.State,
        d_function.Error,
        d_in.Value
    >

    export type Text = p_i.Refiner<
        d_out.Text,
        d_function.Error,
        d_in.Value
    >

    export type Verbose_Group = p_i.Refiner_With_Parameter<
        d_out.Verbose_Group,
        d_function.Error,
        d_in.Value,
        {
            'expected properties': p_di.Dictionary<null>
            'subdocument context': p_di.Optional_Value<d_function_loc.Subdocument>
        }
    >
}
import * as temp_interface_ from "../../../../interface/declarations/refiners/unmarshalled/astn_parse_tree.js"

export const Number: interface_.Number = ($, abort, $p) => {
    const value = $

    const as_loc = p_list_from_text(
        r_astn_unmarshalled_from_parse_tree.Text(
            $,
            ($) => abort(['astn', $])
        ).token.value,
        ($) => $
    )

    return p_.from.state($p.type).decide(
        ($) => {
            switch ($[0]) {
                case 'binary': return p_.option($, ($) => t_from_loc.binary(
                    as_loc,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?(0|1)+"
                        }],
                        range: t_parse_tree_to_location.Value(value, { 'subdocument context': $p['subdocument context'] })
                    }]),
                ))
                case 'decimal': return p_.option($, ($) => t_from_loc.decimal(
                    as_loc,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?(0|[1-9][0-9]*)"
                        }],
                        range: t_parse_tree_to_location.Value(value, { 'subdocument context': $p['subdocument context'] })
                    }]),
                ))
                case 'fractional decimal': return p_.option($, ($) => t_from_loc.fractional_decimal(
                    as_loc,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?(0|[1-9][0-9]*)(\\.[0-9]+)?"
                        }],
                        range: t_parse_tree_to_location.Value(value, { 'subdocument context': $p['subdocument context'] })
                    }]),
                    {
                        'number of fractional digits': $.digits
                    }
                ))
                case 'hexadecimal': return p_.option($, ($) => t_from_loc.hexadecimal(
                    as_loc,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?0x(0|[1-9a-fA-F][0-9a-fA-F]*)"
                        }],
                        range: t_parse_tree_to_location.Value(value, { 'subdocument context': $p['subdocument context'] })
                    }]),
                ))
                case 'iso date': return p_.option($, ($) => t_from_loc.iso_date_udhr(
                    as_loc,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "YYYY-MM-DD"
                        }],
                        range: t_parse_tree_to_location.Value(value, { 'subdocument context': $p['subdocument context'] })
                    }]),
                ))
                case 'octal': return p_.option($, ($) => t_from_loc.octal(
                    as_loc,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?0o(0|[1-7][0-7]*)"
                        }],
                        range: t_parse_tree_to_location.Value(value, { 'subdocument context': $p['subdocument context'] })
                    }]),
                ))
                case 'scientific notation': return p_.option($, ($) => t_from_loc.scientific_notation(
                    as_loc,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?(0|[1-9][0-9]*)(\\.[0-9]+)?([eE][+-]?[0-9]+)?"
                        }],
                        range: t_parse_tree_to_location.Value(value, { 'subdocument context': $p['subdocument context'] })
                    }]),
                    {
                        'precision': $.precision
                    }
                ))
                default: return p_.exhaustive($[0])
            }
        })

}

export const Boolean: interface_.Boolean = ($, abort, $p) => {
    const value = $

    const as_loc = p_list_from_text(
        r_astn_unmarshalled_from_parse_tree.Text(
            $,
            ($) => abort(['astn', $])
        ).token.value,
        ($) => $
    )

    return p_.from.state($p.type).decide(
        ($) => {
            switch ($[0]) {
                case 'true/false': return p_.option($, ($) => t_from_loc.true_false(
                    as_loc,
                    ($) => abort(['liana', {
                        'type': ['not a valid boolean', {
                            'expected format': "true|false"
                        }],
                        range: t_parse_tree_to_location.Value(value, { 'subdocument context': $p['subdocument context'] })
                    }]),
                ))
                default: return p_.exhaustive($[0])
            }
        })

}

export const Dictionary: interface_.Dictionary = ($, abort, $p) => {
    return p_change_context(
        r_astn_unmarshalled_from_parse_tree.Dictionary($, ($) => abort(['astn', $])),
        ($) => {
            const value = $.value
            return {
                'value': $.value,
                'entries': p_.from.dictionary($.entries).map(
                    ($, id) => p_.from.optional($.assignment).decide(
                        ($) => p_.from.optional($.value).decide(
                            ($) => $,
                            () => abort(['liana', {
                                'range': t_parse_tree_to_location.Value(value, { 'subdocument context': $p['subdocument context'] }),
                                'type': ['dictionary', ['entry not set', id]]
                            }])
                        ),
                        () => abort(['liana', {
                            'range': t_parse_tree_to_location.Value(value, { 'subdocument context': $p['subdocument context'] }),
                            'type': ['dictionary', ['entry not set', id]]
                        }])
                    ))
            }
        }
    )
}

export const List: interface_.List = ($, abort) => {
    return r_astn_unmarshalled_from_parse_tree.List($, ($) => abort(['astn', $]))
}

export const Nothing: interface_.Nothing = ($, abort) => r_astn_unmarshalled_from_parse_tree.Nothing($, ($) => abort(['astn', $])).null

export const Optional: interface_.Optional = ($, abort) => r_astn_unmarshalled_from_parse_tree.Optional($, ($) => abort(['astn', $]))

export const Property: interface_.Property = ($, abort, $p) => p_.from.dictionary($.properties).get_entry(
    $p.id,
    {
        no_such_entry: () => abort(['liana', {
            'range': t_parse_tree_to_location.Value($.value, { 'subdocument context': $p['subdocument context'] }),
            'type': ['type', ['missing property', $p.id]]
        }])
    }
)

export const State: interface_.State = ($, abort) => r_astn_unmarshalled_from_parse_tree.State($, ($) => abort(['astn', $]))

export const Text: interface_.Text = ($, abort) => r_astn_unmarshalled_from_parse_tree.Text($, ($) => abort(['astn', $])).token.value

export const Verbose_Group: interface_.Verbose_Group = ($, abort, $p) => {
    return p_change_context(
        r_astn_unmarshalled_from_parse_tree.Verbose_Group($, ($) => abort(['astn', $]), $p),
        ($) => {
            const value = $.value
            return {
                'value': $.value,
                'properties': p_.from.dictionary($.properties).map(
                    ($, id) => p_.from.optional($.assignment).decide(
                        ($) => p_.from.optional($.value).decide(
                            ($) => $,
                            () => abort(['liana', {
                                'range': t_parse_tree_to_location.Value(value, { 'subdocument context': $p['subdocument context'] }),
                                'type': ['dictionary', ['entry not set', id]]
                            }])
                        ),
                        () => abort(['liana', {
                            'range': t_parse_tree_to_location.Value(value, { 'subdocument context': $p['subdocument context'] }),
                            'type': ['dictionary', ['entry not set', id]]
                        }])
                    )
                )
            }
        }
    )
}