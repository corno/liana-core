
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

import * as signatures from "../../../../../interface/signatures"

export const deserialize: signatures.deserializers.primitives.boolean.true_false = ($, abort) => {
    const as_string = _p_text_from_list($, ($) => $)
    return as_string === "true"
    ? true
    : as_string === "false"
        ? false
        : abort("HANDLE UNEXPECTED VALUE!")
}