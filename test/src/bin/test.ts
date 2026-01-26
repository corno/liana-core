#!/usr/bin/env node

import * as _pt from 'pareto-core/dist/transformer'
import * as _pi from 'pareto-core/dist/interface'
import * as _pc from 'pareto-core/dist/command'

import * as _pn from 'pareto-host-nodejs'

import {
    Resources,
    run_refiner_tests_with_parameters,
    run_refiner_tests_without_parameters,
    run_transformer_tests_with_parameters,
    run_transformer_tests_without_parameters,
} from "pareto-test/dist/implementation/generic"

import { $$ as p_run_tests } from "pareto-test/dist/implementation/manual/commands/run_tests"

import * as ds_main from "pareto-resources/dist/interface/to_be_generated/temp_main"

// Import test data
import { TEST_DATA } from "../data/test_data"

// Import serializers
import { $$ as s_decimal } from "pub/dist/implementation/manual/primitives/integer/serializers/decimal"
import { $$ as s_hexadecimal } from "pub/dist/implementation/manual/primitives/integer/serializers/hexadecimal"
import { $$ as s_binary } from "pub/dist/implementation/manual/primitives/integer/serializers/binary"
import { $$ as s_octal } from "pub/dist/implementation/manual/primitives/integer/serializers/octal"
import { $$ as s_udhr_to_iso } from "pub/dist/implementation/manual/primitives/integer/serializers/iso_udhr"
import { $$ as s_fractional_decimal } from "pub/dist/implementation/manual/primitives/integer/serializers/fractional_decimal"
import { $$ as s_boolean_true_false } from "pub/dist/implementation/manual/primitives/boolean/serializers/true_false"
import { $$ as s_approx_scientific } from "pub/dist/implementation/manual/primitives/approximate_number/serializers/scientific_notation"

import { $$ as s_pad_left } from "pub/dist/implementation/manual/primitives/text/serializers/pad_left"

// Import deserializers
import { $$ as ds_decimal } from "pub/dist/implementation/manual/primitives/integer/deserializers/decimal"
import { $$ as ds_hexadecimal } from "pub/dist/implementation/manual/primitives/integer/deserializers/hexadecimal"
import { $$ as ds_binary } from "pub/dist/implementation/manual/primitives/integer/deserializers/binary"
import { $$ as ds_octal } from "pub/dist/implementation/manual/primitives/integer/deserializers/octal"
import { $$ as ds_iso_to_udhr } from "pub/dist/implementation/manual/primitives/integer/deserializers/iso_udhr"
import { $$ as ds_fractional_decimal } from "pub/dist/implementation/manual/primitives/integer/deserializers/fractional_decimal"
import { $$ as ds_true_false } from "pub/dist/implementation/manual/primitives/boolean/deserializers/true_false"
import { $$ as ds_approx_scientific } from "pub/dist/implementation/manual/primitives/approximate_number/deserializers/scientific_notation"

_pn.run_main_command(
    ($rr) => {
        return _pc.command_procedure<ds_main.Error, ds_main.Parameters, null, null>(
            ($p, $r) => [
                p_run_tests(
                    {
                        'log error': $rr.commands['log error'],
                        'log': $rr.commands.log,
                    },
                    null,
                ).execute(
                    {
                        'test results': _pt.dictionary.literal({
                            "integer": ['group', _pt.dictionary.literal({
                                "decimal": ['group', _pt.dictionary.literal({
                                    "serializer": ['group', run_transformer_tests_without_parameters(TEST_DATA.integer.decimal.serializer, s_decimal)],
                                    "deserializer": ['group', run_refiner_tests_without_parameters(TEST_DATA.integer.decimal.deserializer, ds_decimal)],
                                })],
                                "hexadecimal": ['group', _pt.dictionary.literal({
                                    "serializer": ['group', run_transformer_tests_without_parameters(TEST_DATA.integer.hexadecimal.serializer, s_hexadecimal)],
                                    "deserializer": ['group', run_refiner_tests_without_parameters(TEST_DATA.integer.hexadecimal.deserializer, ds_hexadecimal)],
                                })],
                                "binary": ['group', _pt.dictionary.literal({
                                    "serializer": ['group', run_transformer_tests_without_parameters(TEST_DATA.integer.binary.serializer, s_binary)],
                                    "deserializer": ['group', run_refiner_tests_without_parameters(TEST_DATA.integer.binary.deserializer, ds_binary)],
                                })],
                                "octal": ['group', _pt.dictionary.literal({
                                    "serializer": ['group', run_transformer_tests_without_parameters(TEST_DATA.integer.octal.serializer, s_octal)],
                                    "deserializer": ['group', run_refiner_tests_without_parameters(TEST_DATA.integer.octal.deserializer, ds_octal)],
                                })],
                                "udhr_to_iso": ['group', _pt.dictionary.literal({
                                    "serializer": ['group', run_transformer_tests_without_parameters(TEST_DATA.integer.iso_udhr.serializer, s_udhr_to_iso)],
                                })],
                                "iso_to_udhr": ['group', _pt.dictionary.literal({
                                    "deserializer": ['group', run_refiner_tests_without_parameters(TEST_DATA.integer.iso_udhr.deserializer, ds_iso_to_udhr)],
                                })],
                                "fractional_decimal": ['group', _pt.dictionary.literal({
                                    "serializer": ['group', run_transformer_tests_with_parameters(TEST_DATA.integer.fractional_decimal.serializer, s_fractional_decimal)],
                                    "deserializer": ['group', run_refiner_tests_with_parameters(TEST_DATA.integer.fractional_decimal.deserializer, ds_fractional_decimal)],
                                })],
                            })],
                            "boolean": ['group', _pt.dictionary.literal({
                                "true_false": ['group', _pt.dictionary.literal({
                                    "serializer": ['group', run_transformer_tests_without_parameters(TEST_DATA.boolean.true_false.serializer, s_boolean_true_false)],
                                    "deserializer": ['group', run_refiner_tests_without_parameters(TEST_DATA.boolean.true_false.deserializer, ds_true_false)],
                                })],
                            })],
                            "approximate_number": ['group', _pt.dictionary.literal({
                                "scientific_notation": ['group', _pt.dictionary.literal({
                                    "serializer": ['group', run_transformer_tests_with_parameters(TEST_DATA.approximate_number.scientific_notation.serializer, s_approx_scientific)],
                                })],
                            })],
                            "text": ['group', _pt.dictionary.literal({
                                "pads_left": ['group', _pt.dictionary.literal({
                                    "serializer": ['group', run_transformer_tests_with_parameters(TEST_DATA.text.pad_left.serializer, s_pad_left)],
                                })],
                            })],
                        })
                    },
                    ($): ds_main.Error => ({
                        'exit code': 1
                    }),
                )
            ]
        )(null, null)

    }
)
