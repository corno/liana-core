# Number Formats to Consider

This document is an implementation pointer and checklist of numeric (and number-adjacent) formats that may be worth supporting explicitly via serializers/deserializers. The goal is to avoid implicit or magical interpretation and to make semantics explicit and reviewable.

---

## 1. Core positional numeric formats (already covered)

These are assumed to exist and are listed here only for completeness.

- `decimal`
- `fractional_decimal`
- `binary`
- `octal`
- `hexadecimal`
- `scientific_notation`

---

## 2. Additional positional or quasi-positional formats

### 2.1 Sexagesimal-derived formats (base-60)

These appear frequently in time, angles, navigation, and astronomy.

Examples:
- Time: `HH:MM:SS(.sss)`
- Angles: `D° M′ S″`

Notes:
- These are numeric, but with structured bases.
- Excel internally represents time as fractions of a day (hidden behavior).

Suggested serializers:
- `sexagesimal_time`
- `sexagesimal_angle`

---

### 2.2 Roman numerals

Still used in:
- Legal documents
- Historical texts
- Page numbering
- Clock faces

Properties:
- Non-positional
- Bounded in practical use

Suggested serializer:
- `roman_numeral`

---

## 3. Engineering and scaled numeric formats

### 3.1 Engineering notation

A constrained form of scientific notation where the exponent is a multiple of 3.

Examples:
- `1.23e6`
- `470e-9`

Common in electronics and engineering specifications.

Suggested serializer:
- `engineering_notation`

---

### 3.2 SI-prefixed decimals

Numbers using SI prefixes rather than explicit exponents.

Examples:
- `10 kΩ`
- `3.3 µF`
- `5 MW`

Notes:
- Prefix encodes a power of 10
- Often mixed with units and non-ASCII symbols

Suggested serializer:
- `si_prefixed_decimal`

---

### 3.3 Percent, permille, and basis points

Often treated as formatting in tools like Excel, but semantically represent scaled values.

Examples:
- `12%` → `0.12`
- `5‰` → `0.005`
- Basis points (finance): `bp`

Suggested serializer:
- `scaled_decimal` (with explicit scale metadata)

---

## 4. Temporal numeric formats

### 4.1 ISO-based dates (already covered)

- `iso_date`

---

### 4.2 Excel serial dates (high priority)

Excel supports two incompatible date systems:

- **1900 date system**
  - Day 1 = 1900-01-01
  - Includes the fictitious 1900-02-29
- **1904 date system** (older macOS Excel)

Suggested serializers:
- `excel_serial_date_1900`
- `excel_serial_date_1904`

---

### 4.3 Unix-derived timestamps

Numeric timestamps relative to an epoch.

Common variants:
- Seconds since Unix epoch
- Milliseconds since Unix epoch
- Nanoseconds since Unix epoch

Suggested serializers:
- `unix_timestamp_seconds`
- `unix_timestamp_millis`
- `unix_timestamp_nanos`

Notes:
- Epoch choice matters (Unix, GPS, TAI, etc.)
- Signed vs unsigned may differ

---

### 4.4 Alternative calendar systems

These are not mere formatting differences; they encode different mappings to days.

Examples:
- Hebrew calendar
- Islamic (Hijri) calendar
- Julian calendar
- Japanese era calendar
- Buddhist calendar

Suggested serializers:
- `hebrew_date`
- `islamic_date`
- `julian_date`
- `japanese_era_date`

---

### 4.5 Ordinal and week-based dates

Defined in ISO but often overlooked.

Examples:
- Ordinal date: `YYYY-DDD` (day of year)
- Week date: `YYYY-Www-D`

---

## 5. Rational and fractional formats

### 5.1 Explicit rational ratios

Distinct from decimal representations.

Examples:
- `1/4`
- `22/7`

Suggested serializer:
- `rational_ratio`

---

### 5.2 Mixed fractions

Common in construction, cooking, and informal usage.

Examples:
- `1 3/8`

Suggested serializer:
- `mixed_fraction`

Notes:
- Excel may misinterpret these as dates unless formatting is forced

---

## 6. Numeric-looking but non-numeric encodings

These should generally *not* be treated as numbers, but are worth explicitly recognizing.

### 6.1 Zero-padded numeric identifiers

Examples:
- ZIP codes
- Account numbers
- Product codes

Risks:
- Loss of leading zeros
- Accidental numeric coercion

---

### 6.2 Check-digit numbers

Digit strings with internal validation rules.

Examples:
- ISBN-10 / ISBN-13
- IBAN
- Credit card numbers

Suggested serializer:
- `check_digit_number` (parameterized by scheme)

---

## 7. Excel-specific reinterpretation hazards (awareness list)

Excel performs many implicit conversions that should be explicitly avoided:

- `1-2` → date
- `3/4` → date or fraction (locale-dependent)
- `1E10` → scientific notation
- Leading `=` → formula
- Locale-dependent decimal separators (`1,23` vs `1.23`)

These are not formats to support, but behaviors to defend against.

---

## 8. Conceptual taxonomy

For implementation and classification purposes, formats tend to fall into these groups:

1. **Positional numeric bases**
   - decimal, binary, octal, hexadecimal, sexagesimal
2. **Scaled decimals**
   - percent, SI prefixes, engineering notation
3. **Structured rationals**
   - fractions, ratios, mixed numbers
4. **Temporal numbers**
   - ISO dates, Excel serial dates, Unix timestamps, calendar-specific dates
5. **Symbolic numerics**
   - Roman numerals
6. **Pseudo-numerics**
   - Identifiers, check-digit codes

This categorization helps keep semantics explicit and avoids frog-to-prince transformations.

