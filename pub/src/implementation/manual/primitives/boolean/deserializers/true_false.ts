import * as _pds from 'pareto-core/dist/deserializer'

import * as signatures from "../../../../../interface/signatures"

export const deserialize: signatures.deserializers.primitives.boolean.true_false = ($, abort) => $ === "true"
    ? true
    : $ === "false"
        ? false
        : abort("HANDLE UNEXPECTED VALUE!")