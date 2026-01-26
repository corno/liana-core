import * as _p from 'pareto-core/dist/serializer'

import * as signatures from "../../../../../interface/signatures"

export const serialize: signatures.serializers.primitives.boolean.true_false = ($) => {
    return $ ? "true" : "false"
}