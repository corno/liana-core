
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as s_out from "pareto-fountain-pen/interface/data/text"


export type true_false = p_.Transformer<
    boolean,
    s_out.Text
>
export type scientific_notation = p_.Transformer_With_Parameter<
    number,
    s_out.Text,
    { digits: number }
>
export type binary = p_.Transformer<
    number,
    s_out.Text
>
export type decimal = p_.Transformer<
    number,
    s_out.Text
>
export type hexadecimal = p_.Transformer<
    number,
    s_out.Text
>
export type fractional_decimal = p_.Transformer_With_Parameter<
    number,
    s_out.Text,
    { 'number of fractional digits': number }
>
export type iso_date_udhr = p_.Transformer<
    number,
    s_out.Text
>
export type octal = p_.Transformer<
    number,
    s_out.Text
>

