
import type * as p_i from 'pareto-core/interface/transformer'
import type * as p_di from 'pareto-core/interface/data'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'
import p_list_build_deprecated from 'pareto-core/implementation/refiner/specials/list_build_deprecated'
import p_text_from_list from 'pareto-core/implementation/transformer/specials/text_from_list'
import p_unreachable_code_path from 'pareto-core/implementation/transformer/specials/unreachable_code_path'

//data types
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/text/data"


    export type true_false = p_i.Transformer<
        boolean,
        d_out.Text
    >
    export type scientific_notation = p_i.Transformer_With_Parameter<
        number,
        d_out.Text,
        { digits: number }
    >
    export type binary = p_i.Transformer<
        number,
        d_out.Text
    >
    export type decimal = p_i.Transformer<
        number,
        d_out.Text
    >
    export type hexadecimal = p_i.Transformer<
        number,
        d_out.Text
    >
    export type fractional_decimal = p_i.Transformer_With_Parameter<
        number,
        d_out.Text,
        { 'number of fractional digits': number }
    >
    export type iso_date_udhr = p_i.Transformer<
        number,
        d_out.Text
    >
    export type octal = p_i.Transformer<
        number,
        d_out.Text
    >

