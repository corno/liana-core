import * as p_t from 'pareto-core/interface/transformer'
import * as p_r from 'pareto-core/interface/refiner'
import * as p_s from 'pareto-core/implementation/serializer'


export type API = {
    'serializers': {
        'deserialization to resolved': p_s.Serializer<
            import("../modules/resolving/schemas/resolved_document_deserialization.js").Error
        >
    },
    'transformers': {
    },
    'refiners': {
        'unmarshalled value': {
            'parse tree': {
                'Boolean': p_r.Refiner_With_Parameter<
                    import("../modules/value_unmarshalling/schemas/unmarshalled_value.js").Boolean,
                    import("../modules/value_unmarshalling/schemas/unmarshalling.js").Error,
                    import("../modules/value_unmarshalling/schemas/parse_tree.js").Value,
                    import("../modules/value_unmarshalling/schemas/unmarshalling.js").Boolean_Parameters
                >
                'Dictionary': p_r.Refiner<
                    import("../modules/value_unmarshalling/schemas/unmarshalled_value.js").Dictionary,
                    import("../modules/value_unmarshalling/schemas/unmarshalling.js").Error,
                    import("../modules/value_unmarshalling/schemas/parse_tree.js").Value
                >
                'List': p_r.Refiner<
                    import("../modules/value_unmarshalling/schemas/unmarshalled_value.js").List,
                    import("../modules/value_unmarshalling/schemas/unmarshalling.js").Error,
                    import("../modules/value_unmarshalling/schemas/parse_tree.js").Value
                >
                'Nothing': p_r.Refiner<
                    import("../modules/value_unmarshalling/schemas/unmarshalled_value.js").Nothing,
                    import("../modules/value_unmarshalling/schemas/unmarshalling.js").Error,
                    import("../modules/value_unmarshalling/schemas/parse_tree.js").Value
                >
                'Number': p_r.Refiner_With_Parameter<
                    import("../modules/value_unmarshalling/schemas/unmarshalled_value.js").Number,
                    import("../modules/value_unmarshalling/schemas/unmarshalling.js").Error,
                    import("../modules/value_unmarshalling/schemas/parse_tree.js").Value,
                    import("../modules/value_unmarshalling/schemas/unmarshalling.js").Number_Parameters
                >
                'Optional': p_r.Refiner<
                    import("../modules/value_unmarshalling/schemas/unmarshalled_value.js").Optional,
                    import("../modules/value_unmarshalling/schemas/unmarshalling.js").Error,
                    import("../modules/value_unmarshalling/schemas/parse_tree.js").Value
                >
                'Property': p_r.Refiner_With_Parameter<
                    import("../modules/value_unmarshalling/schemas/unmarshalled_value.js").Property,
                    import("../modules/value_unmarshalling/schemas/unmarshalling.js").Error,
                    import("../modules/value_unmarshalling/schemas/unmarshalled_value.js").Verbose_Group,
                    import("../modules/value_unmarshalling/schemas/unmarshalling.js").Property_Parameters
                >
                'State': p_r.Refiner<
                    import("../modules/value_unmarshalling/schemas/unmarshalled_value.js").State,
                    import("../modules/value_unmarshalling/schemas/unmarshalling.js").Error,
                    import("../modules/value_unmarshalling/schemas/parse_tree.js").Value
                >
                'Text': p_r.Refiner<
                    import("../modules/value_unmarshalling/schemas/unmarshalled_value.js").Text,
                    import("../modules/value_unmarshalling/schemas/unmarshalling.js").Error,
                    import("../modules/value_unmarshalling/schemas/parse_tree.js").Value
                >
                'Verbose Group': p_r.Refiner_With_Parameter<
                    import("../modules/value_unmarshalling/schemas/unmarshalled_value.js").Verbose_Group,
                    import("../modules/value_unmarshalling/schemas/unmarshalling.js").Error,
                    import("../modules/value_unmarshalling/schemas/parse_tree.js").Value,
                    import("../modules/value_unmarshalling/schemas/unmarshalling.js").Verbose_Group_Parameters
                >

            }
        }
    }
}