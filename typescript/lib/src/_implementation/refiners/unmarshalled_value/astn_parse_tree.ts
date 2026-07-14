import * as p_ from 'pareto-core/implementation/refiner'
import * as p_di from 'pareto-core/interface/schema'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'
import p_change_context from 'pareto-core/implementation/refiner/specials/change_context'

import type * as s_in from "../../../interface/schemas/parse_tree.js"
import type * as s_out from "../../../private_schemas/unmarshalled_value.js"
import type * as s_function from "../../../interface/schemas/unmarshalling.js"


namespace declarations {
    export type Number = p_.Refiner_With_Parameter<
        s_out.Number,
        s_function.Error,
        s_in.Value,
        s_function.Number_Parameters
    >

    export type Boolean = p_.Refiner_With_Parameter<
        s_out.Boolean,
        s_function.Error,
        s_in.Value,
        s_function.Boolean_Parameters
    >


    export type Dictionary = p_.Refiner<
        s_out.Dictionary,
        s_function.Error,
        s_in.Value
    >

    export type List = p_.Refiner<
        s_out.List,
        s_function.Error,
        s_in.Value
    >

    export type Nothing = p_.Refiner<
        s_out.Nothing,
        s_function.Error,
        s_in.Value
    >

    export type Optional = p_.Refiner<
        s_out.Optional,
        s_function.Error,
        s_in.Value
    >

    export type Property = p_.Refiner_With_Parameter<
        s_out.Property,
        s_function.Error,
        s_out.Verbose_Group,
        s_function.Property_Parameters
    >

    export type State = p_.Refiner<
        s_out.State,
        s_function.Error,
        s_in.Value
    >

    export type Text = p_.Refiner<
        s_out.Text,
        s_function.Error,
        s_in.Value
    >

    export type Verbose_Group = p_.Refiner_With_Parameter<
        s_out.Verbose_Group,
        s_function.Error,
        s_in.Value,
        s_function.Verbose_Group_Parameters
    >

}


//dependencies
import * as api_astn_core from "astn-core/api"
import * as t_from_loc from "../primitives/list_of_characters.js"
import type { s } from 'pareto-core/implementation/command'

export const Number: declarations.Number = ($, abort, $p) => {
    const value = $

    const as_loc = p_list_from_text(
        api_astn_core.api.refiners['unmarshalled value']['parse tree'].Text(
            $,
            ($) => abort(['astn value unmarshalling', $])
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
                        'range': api_astn_core.api.transformers['parse tree']['start token range'].Value(value)
                    }]),
                ))
                case 'decimal': return p_.option($, ($) => t_from_loc.decimal(
                    as_loc,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?(0|[1-9][0-9]*)"
                        }],
                        'range': api_astn_core.api.transformers['parse tree']['start token range'].Value(value)
                    }]),
                ))
                case 'fractional decimal': return p_.option($, ($) => t_from_loc.fractional_decimal(
                    as_loc,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?(0|[1-9][0-9]*)(\\.[0-9]+)?"
                        }],
                        'range': api_astn_core.api.transformers['parse tree']['start token range'].Value(value)
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
                        'range': api_astn_core.api.transformers['parse tree']['start token range'].Value(value)
                    }]),
                ))
                case 'iso date': return p_.option($, ($) => t_from_loc.iso_date_udhr(
                    as_loc,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "YYYY-MM-DD"
                        }],
                        range: api_astn_core.api.transformers['parse tree']['start token range'].Value(value)
                    }]),
                ))
                case 'octal': return p_.option($, ($) => t_from_loc.octal(
                    as_loc,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?0o(0|[1-7][0-7]*)"
                        }],
                        range: api_astn_core.api.transformers['parse tree']['start token range'].Value(value)
                    }]),
                ))
                case 'scientific notation': return p_.option($, ($) => t_from_loc.scientific_notation(
                    as_loc,
                    ($) => abort(['liana', {
                        'type': ['not a valid number', {
                            'expected format': "-?(0|[1-9][0-9]*)(\\.[0-9]+)?([eE][+-]?[0-9]+)?"
                        }],
                        range: api_astn_core.api.transformers['parse tree']['start token range'].Value(value)
                    }]),
                    {
                        'precision': $.precision
                    }
                ))
                default: return p_.exhaustive($[0])
            }
        })

}

export const Boolean: declarations.Boolean = ($, abort, $p) => {
    const value = $

    const as_loc = p_list_from_text(
        api_astn_core.api.refiners['unmarshalled value']['parse tree'].Text(
            $,
            ($) => abort(['astn value unmarshalling', $])
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
                        'range': api_astn_core.api.transformers['parse tree']['start token range'].Value(value)
                    }]),
                ))
                default: return p_.exhaustive($[0])
            }
        })

}

export const Dictionary: declarations.Dictionary = ($, abort) => {
    return p_change_context(
        api_astn_core.api.refiners['unmarshalled value']['parse tree'].Dictionary($, ($) => abort(['astn value unmarshalling', $])),
        ($) => {
            const value = $.value
            return {
                'value': $.value,
                'entries': p_.from.dictionary($.entries).map(
                    ($, id) => p_.from.optional($.assignment).decide(
                        ($) => p_.from.optional($.value).decide(
                            ($) => $,
                            () => abort(['liana', {
                                'range': api_astn_core.api.transformers['parse tree']['start token range'].Value(value),
                                'type': ['dictionary', ['entry not set', id]]
                            }])
                        ),
                        () => abort(['liana', {
                            'range': api_astn_core.api.transformers['parse tree']['start token range'].Value(value),
                            'type': ['dictionary', ['entry not set', id]]
                        }])
                    ))
            }
        }
    )
}

export const List: declarations.List = ($, abort) => {
    return api_astn_core.api.refiners['unmarshalled value']['parse tree'].List($, ($) => abort(['astn value unmarshalling', $]))
}

export const Nothing: declarations.Nothing = ($, abort) => api_astn_core.api.refiners['unmarshalled value']['parse tree'].Nothing($, ($) => abort(['astn value unmarshalling', $])).null

export const Optional: declarations.Optional = ($, abort) => api_astn_core.api.refiners['unmarshalled value']['parse tree'].Optional($, ($) => abort(['astn value unmarshalling', $]))

export const Property: declarations.Property = ($, abort, $p) => p_.from.dictionary($.properties).get_entry(
    $p.id,
    {
        no_such_entry: () => abort(['liana', {
            'range': api_astn_core.api.transformers['parse tree']['start token range'].Value($.value),
            'type': ['type', ['missing property', $p.id]]
        }])
    }
)

export const State: declarations.State = ($, abort) => api_astn_core.api.refiners['unmarshalled value']['parse tree'].State($, ($) => abort(['astn value unmarshalling', $]))

export const Text: declarations.Text = ($, abort) => api_astn_core.api.refiners['unmarshalled value']['parse tree'].Text($, ($) => abort(['astn value unmarshalling', $])).token.value

export const Verbose_Group: declarations.Verbose_Group = ($, abort, $p) => {
    return p_change_context(
        api_astn_core.api.refiners['unmarshalled value']['parse tree']['Verbose Group']($, ($) => abort(['astn value unmarshalling', $]), $p),
        ($) => {
            const value = $.value
            return {
                'value': $.value,
                'properties': p_.from.dictionary($.properties).map(
                    ($, id) => p_.from.optional($.assignment).decide(
                        ($) => p_.from.optional($.value).decide(
                            ($) => $,
                            () => abort(['liana', {
                                'range': api_astn_core.api.transformers['parse tree']['start token range'].Value(value),
                                'type': ['dictionary', ['entry not set', id]]
                            }])
                        ),
                        () => abort(['liana', {
                            'range': api_astn_core.api.transformers['parse tree']['start token range'].Value(value),
                            'type': ['dictionary', ['entry not set', id]]
                        }])
                    )
                )
            }
        }
    )
}