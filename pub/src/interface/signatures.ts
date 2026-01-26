import *as _pi from 'pareto-core/dist/interface'

import * as d_serializer_parameters from "./to_be_generated/serializer_parameters"
import * as d_deserializer_errors from "./to_be_generated/deserializer_errors"
export namespace deserializers {

    export namespace primitives {

        export namespace approximate_number {

            export type scientific_notation = _pi.Number_Deserializer<d_deserializer_errors.scientific_notation>

        }

        export namespace integer {

            export type iso_udhr = _pi.Number_Deserializer<d_deserializer_errors.iso_udhr>
            export type binary = _pi.Number_Deserializer<d_deserializer_errors.binary>
            export type octal = _pi.Number_Deserializer<d_deserializer_errors.octal>
            export type decimal = _pi.Number_Deserializer<d_deserializer_errors.decimal>
            export type hexadecimal = _pi.Number_Deserializer<d_deserializer_errors.hexadecimal>
            export type fractional_decimal = _pi.Number_Deserializer_With_Parameters<d_deserializer_errors.fractional_decimal, d_serializer_parameters.fractional_decimal>

        }

        export namespace boolean {

            export type true_false = _pi.Boolean_Deserializer<d_deserializer_errors.true_false>

        }
    }
}


export namespace serializers {

    export namespace primitives {

        export namespace approximate_number {

            export type scientific_notation = _pi.Number_Serializer_With_Parameters<d_serializer_parameters.scientific_notation>

        }

        export namespace integer {

            /**
             * 
             * uhdr is a numerical representation of dates where day 0 is 1948-12-10 (the date of the adoption of the Universal Declaration of Human Rights)
             * 
             * This function converts a udhr day number to an ISO 8601 date string (YYYY-MM-DD)
             */
            export type iso_udhr = _pi.Number_Serializer
            export type binary = _pi.Number_Serializer
            export type octal = _pi.Number_Serializer
            export type decimal = _pi.Number_Serializer
            export type hexadecimal = _pi.Number_Serializer
            export type fractional_decimal = _pi.Number_Serializer_With_Parameters<d_serializer_parameters.fractional_decimal>
        }

        export namespace boolean {

            export type true_false = _pi.Boolean_Serializer

        }

    }
}