import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import * as signatures from "../../../../../interface/signatures"


export const serialize: signatures.serializers.primitives.boolean.true_false = ($) => {
    return $ ? _p_list_from_text("true", ($) => $) : _p_list_from_text("false", ($) => $)
}