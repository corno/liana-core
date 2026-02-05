import *as _pi from 'pareto-core/dist/interface'

import * as d_serializer_parameters from "./to_be_generated/serializer_parameters"
import * as d_deserializer_errors from "./to_be_generated/deserializer_errors"
import * as d_text from "pareto-fountain-pen/dist/interface/to_be_generated/list_of_characters"
export namespace deserializers {

    export namespace primitives {

        export namespace approximate_number {

            export type scientific_notation = _pi.Refiner<number, d_deserializer_errors.scientific_notation, d_text.List_of_Characters>

        }

        export namespace integer {

            export type iso_udhr = _pi.Refiner<number, d_deserializer_errors.iso_udhr, d_text.List_of_Characters>
            export type binary = _pi.Refiner<number, d_deserializer_errors.binary, d_text.List_of_Characters>
            export type octal = _pi.Refiner<number, d_deserializer_errors.octal, d_text.List_of_Characters>
            export type decimal = _pi.Refiner<number, d_deserializer_errors.decimal, d_text.List_of_Characters>
            export type hexadecimal = _pi.Refiner<number, d_deserializer_errors.hexadecimal, d_text.List_of_Characters>
            export type fractional_decimal = _pi.Refiner_With_Parameters<number, d_deserializer_errors.fractional_decimal, d_text.List_of_Characters, d_serializer_parameters.fractional_decimal>

        }

        export namespace boolean {

            export type true_false = _pi.Refiner<boolean, d_deserializer_errors.true_false, d_text.List_of_Characters>

        }
    }
}


export namespace serializers {

    export namespace primitives {

        export namespace approximate_number {

            export type scientific_notation = _pi.Transformer_With_Parameters<number, d_text.List_of_Characters, d_serializer_parameters.scientific_notation>

        }

        export namespace integer {

            /**
             * 
             * uhdr is a numerical representation of dates where day 0 is 1948-12-10 (the date of the adoption of the Universal Declaration of Human Rights)
             * 
             * This function converts a udhr day number to an ISO 8601 date string (YYYY-MM-DD)
             */
            export type iso_udhr = _pi.Transformer<number, d_text.List_of_Characters>
            export type binary = _pi.Transformer<number, d_text.List_of_Characters>
            export type octal = _pi.Transformer<number, d_text.List_of_Characters>
            export type decimal = _pi.Transformer<number, d_text.List_of_Characters>
            export type hexadecimal = _pi.Transformer<number, d_text.List_of_Characters>
            export type fractional_decimal = _pi.Transformer_With_Parameters<number, d_text.List_of_Characters, d_serializer_parameters.fractional_decimal>
        }

        export namespace boolean {

            export type true_false = _pi.Transformer<boolean, d_text.List_of_Characters>

        }

    }
}