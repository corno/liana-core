import * as pi from 'pareto-core/dist/interface'

import * as d_generic from "pareto-test/dist/interface/temp/generic"
import * as d_serializer_parameters from "lib/dist/interface/to_be_generated/serializer_parameters"

export type Test_Set = {
    'integer': {
        'decimal': {
            'serializer': pi.Dictionary<d_generic.Transformer<number, string>>
            'deserializer': pi.Dictionary<d_generic.Refiner_Without_Parameters<number, string, string>>
        }
        'hexadecimal': {
            'serializer': pi.Dictionary<d_generic.Transformer<number, string>>
            'deserializer': pi.Dictionary<d_generic.Refiner_Without_Parameters<number, string, string>>
        }
        'binary': {
            'serializer': pi.Dictionary<d_generic.Transformer<number, string>>
            'deserializer': pi.Dictionary<d_generic.Refiner_Without_Parameters<number, string, string>>
        }
        'octal': {
            'serializer': pi.Dictionary<d_generic.Transformer<number, string>>
            'deserializer': pi.Dictionary<d_generic.Refiner_Without_Parameters<number, string, string>>
        }
        'iso_udhr': {
            'serializer': pi.Dictionary<d_generic.Transformer<number, string>>
            'deserializer': pi.Dictionary<d_generic.Refiner_Without_Parameters<number, string, string>>
        }
        'fractional_decimal': {
            'serializer': pi.Dictionary<d_generic.Transformer_With_Parameter<number, string, d_serializer_parameters.fractional_decimal>>
            'deserializer': pi.Dictionary<d_generic.Refiner_With_Parameter<number, string, string, d_serializer_parameters.fractional_decimal>>
        }
    }
    'boolean': {
        'true_false': {
            'serializer': pi.Dictionary<d_generic.Transformer<boolean, string>>
            'deserializer': pi.Dictionary<d_generic.Refiner_Without_Parameters<boolean, string, string>>
        }
    }
    'approximate_number': {
        'scientific_notation': {
            'serializer': pi.Dictionary<d_generic.Transformer_With_Parameter<number, string, d_serializer_parameters.scientific_notation>>
            'deserializer': pi.Dictionary<d_generic.Refiner_With_Parameter<string, number, string, d_serializer_parameters.scientific_notation>>
        }
    }
}