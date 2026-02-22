import * as _pi from 'pareto-core/dist/interface'

import * as d_generic from "pareto-test/dist/interface/temp/generic"
import * as d_serializer_parameters from "pub/dist/interface/to_be_generated/serializer_parameters"

export type Test_Set = {
    'integer': {
        'decimal': {
            'serializer': _pi.Dictionary<d_generic.Transformer<number, string>>
            'deserializer': _pi.Dictionary<d_generic.Refiner_Without_Parameters<number, string, string>>
        }
        'hexadecimal': {
            'serializer': _pi.Dictionary<d_generic.Transformer<number, string>>
            'deserializer': _pi.Dictionary<d_generic.Refiner_Without_Parameters<number, string, string>>
        }
        'binary': {
            'serializer': _pi.Dictionary<d_generic.Transformer<number, string>>
            'deserializer': _pi.Dictionary<d_generic.Refiner_Without_Parameters<number, string, string>>
        }
        'octal': {
            'serializer': _pi.Dictionary<d_generic.Transformer<number, string>>
            'deserializer': _pi.Dictionary<d_generic.Refiner_Without_Parameters<number, string, string>>
        }
        'iso_udhr': {
            'serializer': _pi.Dictionary<d_generic.Transformer<number, string>>
            'deserializer': _pi.Dictionary<d_generic.Refiner_Without_Parameters<number, string, string>>
        }
        'fractional_decimal': {
            'serializer': _pi.Dictionary<d_generic.Transformer_With_Parameter<number, string, d_serializer_parameters.fractional_decimal>>
            'deserializer': _pi.Dictionary<d_generic.Refiner_With_Parameter<number, string, string, d_serializer_parameters.fractional_decimal>>
        }
    }
    'boolean': {
        'true_false': {
            'serializer': _pi.Dictionary<d_generic.Transformer<boolean, string>>
            'deserializer': _pi.Dictionary<d_generic.Refiner_Without_Parameters<boolean, string, string>>
        }
    }
    'approximate_number': {
        'scientific_notation': {
            'serializer': _pi.Dictionary<d_generic.Transformer_With_Parameter<number, string, d_serializer_parameters.scientific_notation>>
            'deserializer': _pi.Dictionary<d_generic.Refiner_With_Parameter<string, number, string, d_serializer_parameters.scientific_notation>>
        }
    }
}