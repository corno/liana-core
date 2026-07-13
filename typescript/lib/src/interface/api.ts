import * as p_t from 'pareto-core/interface/transformer'
import * as p_r from 'pareto-core/interface/refiner'
import * as p_s from 'pareto-core/implementation/serializer'


export type API = {
    'serializers': {
        'deserialization to resolved': p_s.Serializer<
            import("./schemas/deserialization_to_resolved.js").Error
        >
    },
    'transformers': {
    },
    'refiners': {
        'unmarshalled value': {
            'parse tree': {
                'Boolean': p_r.Refiner_With_Parameter<
                    import("./schemas/unmarshalled_value.js").Boolean,
                    import("./schemas/value_unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value,
                    import("./schemas/value_unmarshalling.js").Boolean_Parameters
                >
                'Dictionary': p_r.Refiner<
                    import("./schemas/unmarshalled_value.js").Dictionary,
                    import("./schemas/value_unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value
                >
                'List': p_r.Refiner<
                    import("./schemas/unmarshalled_value.js").List,
                    import("./schemas/value_unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value
                >
                'Nothing': p_r.Refiner<
                    import("./schemas/unmarshalled_value.js").Nothing,
                    import("./schemas/value_unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value
                >
                'Number': p_r.Refiner_With_Parameter<
                    import("./schemas/unmarshalled_value.js").Number,
                    import("./schemas/value_unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value,
                    import("./schemas/value_unmarshalling.js").Number_Parameters
                >
                'Optional': p_r.Refiner<
                    import("./schemas/unmarshalled_value.js").Optional,
                    import("./schemas/value_unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value
                >
                'Property': p_r.Refiner_With_Parameter<
                    import("./schemas/unmarshalled_value.js").Property,
                    import("./schemas/value_unmarshalling.js").Error,
                    import("./schemas/unmarshalled_value.js").Verbose_Group,
                    import("./schemas/value_unmarshalling.js").Property_Parameters
                >
                'State': p_r.Refiner<
                    import("./schemas/unmarshalled_value.js").State,
                    import("./schemas/value_unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value
                >
                'Text': p_r.Refiner<
                    import("./schemas/unmarshalled_value.js").Text,
                    import("./schemas/value_unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value
                >
                'Verbose Group': p_r.Refiner_With_Parameter<
                    import("./schemas/unmarshalled_value.js").Verbose_Group,
                    import("./schemas/value_unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value,
                    import("./schemas/value_unmarshalling.js").Verbose_Group_Parameters
                >

            }
        }
    }
}