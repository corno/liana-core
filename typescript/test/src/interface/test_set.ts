
// import type * as d_generic from "pareto-test/interface/temp/generic"
import type * as d_serializer_parameters from "lib/interface/data/serializer_parameters"

// export type Test_Set = {
//     'integer': {
//         'decimal': {
//             'serializer': p_di.Dictionary<d_generic.Transformer<
// number, string
// >>
//             'deserializer': p_di.Dictionary<d_generic.Refiner_  Without_Parameters<number, string, string>>
//         }
//         'hexadecimal': {
//             'serializer': p_di.Dictionary<d_generic.Transformer<
// number, string
// >>
//             'deserializer': p_di.Dictionary<d_generic.Refiner_  Without_Parameters<number, string, string>>
//         }
//         'binary': {
//             'serializer': p_di.Dictionary<d_generic.Transformer<
// number, string
// >>
//             'deserializer': p_di.Dictionary<d_generic.Refiner_  Without_Parameters<number, string, string>>
//         }
//         'octal': {
//             'serializer': p_di.Dictionary<d_generic.Transformer<
// number, string
// >>
//             'deserializer': p_di.Dictionary<d_generic.Refiner_  Without_Parameters<number, string, string>>
//         }
//         'iso_udhr': {
//             'serializer': p_di.Dictionary<d_generic.Transformer<
// number, string
// >>
//             'deserializer': p_di.Dictionary<d_generic.Refiner_  Without_Parameters<number, string, string>>
//         }
//         'fractional_decimal': {
//             'serializer': p_di.Dictionary<d_generic.Transformer_With_Parameter<number, string, d_serializer_parameters.fractional_decimal>>
//             'deserializer': p_di.Dictionary<d_generic.Refiner_With_Parameter<
// number, string, string, d_serializer_parameters.fractional_decimal
// >>
//         }
//     }
//     'boolean': {
//         'true_false': {
//             'serializer': p_di.Dictionary<d_generic.Transformer<
// boolean, string
// >>
//             'deserializer': p_di.Dictionary<d_generic.Refiner_  Without_Parameters<boolean, string, string>>
//         }
//     }
//     'approximate_number': {
//         'scientific_notation': {
//             'serializer': p_di.Dictionary<d_generic.Transformer_With_Parameter<number, string, d_serializer_parameters.scientific_notation>>
//             'deserializer': p_di.Dictionary<d_generic.Refiner_With_Parameter<
// string, number, string, d_serializer_parameters.scientific_notation
// >>
//         }
//     }
// }