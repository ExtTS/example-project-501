define(["require", "exports", "libs/subs/ClassB"], function (require, exports, ClassB_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ClassA = /** @class */ (function () {
        function ClassA() {
            this.name = "";
        }
        ClassA.Test = function () {
            ClassB_1.ClassB.Test();
        };
        ClassA.prototype.handler = function () {
        };
        ClassA.CONSTANT = 5;
        return ClassA;
    }());
    exports.ClassA = ClassA;
});
//# sourceMappingURL=ClassA.js.map