var assert = require("assert");

function getUnionOfKeys(obj) {
    for (var i = 0, key,
             result = {},
             objs = arguments,
             argc = objs.length;
         i < argc;
         i += 1)
    {
        obj = objs[i];
        for (key in obj)
            if (obj.hasOwnProperty(key))
                result[key] = true;
    }
    return result;
}
exports.getUnionOfKeys = getUnionOfKeys;

exports.assertEquivalent = function(a, b) {
    if (!deepEquivalent(a, b)) {
        assert.ok(false, a + " not equivalent to " + b);
    }
};

function deepEquivalent(a, b) {
    if (a === b)
        return true;

    if (a instanceof Array)
        return deepArrEquiv(a, b);

    if (typeof a === "object")
        return deepObjEquiv(a, b);

    return false;
}
exports.deepEquivalent = deepEquivalent;

function deepArrEquiv(a, b) {
    assert.ok(a instanceof Array);
    var len = a.length;

    if (!(b instanceof Array &&
          b.length === len))
        return false;

    for (var i = 0; i < len; ++i) {
        if (i in a !== i in b)
            return false;

        if (!deepEquivalent(a[i], b[i]))
            return false;
    }

    return true;
}

function deepObjEquiv(a, b) {
    assert.strictEqual(typeof a, "object");
    if (!a || !b || typeof b !== "object")
        return false;

    for (var key in getUnionOfKeys(a, b)) {
        if (key === "loc" ||
            key === "raw")
            continue;

        if (key in a !== key in b)
            return false;

        if (!deepEquivalent(a[key], b[key]))
            return false;
    }

    return true;
}