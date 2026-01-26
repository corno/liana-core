import * as _pi from 'pareto-core/dist/interface'

import { $$ as ds_decimal } from "pub/dist/implementation/manual/primitives/integer/deserializers/decimal"

type Possible_Error =
    | ['success', string]
    | ['error', string]

type Tester_for_Transformer_With_Parameter = (
    input: string,
    parameter: string,
) => string

type Tester_for_Transformer_Without_Parameter = (
    input: string,
) => string

type Tester_for_Transformer =
    | ['with parameter', Tester_for_Transformer_With_Parameter]
    | ['without parameter', Tester_for_Transformer_Without_Parameter]


type Tester_for_Refiner_With_Error_With_Parameter = (
    input: string,
    parameter: string,
) => Possible_Error

type Tester_for_Refiner_With_Error_Without_Parameter = (
    input: string,
) => Possible_Error


type Tester_for_Refiner_Without_Error_Without_Parameter = (
    input: string,
) => string

type Tester_for_Refiner_Without_Error_With_Parameter = (
    input: string,
    parameter: string,
) => string

type Tester_for_Refiner =
    | ['with error with parameter', Tester_for_Refiner_With_Error_With_Parameter]
    | ['with error without parameter', Tester_for_Refiner_With_Error_Without_Parameter]
    | ['without error with parameter', Tester_for_Refiner_Without_Error_With_Parameter]
    | ['without error without parameter', Tester_for_Refiner_Without_Error_Without_Parameter]

export const create_tester_for_transformer_with_parameter = <Input, Result, Parameter>(
    transformer: _pi.Transformer_With_Parameters<Input, Result, Parameter>,
    text_to_input: (input: string) => Input,
    text_to_parameter: (parameter: string) => Parameter,
    result_to_text: (result: Result) => string,
): Tester_for_Transformer => {
    return ['with parameter', (input, parameter) => result_to_text(transformer(
        text_to_input(input),
        text_to_parameter(parameter),
    ))]
}

// export const create_tester_for_transformer_without_parameter = <Input, Result>(
//     transformer: _pi.Transformer<Input, Result>,
//     text_to_input: (input: string) => Input,
//     result_to_text: (result: Result) => string,
// ): Tester_for_Transformer => {
//     return ['without parameter', (input: string) => result_to_text(transformer(
//         text_to_input(input),
//     ))]
// }




export const create_tester_for_serializer_with_parameter = <Input, Parameter>(
    transformer: _pi.Transformer_With_Parameters<Input, string, Parameter>,
    text_to_input: (input: string) => Input,
    text_to_parameter: (parameter: string) => Parameter,
): Tester_for_Transformer => ['with parameter', (input, parameter) => transformer(
    text_to_input(input),
    text_to_parameter(parameter),
)]

export const create_tester_for_transformer_without_parameter = <Input, Result>(
    transformer: _pi.Transformer<Input, Result>,
    text_to_input: (input: string) => Input,
    result_to_text: (result: Result) => string,
): Tester_for_Transformer => ['without parameter', (input: string) => result_to_text(transformer(
    text_to_input(input),
))]



// export const create_tester_for_refiner_with_error_with_parameter = <Input, Result, Parameter, Error>(
//     refiner: _pi.Refiner_With_Parameters<Input, Result, Error, Parameter>,
//     text_to_input: (input: string) => Input,
//     text_to_parameter: (parameter: string) => Parameter,
//     result_to_text: (result: Result) => string,
//     error_to_text: (error: Error) => string,
// ): Tester_for_Refiner => {
//     return ['with error with parameter', (input: string, parameter: string) => {
//         const r = refiner(
//             text_to_input(input),
//             text_to_parameter(parameter),
//         )
//         switch (r[0]) {
//             case 'success': return ['success', result_to_text(r[1])]
//             case 'error': return ['error', error_to_text(r[1])]
//         }
//     }]
// }


// type Integer_Refiner =
//     | ['with error', <Error>() => _pi.Number_Refiner<Error>]

// type API = {
//     'deserializers': {
//         'primitives': {
//             'integer': { [key: string]: Integer_Refiner }
//         }
//     }
// }