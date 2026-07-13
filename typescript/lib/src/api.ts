import * as interface_ from "./interface/api.js"


import * as r_unmarshalled_from_parse_tree from "./_implementation/refiners/unmarshalled_value/astn_parse_tree.js"
import * as ser_deserialization_to_resolved from "./_implementation/serializers/deserialization_to_resolved.js"

export const api: interface_.API = {
    'serializers': {
        'deserialization to resolved': ser_deserialization_to_resolved.Error
    },
    'transformers': {

    },
    'refiners': {
        'unmarshalled value': {
            'parse tree': {
                'Boolean': r_unmarshalled_from_parse_tree.Boolean,
                'Property': r_unmarshalled_from_parse_tree.Property,
                'State': r_unmarshalled_from_parse_tree.State,
                'Verbose Group': r_unmarshalled_from_parse_tree.Verbose_Group,
                'Number': r_unmarshalled_from_parse_tree.Number,
                'Nothing': r_unmarshalled_from_parse_tree.Nothing,
                'Optional': r_unmarshalled_from_parse_tree.Optional,
                'Dictionary': r_unmarshalled_from_parse_tree.Dictionary,
                'List': r_unmarshalled_from_parse_tree.List,
                'Text': r_unmarshalled_from_parse_tree.Text
            }
        }
    }
}