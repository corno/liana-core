import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall"
import * as d_out from "astn-core/dist/interface/generated/liana/schemas/location/data"

export const Error: p_i.Transformer<
d_in.Error, d_out.Range
> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'liana': return p_.option($, ($): d_out.Range => p_.from.state($.range).decide(
                ($) => {
                    switch ($[0]) {
                        case 'in main document': return p_.option($, ($) => $)
                        case 'in subdocument': return p_.option($, ($) => $.context['range of include in main document'])
                        default: return p_.au($[0])
                    }
                }))
            case 'astn': return p_.option($, ($) => $.range)
            default: return p_.au($[0])
        }
    })