import * as _pi from 'pareto-core/dist/interface'
import * as _pt from 'pareto-core/dist/transformer'

import * as d from "../interface/test_set"

/**
 * Comprehensive test data for all serializers and deserializers
 * This file contains structured test data separated from the test logic
 */

// Type definitions for test data structure

// For approximate number deserializer tests that include tolerance
// type FIXME_Approximate_Number_Deserializer_Test_Case = Test_Without_Parameters<string, number> & {
//     'tolerance': number
// }


// Concrete test data conforming to My_Test_Set type
export const TEST_DATA: d.Test_Set = {
    'list': {
        //I'm roundtripping here because I cannot test complex types directly yet
        'split': _pt.dictionary.literal({
            "simple split": { 'input': { 'input': "apple,banana,cherry", 'parameters': { 'separator': 44 }, }, 'expected': "apple,banana,cherry" },
            "a path": { 'input': { 'input': "/usr/local/bin/", 'parameters': { 'separator': 47 }, }, 'expected': ",usr,local,bin," },
        }),
    },
    'approximate_number': {
        'scientific_notation': {
            'deserializer': _pt.dictionary.literal({
                // "scientific positive exponent": { 'input': "1.23e+2", 'expected': _pt.set(123.0, 'tolerance': 0.01) },
                // "scientific negative exponent": { 'input': "5.67e-1", 'expected': _pt.set(0.567, 'tolerance': 0.001) },
                // "scientific negative number": { 'input': "-3.14e+0", 'expected': _pt.set(-3.14, 'tolerance': 0.01) },
                // "scientific large number": { 'input': "2.5e+3", 'expected': _pt.set(2500.0, 'tolerance': 1.0) },
                // "scientific small number": { 'input': "1.5e-3", 'expected': _pt.set(0.0015, 'tolerance': 0.0001) },
                // "scientific zero exponent": { 'input': "7.89e+0", 'expected': _pt.set(7.89, 'tolerance': 0.01) },
                // "scientific negative large": { 'input': "-1.23e+4", 'expected': _pt.set(-12300.0, 'tolerance': 1.0) },
                // "scientific very small": { 'input': "9.87e-6", 'expected': _pt.set(0.00000987, 'tolerance': 0.00000001) }
            }),
            'serializer': _pt.dictionary.literal({
                "zero 3 digits": { 'input': { 'input': 0.0, 'parameters': { 'digits': 3 } }, 'expected': "0.00e+0" },
                "one 3 digits": { 'input': { 'input': 1.0, 'parameters': { 'digits': 3 } }, 'expected': "1.00e+0" },
                "ten 3 digits": { 'input': { 'input': 10.0, 'parameters': { 'digits': 3 } }, 'expected': "1.00e+1" },
                "hundred 3 digits": { 'input': { 'input': 100.0, 'parameters': { 'digits': 3 } }, 'expected': "1.00e+2" },
                "tenth 3 digits": { 'input': { 'input': 0.1, 'parameters': { 'digits': 3 } }, 'expected': "1.00e-1" },
                "hundredth 3 digits": { 'input': { 'input': 0.01, 'parameters': { 'digits': 3 } }, 'expected': "1.00e-2" },
                "negative one 3 digits": { 'input': { 'input': -1.0, 'parameters': { 'digits': 3 } }, 'expected': "-1.00e+0" },
                "negative ten 3 digits": { 'input': { 'input': -10.0, 'parameters': { 'digits': 3 } }, 'expected': "-1.00e+1" },
                "negative tenth 3 digits": { 'input': { 'input': -0.1, 'parameters': { 'digits': 3 } }, 'expected': "-1.00e-1" },
                "pi 2 digits": { 'input': { 'input': 3.14159, 'parameters': { 'digits': 2 } }, 'expected': "3.1e+0" },
                "pi 4 digits": { 'input': { 'input': 3.14159, 'parameters': { 'digits': 4 } }, 'expected': "3.142e+0" },
                "e 3 digits": { 'input': { 'input': 2.718, 'parameters': { 'digits': 3 } }, 'expected': "2.72e+0" },
                "very small 1 digit": { 'input': { 'input': 0.0001, 'parameters': { 'digits': 1 } }, 'expected': "1e-4" },
                "extremely small 3 digits": { 'input': { 'input': 0.0000001, 'parameters': { 'digits': 3 } }, 'expected': "1.00e-7" },
                "number rounds to zero": { 'input': { 'input': 0.00000001, 'parameters': { 'digits': 5 } }, 'expected': "1.0000e-8" }
            }),
        }
    },
    'boolean': {
        'true_false': {
            'deserializer': _pt.dictionary.literal({
                "boolean true": { 'input': "true", 'expected': ['output', true] },
                "boolean false": { 'input': "false", 'expected': ['output', false] },
                // Invalid input cases  
                "empty string": { 'input': "", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "other input": { 'input': "not a boolean", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "uppercase true": { 'input': "TRUE", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "uppercase false": { 'input': "FALSE", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "mixed case true": { 'input': "True", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "mixed case false": { 'input': "False", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "number 1": { 'input': "1", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "number 0": { 'input': "0", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "yes": { 'input': "yes", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "no": { 'input': "no", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "space before": { 'input': " true", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "space after": { 'input': "true ", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "space between": { 'input': "tr ue", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "t": { 'input': "t", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "f": { 'input': "f", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] },
                "random text": { 'input': "maybe", 'expected': ['error', "HANDLE UNEXPECTED VALUE!"] }
            }),
            'serializer': _pt.dictionary.literal({
                "boolean true case": { 'input': true, 'expected': "true" },
                "boolean false case": { 'input': false, 'expected': "false" }
            }),
        }
    },
    'integer': {
        'decimal': {
            'deserializer': _pt.dictionary.literal({
                "zero": { 'input': "0", 'expected': ['output', 0] },
                "one": { 'input': "1", 'expected': ['output', 1] },
                "ten": { 'input': "10", 'expected': ['output', 10] },
                "fifteen": { 'input': "15", 'expected': ['output', 15] },
                "sixteen": { 'input': "16", 'expected': ['output', 16] },
                "byte max": { 'input': "255", 'expected': ['output', 255] },
                "two five six": { 'input': "256", 'expected': ['output', 256] },
                "negative one": { 'input': "-1", 'expected': ['output', -1] },
                "negative ten": { 'input': "-10", 'expected': ['output', -10] },
                "negative byte max": { 'input': "-255", 'expected': ['output', -255] },
                "one thousand": { 'input': "1000", 'expected': ['output', 1000] },
                "uint16 max": { 'input': "65535", 'expected': ['output', 65535] },
                "megabyte": { 'input': "1048576", 'expected': ['output', 1048576] },
                // Invalid input cases
                "empty string": { 'input': "", 'expected': ['error', "Empty string is not a valid decimal number"] },
                "non numeric": { 'input': "abc", 'expected': ['error', "Invalid character in decimal string"] },
                "decimal point": { 'input': "12.34", 'expected': ['error', "Invalid character in decimal string"] },
                "leading space": { 'input': " 123", 'expected': ['error', "Invalid character in decimal string"] },
                "trailing space": { 'input': "123 ", 'expected': ['error', "Invalid character in decimal string"] },
                "mixed chars": { 'input': "12a34", 'expected': ['error', "Invalid character in decimal string"] },
                "hex prefix": { 'input': "0x123", 'expected': ['error', "Invalid character in decimal string"] },
                "binary prefix": { 'input': "0b101", 'expected': ['error', "Invalid character in decimal string"] },
                "octal prefix": { 'input': "0o123", 'expected': ['error', "Invalid character in decimal string"] },
                "double negative": { 'input': "--123", 'expected': ['error', "Invalid character in decimal string"] },
                "plus sign": { 'input': "+123", 'expected': ['error', "Invalid character in decimal string"] },
                "scientific notation": { 'input': "1e5", 'expected': ['error', "Invalid character in decimal string"] },
                "infinity": { 'input': "Infinity", 'expected': ['error', "Invalid character in decimal string"] },
                "nan": { 'input': "NaN", 'expected': ['error', "Invalid character in decimal string"] }
            }),
            'serializer': _pt.dictionary.literal({
                "zero": { 'input': 0, 'expected': "0" },
                "one": { 'input': 1, 'expected': "1" },
                "ten": { 'input': 10, 'expected': "10" },
                "fifteen": { 'input': 15, 'expected': "15" },
                "sixteen": { 'input': 16, 'expected': "16" },
                "byte max": { 'input': 255, 'expected': "255" },
                "two five six": { 'input': 256, 'expected': "256" },
                "negative one": { 'input': -1, 'expected': "-1" },
                "negative ten": { 'input': -10, 'expected': "-10" },
                "negative byte max": { 'input': -255, 'expected': "-255" },
                "one thousand": { 'input': 1000, 'expected': "1000" },
                "uint16 max": { 'input': 65535, 'expected': "65535" },
                "megabyte": { 'input': 1048576, 'expected': "1048576" }
            })
        },
        'hexadecimal': {
            'deserializer': _pt.dictionary.literal({
                "zero": { 'input': "0x0", 'expected': ['output', 0] },
                "one": { 'input': "0x1", 'expected': ['output', 1] },
                "ten uppercase": { 'input': "0xA", 'expected': ['output', 10] },
                "fifteen uppercase": { 'input': "0xF", 'expected': ['output', 15] },
                "sixteen": { 'input': "0x10", 'expected': ['output', 16] },
                "byte max uppercase": { 'input': "0xFF", 'expected': ['output', 255] },
                "two five six": { 'input': "0x100", 'expected': ['output', 256] },
                "ten lowercase": { 'input': "0xa", 'expected': ['output', 10] },
                "fifteen lowercase": { 'input': "0xf", 'expected': ['output', 15] },
                "byte max lowercase": { 'input': "0xff", 'expected': ['output', 255] },
                "mixed case": { 'input': "0xaBcD", 'expected': ['output', 43981] },
                "negative one": { 'input': "-0x1", 'expected': ['output', -1] },
                "negative ten": { 'input': "-0xA", 'expected': ['output', -10] },
                "negative byte max": { 'input': "-0xFF", 'expected': ['output', -255] },
                "one thousand": { 'input': "0x3E8", 'expected': ['output', 1000] },
                "uint16 max": { 'input': "0xFFFF", 'expected': ['output', 65535] },
                "megabyte": { 'input': "0x100000", 'expected': ['output', 1048576] },
                // Invalid input cases
                "empty string": { 'input': "", 'expected': ['error', "Empty string is not a valid hexadecimal number"] },
                "no prefix": { 'input': "FF", 'expected': ['error', "Hexadecimal number must have '0x' prefix"] },
                "wrong prefix": { 'input': "0hFF", 'expected': ['error', "Hexadecimal number must have '0x' prefix"] },
                "empty after prefix": { 'input': "0x", 'expected': ['error', "Hexadecimal number must have digits after '0x' prefix"] },
                "invalid hex char": { 'input': "0xG", 'expected': ['error', "Invalid character in hexadecimal string"] },
                "invalid hex chars": { 'input': "0xABG", 'expected': ['error', "Invalid character in hexadecimal string"] },
                "decimal in hex": { 'input': "0xAB.CD", 'expected': ['error', "Invalid character in hexadecimal string"] },
                "space in hex": { 'input': "0xA B", 'expected': ['error', "Invalid character in hexadecimal string"] },
                "double prefix": { 'input': "0x0x123", 'expected': ['error', "Invalid character in hexadecimal string"] },
                "binary instead": { 'input': "0b1010", 'expected': ['error', "Hexadecimal number must have '0x' prefix"] },
                "octal instead": { 'input': "0o123", 'expected': ['error', "Hexadecimal number must have '0x' prefix"] },
                "just prefix": { 'input': "0x", 'expected': ['error', "Hexadecimal number must have digits after '0x' prefix"] },
                "uppercase X": { 'input': "0XFF", 'expected': ['error', "Hexadecimal number must have '0x' prefix"] },
                "plus prefix": { 'input': "+0xFF", 'expected': ['error', "Hexadecimal number must have '0x' prefix"] }
            }),
            'serializer': _pt.dictionary.literal({
                "zero": { 'input': 0, 'expected': "0x0" },
                "one": { 'input': 1, 'expected': "0x1" },
                "ten": { 'input': 10, 'expected': "0xA" },
                "fifteen": { 'input': 15, 'expected': "0xF" },
                "sixteen": { 'input': 16, 'expected': "0x10" },
                "byte max": { 'input': 255, 'expected': "0xFF" },
                "two five six": { 'input': 256, 'expected': "0x100" },
                "negative one": { 'input': -1, 'expected': "-0x1" },
                "negative ten": { 'input': -10, 'expected': "-0xA" },
                "negative byte max": { 'input': -255, 'expected': "-0xFF" },
                "one thousand": { 'input': 1000, 'expected': "0x3E8" },
                "uint16 max": { 'input': 65535, 'expected': "0xFFFF" },
                "megabyte": { 'input': 1048576, 'expected': "0x100000" }
            }),
        },
        'binary': {
            'deserializer': _pt.dictionary.literal({
                "zero": { 'input': "0b0", 'expected': ['output', 0] },
                "one": { 'input': "0b1", 'expected': ['output', 1] },
                "ten": { 'input': "0b1010", 'expected': ['output', 10] },
                "fifteen": { 'input': "0b1111", 'expected': ['output', 15] },
                "sixteen": { 'input': "0b10000", 'expected': ['output', 16] },
                "byte max": { 'input': "0b11111111", 'expected': ['output', 255] },
                "two five six": { 'input': "0b100000000", 'expected': ['output', 256] },
                "negative one": { 'input': "-0b1", 'expected': ['output', -1] },
                "negative ten": { 'input': "-0b1010", 'expected': ['output', -10] },
                "negative byte max": { 'input': "-0b11111111", 'expected': ['output', -255] },
                "one thousand": { 'input': "0b1111101000", 'expected': ['output', 1000] },
                "uint16 max": { 'input': "0b1111111111111111", 'expected': ['output', 65535] },
                "megabyte": { 'input': "0b100000000000000000000", 'expected': ['output', 1048576] },
                // Invalid input cases
                "empty string": { 'input': "", 'expected': ['error', "Empty string is not a valid binary number"] },
                "no prefix": { 'input': "1010", 'expected': ['error', "Binary number must have '0b' prefix"] },
                "wrong prefix": { 'input': "0c1010", 'expected': ['error', "Binary number must have '0b' prefix"] },
                "empty after prefix": { 'input': "0b", 'expected': ['error', "Binary number must have digits after '0b' prefix"] },
                "invalid binary char": { 'input': "0b2", 'expected': ['error', "Invalid character in binary string"] },
                "invalid binary chars": { 'input': "0b1012", 'expected': ['error', "Invalid character in binary string"] },
                "decimal in binary": { 'input': "0b10.11", 'expected': ['error', "Invalid character in binary string"] },
                "space in binary": { 'input': "0b10 11", 'expected': ['error', "Invalid character in binary string"] },
                "hex chars": { 'input': "0bABCD", 'expected': ['error', "Invalid character in binary string"] },
                "octal chars": { 'input': "0b12345", 'expected': ['error', "Invalid character in binary string"] },
                "double prefix": { 'input': "0b0b1010", 'expected': ['error', "Invalid character in binary string"] },
                "hex instead": { 'input': "0xFF", 'expected': ['error', "Binary number must have '0b' prefix"] },
                "octal instead": { 'input': "0o123", 'expected': ['error', "Binary number must have '0b' prefix"] },
                "uppercase B": { 'input': "0B1010", 'expected': ['error', "Binary number must have '0b' prefix"] },
                "plus prefix": { 'input': "+0b1010", 'expected': ['error', "Binary number must have '0b' prefix"] }
            }),
            'serializer': _pt.dictionary.literal({
                "zero": { 'input': 0, 'expected': "0b0" },
                "one": { 'input': 1, 'expected': "0b1" },
                "ten": { 'input': 10, 'expected': "0b1010" },
                "fifteen": { 'input': 15, 'expected': "0b1111" },
                "sixteen": { 'input': 16, 'expected': "0b10000" },
                "byte max": { 'input': 255, 'expected': "0b11111111" },
                "two five six": { 'input': 256, 'expected': "0b100000000" },
                "negative one": { 'input': -1, 'expected': "-0b1" },
                "negative ten": { 'input': -10, 'expected': "-0b1010" },
                "negative byte max": { 'input': -255, 'expected': "-0b11111111" },
                "one thousand": { 'input': 1000, 'expected': "0b1111101000" },
                "uint16 max": { 'input': 65535, 'expected': "0b1111111111111111" },
                "megabyte": { 'input': 1048576, 'expected': "0b100000000000000000000" }
            }),
        },
        'octal': {
            'deserializer': _pt.dictionary.literal({
                "zero": { 'input': "0o0", 'expected': ['output', 0] },
                "one": { 'input': "0o1", 'expected': ['output', 1] },
                "ten": { 'input': "0o12", 'expected': ['output', 10] },
                "fifteen": { 'input': "0o17", 'expected': ['output', 15] },
                "sixteen": { 'input': "0o20", 'expected': ['output', 16] },
                "byte max": { 'input': "0o377", 'expected': ['output', 255] },
                "two five six": { 'input': "0o400", 'expected': ['output', 256] },
                "negative one": { 'input': "-0o1", 'expected': ['output', -1] },
                "negative ten": { 'input': "-0o12", 'expected': ['output', -10] },
                "negative byte max": { 'input': "-0o377", 'expected': ['output', -255] },
                "one thousand": { 'input': "0o1750", 'expected': ['output', 1000] },
                "uint16 max": { 'input': "0o177777", 'expected': ['output', 65535] },
                "megabyte": { 'input': "0o4000000", 'expected': ['output', 1048576] },
                // Invalid input cases
                "empty string": { 'input': "", 'expected': ['error', "Empty string is not a valid octal number"] },
                "no prefix": { 'input': "377", 'expected': ['error', "Octal number must have '0o' prefix"] },
                "wrong prefix": { 'input': "0p377", 'expected': ['error', "Octal number must have '0o' prefix"] },
                "empty after prefix": { 'input': "0o", 'expected': ['error', "Octal number must have digits after '0o' prefix"] },
                "invalid octal char 8": { 'input': "0o8", 'expected': ['error', "Invalid character in octal string"] },
                "invalid octal char 9": { 'input': "0o9", 'expected': ['error', "Invalid character in octal string"] },
                "invalid octal chars": { 'input': "0o1238", 'expected': ['error', "Invalid character in octal string"] },
                "decimal in octal": { 'input': "0o12.34", 'expected': ['error', "Invalid character in octal string"] },
                "space in octal": { 'input': "0o12 34", 'expected': ['error', "Invalid character in octal string"] },
                "hex chars": { 'input': "0oABCD", 'expected': ['error', "Invalid character in octal string"] },
                "double prefix": { 'input': "0o0o123", 'expected': ['error', "Invalid character in octal string"] },
                "hex instead": { 'input': "0xFF", 'expected': ['error', "Octal number must have '0o' prefix"] },
                "binary instead": { 'input': "0b1010", 'expected': ['error', "Octal number must have '0o' prefix"] },
                "uppercase O": { 'input': "0O123", 'expected': ['error', "Octal number must have '0o' prefix"] },
                "plus prefix": { 'input': "+0o123", 'expected': ['error', "Octal number must have '0o' prefix"] },
                "old style octal": { 'input': "0123", 'expected': ['error', "Octal number must have '0o' prefix"] }
            }),
            'serializer': _pt.dictionary.literal({
                "zero": { 'input': 0, 'expected': "0o0" },
                "one": { 'input': 1, 'expected': "0o1" },
                "ten": { 'input': 10, 'expected': "0o12" },
                "fifteen": { 'input': 15, 'expected': "0o17" },
                "sixteen": { 'input': 16, 'expected': "0o20" },
                "byte max": { 'input': 255, 'expected': "0o377" },
                "two five six": { 'input': 256, 'expected': "0o400" },
                "negative one": { 'input': -1, 'expected': "-0o1" },
                "negative ten": { 'input': -10, 'expected': "-0o12" },
                "negative byte max": { 'input': -255, 'expected': "-0o377" },
                "one thousand": { 'input': 1000, 'expected': "0o1750" },
                "uint16 max": { 'input': 65535, 'expected': "0o177777" },
                "megabyte": { 'input': 1048576, 'expected': "0o4000000" }
            }),
        },
        'iso_udhr': {
            'serializer': _pt.dictionary.literal({
                // Basic epoch tests - these work
                "udhr day zero": { 'input': 0, 'expected': "1948-12-10" },
                "udhr day one": { 'input': 1, 'expected': "1948-12-11" },
                "udhr day negative one": { 'input': -1, 'expected': "1948-12-09" },

                // Known working value from test.ts
                "udhr 22804": { 'input': 22804, 'expected': "2011-05-18" },

                // Year 2000 test case
                "year 2000": { 'input': 18649, 'expected': "2000-01-01" },

                // Test different months to cover all branches
                "february test": { 'input': 18680, 'expected': "2000-02-01" },
                "march test": { 'input': 18709, 'expected': "2000-03-01" },
                "april test": { 'input': 18740, 'expected': "2000-04-01" },
                "may test": { 'input': 18770, 'expected': "2000-05-01" },
                "june test": { 'input': 18801, 'expected': "2000-06-01" },
                "july test": { 'input': 18831, 'expected': "2000-07-01" },
                "august test": { 'input': 18862, 'expected': "2000-08-01" },
                "september test": { 'input': 18893, 'expected': "2000-09-01" },
                "october test": { 'input': 18923, 'expected': "2000-10-01" },
                "november test": { 'input': 18954, 'expected': "2000-11-01" },
                "december test": { 'input': 18984, 'expected': "2000-12-01" },

                // Test different year/month/day formatting branches
                "leap year february": { 'input': 18709, 'expected': "2000-03-01" },
                "single digit month": { 'input': 18680, 'expected': "2000-02-01" },
                "double digit month": { 'input': 18923, 'expected': "2000-10-01" },
                "single digit day": { 'input': 18658, 'expected': "2000-01-10" },
                "double digit day": { 'input': 18668, 'expected': "2000-01-20" },
                "edge case modulo zero": { 'input': 0, 'expected': "1948-12-10" },

                // Test specific edge cases for remaining branch coverage
                "day before epoch": { 'input': -1, 'expected': "1948-12-09" },
                "two years before": { 'input': -730, 'expected': "1946-12-11" },

                // Only test the basic year boundary that actually works
                "year 1 end": { 'input': -711106, 'expected': "0001-12-31" },

                "dec 31 in leap year": { 'input': 19014, 'expected': "2000-12-31" },

            }),
            'deserializer': _pt.dictionary.literal({
                // Basic epoch tests - these work
                "udhr day zero": { 'input': "1948-12-10", 'expected': ['output', 0] },
                "udhr day one": { 'input': "1948-12-11", 'expected': ['output', 1] },
                "udhr day negative one": { 'input': "1948-12-09", 'expected': ['output', -1] },

                // Known working value from test.ts
                "iso 2011 05 18": { 'input': "2011-05-18", 'expected': ['output', 22804] },

                // Year 2000 test case
                "year 2000": { 'input': "2000-01-01", 'expected': ['output', 18649] },

                // Only test the basic year boundary that actually works  
                "dec 31 0001": { 'input': "0001-12-31", 'expected': ['output', -711106] },

                // Years before UDHR - these work according to test.ts
                "one year before": { 'input': "1947-12-10", 'expected': ['output', -366] },
                "two years before": { 'input': "1946-12-10", 'expected': ['output', -731] },

                // Invalid input cases
                "empty string": { 'input': "", 'expected': ['error', "invalid date format"] },
                "not a date": { 'input': "not-a-date", 'expected': ['error', "invalid date format"] },
                "wrong format": { 'input': "12/31/2000", 'expected': ['error', "invalid date format"] },
                "wrong separator": { 'input': "2000/12/31", 'expected': ['error', "invalid date format"] },
                "wrong separator 2": { 'input': "2000-12x31", 'expected': ['error', "invalid date format"] },
                "missing year": { 'input': "-12-31", 'expected': ['error', "invalid date format"] },
                "missing month": { 'input': "2000--31", 'expected': ['error', "invalid date format"] },
                "missing day": { 'input': "2000-12-", 'expected': ['error', "invalid date format"] },
                "invalid month": { 'input': "2000-13-01", 'expected': ['error', "Invalid month: 13. Month must be between 1 and 12"] },
                "invalid day": { 'input': "2000-12-32", 'expected': ['error', "Invalid day: 32. Month 12 has at most 31 days"] },
                "zero month": { 'input': "2000-00-01", 'expected': ['error', "Invalid month: 0. Month must be between 1 and 12"] },
                "zero day": { 'input': "2000-12-00", 'expected': ['error', "Invalid day: 0. Day must be at least 1"] },
                "two digit year": { 'input': "00-12-31", 'expected': ['error', "invalid date format"] },
                "single digit month": { 'input': "2000-1-31", 'expected': ['error', "invalid date format"] },
                "single digit day": { 'input': "2000-12-1", 'expected': ['error', "invalid date format"] },
                "extra characters": { 'input': "2000-12-31T00:00:00", 'expected': ['error', "invalid date format"] },
                "negative year": { 'input': "-2000-12-31", 'expected': ['error', "invalid date format"] },
                "february 30": { 'input': "2000-02-30", 'expected': ['error', "Invalid day: 30. Month 2 has at most 29 days"] },
                "february 29 non leap year": { 'input': "1999-02-29", 'expected': ['error', "Invalid day: 29. Month 2 has at most 28 days"] },
                "space in date": { 'input': "2000-12 -31", 'expected': ['error', "invalid date format"] },
                "char before digit": { 'input': "200/-12-31", 'expected': ['error', "invalid date format"] },
                "char after digit": { 'input': "200:-12-31", 'expected': ['error', "invalid date format"] },
            }),
        },
        'fractional_decimal': {
            'deserializer': _pt.dictionary.literal({
                // Basic valid cases - 2 fractional digits
                "zero with 2 decimals": { 'input': { 'input': "0.00", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['output', 0] },
                "one with 2 decimals": { 'input': { 'input': "1.00", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['output', 100] },
                "one twenty three": { 'input': { 'input': "1.23", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['output', 123] },
                "twelve dot thirty four": { 'input': { 'input': "12.34", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['output', 1234] },
                "negative one twenty three": { 'input': { 'input': "-1.23", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['output', -123] },
                "negative twelve dot thirty four": { 'input': { 'input': "-12.34", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['output', -1234] },
                "hundred dot ninety nine": { 'input': { 'input': "100.99", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['output', 10099] },
                "ten dot zero five": { 'input': { 'input': "10.05", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['output', 1005] },
                
                // Edge cases
                "zero dot zero one": { 'input': { 'input': "0.01", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['output', 1] },
                "zero dot ten": { 'input': { 'input': "0.10", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['output', 10] },
                "large number": { 'input': { 'input': "999.99", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['output', 99999] },
                
                // Different fractional digit counts
                "one fractional digit": { 'input': { 'input': "1.2", 'parameters': { 'number of fractional digits': 1 } }, 'expected': ['output', 12] },
                "three fractional digits": { 'input': { 'input': "1.234", 'parameters': { 'number of fractional digits': 3 } }, 'expected': ['output', 1234] },
                "four fractional digits": { 'input': { 'input': "1.2345", 'parameters': { 'number of fractional digits': 4 } }, 'expected': ['output', 12345] },
                "zero fractional digits": { 'input': { 'input': "123.", 'parameters': { 'number of fractional digits': 0 } }, 'expected': ['output', 123] },
                
                // Invalid cases - wrong number of fractional digits
                "one fractional digit when expecting two": { 'input': { 'input': "1.2", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "Expected 2 fractional digits, but found 1"] },
                "three fractional digits when expecting two": { 'input': { 'input': "1.234", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "Expected 2 fractional digits, but found 3"] },
                "no fractional digits when expecting two": { 'input': { 'input': "123", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "No decimal point found in fractional decimal string"] },
                "empty fractional part": { 'input': { 'input': "123.", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "Expected 2 fractional digits, but found 0"] },
                "decimal only": { 'input': { 'input': ".23", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "No digits before decimal point"] },
                
                // Invalid characters
                "empty string": { 'input': { 'input': "", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "Empty string is not a valid fractional decimal number"] },
                "no decimal point": { 'input': { 'input': "123", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "No decimal point found in fractional decimal string"] },
                "multiple decimal points": { 'input': { 'input': "12.34.56", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "Multiple decimal points found"] },
                "letter in number": { 'input': { 'input': "1a.23", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "Invalid character in fractional decimal string"] },
                "letter in decimal": { 'input': { 'input': "12.3b", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "Invalid character in fractional decimal string"] },
                "space in number": { 'input': { 'input': "12 .34", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "Invalid character in fractional decimal string"] },
                "leading space": { 'input': { 'input': " 12.34", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "Invalid character in fractional decimal string"] },
                "trailing space": { 'input': { 'input': "12.34 ", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "Invalid character in fractional decimal string"] },
                "plus sign": { 'input': { 'input': "+12.34", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "Invalid character in fractional decimal string"] },
                "double negative": { 'input': { 'input': "--12.34", 'parameters': { 'number of fractional digits': 2 } }, 'expected': ['error', "Invalid character in fractional decimal string"] },
            }),
            'serializer': _pt.dictionary.literal({
                // Basic valid cases - 2 fractional digits
                "zero with 2 decimals": { 'input': { 'input': 0, 'parameters': { 'number of fractional digits': 2 } }, 'expected': "0.00" },
                "one with 2 decimals": { 'input': { 'input': 100, 'parameters': { 'number of fractional digits': 2 } }, 'expected': "1.00" },
                "one twenty three": { 'input': { 'input': 123, 'parameters': { 'number of fractional digits': 2 } }, 'expected': "1.23" },
                "twelve thirty four": { 'input': { 'input': 1234, 'parameters': { 'number of fractional digits': 2 } }, 'expected': "12.34" },
                "negative one twenty three": { 'input': { 'input': -123, 'parameters': { 'number of fractional digits': 2 } }, 'expected': "-1.23" },
                "negative twelve thirty four": { 'input': { 'input': -1234, 'parameters': { 'number of fractional digits': 2 } }, 'expected': "-12.34" },
                "hundred ninety nine": { 'input': { 'input': 10099, 'parameters': { 'number of fractional digits': 2 } }, 'expected': "100.99" },
                "ten zero five": { 'input': { 'input': 1005, 'parameters': { 'number of fractional digits': 2 } }, 'expected': "10.05" },
                
                // Edge cases
                "zero zero one": { 'input': { 'input': 1, 'parameters': { 'number of fractional digits': 2 } }, 'expected': "0.01" },
                "zero ten": { 'input': { 'input': 10, 'parameters': { 'number of fractional digits': 2 } }, 'expected': "0.10" },
                "large number": { 'input': { 'input': 99999, 'parameters': { 'number of fractional digits': 2 } }, 'expected': "999.99" },
                
                // Different fractional digit counts
                "one fractional digit": { 'input': { 'input': 12, 'parameters': { 'number of fractional digits': 1 } }, 'expected': "1.2" },
                "three fractional digits": { 'input': { 'input': 1234, 'parameters': { 'number of fractional digits': 3 } }, 'expected': "1.234" },
                "four fractional digits": { 'input': { 'input': 12345, 'parameters': { 'number of fractional digits': 4 } }, 'expected': "1.2345" },
                "zero fractional digits": { 'input': { 'input': 123, 'parameters': { 'number of fractional digits': 0 } }, 'expected': "123." },
                
                // Zero cases with different fractional digits
                "zero with 1 decimal": { 'input': { 'input': 0, 'parameters': { 'number of fractional digits': 1 } }, 'expected': "0.0" },
                "zero with 3 decimals": { 'input': { 'input': 0, 'parameters': { 'number of fractional digits': 3 } }, 'expected': "0.000" },
                "negative zero": { 'input': { 'input': 0, 'parameters': { 'number of fractional digits': 2 } }, 'expected': "0.00" },
            }),
        },
    },
    'text': {
        'pad_left': {
            'serializer': _pt.dictionary.literal({
                // Basic padding scenarios
                "no padding needed": { 'input': { 'input': "hello", 'parameters': { 'desired length': 5, 'pad character': 48 } }, 'expected': "hello" },
                "shorter needs padding": { 'input': { 'input': "hi", 'parameters': { 'desired length': 5, 'pad character': 48 } }, 'expected': "000hi" },

                // Zero character (ASCII 48) padding
                "pad with zero": { 'input': { 'input': "123", 'parameters': { 'desired length': 6, 'pad character': 48 } }, 'expected': "000123" },
                "pad single char": { 'input': { 'input': "A", 'parameters': { 'desired length': 4, 'pad character': 48 } }, 'expected': "000A" },

                // Space character (ASCII 32) padding
                "pad with space": { 'input': { 'input': "test", 'parameters': { 'desired length': 8, 'pad character': 32 } }, 'expected': "    test" },

                // Different pad characters
                "pad with asterisk": { 'input': { 'input': "abc", 'parameters': { 'desired length': 6, 'pad character': 42 } }, 'expected': "***abc" },
                "pad with x": { 'input': { 'input': "def", 'parameters': { 'desired length': 7, 'pad character': 120 } }, 'expected': "xxxxdef" },
                "pad with dash": { 'input': { 'input': "text", 'parameters': { 'desired length': 10, 'pad character': 45 } }, 'expected': "------text" },

                // Edge cases
                "empty string": { 'input': { 'input': "", 'parameters': { 'desired length': 3, 'pad character': 48 } }, 'expected': "000" },
                "zero desired length": { 'input': { 'input': "test", 'parameters': { 'desired length': 0, 'pad character': 48 } }, 'expected': "test" },
                "already exact length": { 'input': { 'input': "exact", 'parameters': { 'desired length': 5, 'pad character': 48 } }, 'expected': "exact" },
                "longer than desired": { 'input': { 'input': "toolong", 'parameters': { 'desired length': 4, 'pad character': 48 } }, 'expected': "toolong" },

                // Unicode and special characters in input
                "unicode input": { 'input': { 'input': "café", 'parameters': { 'desired length': 8, 'pad character': 48 } }, 'expected': "0000café" },
                "special chars input": { 'input': { 'input': "@#$", 'parameters': { 'desired length': 6, 'pad character': 48 } }, 'expected': "000@#$" },

                // Different padding amounts
                "one pad": { 'input': { 'input': "word", 'parameters': { 'desired length': 5, 'pad character': 48 } }, 'expected': "0word" },
                "many pads": { 'input': { 'input': "x", 'parameters': { 'desired length': 10, 'pad character': 48 } }, 'expected': "000000000x" }
            }),
        }
    }
}