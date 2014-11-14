/**
 * Created by 2014-11-06 on 2014/11/13.
 */
function isFunction( fn ) {
    return  !!fn && !fn.nodeName && fn.constructor != String &&
    fn.constructor != RegExp && fn.constructor != Array &&
    /function/i.test( fn + "" );
}

var initializing = false;
function Class(baseClass, prop) {
// 只接受一个参数的情况 - Class(prop)
    if (typeof (baseClass) === "object") {
        prop = baseClass;
        baseClass = null;
    }
// 本次调用所创建的类（构造函数）
    function F() {
// 如果当前处于实例化类的阶段，则调用init原型函数
        if (!initializing) {
// 如果父类存在，则实例对象的baseprototype指向父类的原型
// 这就提供了在实例对象中调用父类方法的途径
            if (baseClass) {
                this.baseprototype = baseClass.prototype;
            }
            this.construct.apply(this, arguments);
        }
    }
// 如果此类需要从其它类扩展
    if (baseClass) {
        initializing = true;
        F.prototype = new baseClass();
        F.prototype.constructor = F;
        initializing = false;
    }
// 覆盖父类的同名函数
    for (var property in prop) {
        //console.log(property);
        if (prop.hasOwnProperty(property)) {
// 如果此类继承自父类baseClass并且父类原型中存在同名函数property
            if (baseClass &&
                typeof (prop[property]) === "function" &&
                typeof (F.prototype[property]) === "function") {
// 重定义函数property -
// 首先在函数上下文设置this.parent指向父类原型中的同名函数
// 然后调用函数prop[property]，返回函数结果
// 注意：这里的自执行函数创建了一个上下文，这个上下文返回另一个函数，
// 此函数中可以应用此上下文中的变量，这就是闭包（Closure）。
// 这是JavaScript框架开发中常用的技巧。
                F.prototype[property] = (function (property, fn) {
                    return function () {
                        this.super = baseClass.prototype[property];
                        return fn.apply(this, arguments);
                    };
                })(property, prop[property]);
            } else {
                F.prototype[property] = prop[property];
            }
        }
    }
    return F;
};