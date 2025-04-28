import { p as defineComponent, S as withDirectives, T as vShow, b as createElementBlock, o as openBlock, d as createBaseVNode, t as toDisplayString, U as toValue$1, v as getCurrentInstance, r as ref, l as watch, z as nextTick, i as computed, c as createBlock, w as withCtx, E as renderSlot, P as mergeProps, A as unref, V as vModelText, n as normalizeClass, W as isRef } from "./app-CJD2jHJs.js";
import { P as Primitive, b as cn } from "./loader-circle-B-M_zfMy.js";
const _hoisted_1 = { class: "text-sm text-red-600 dark:text-red-500" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "InputError",
  props: {
    message: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", null, [
        createBaseVNode("p", _hoisted_1, toDisplayString(_ctx.message), 1)
      ], 512)), [
        [vShow, _ctx.message]
      ]);
    };
  }
});
const isClient = typeof window !== "undefined" && typeof document !== "undefined";
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const isDef = (val) => typeof val !== "undefined";
const toValue = toValue$1;
const defaultWindow = isClient ? window : void 0;
function unrefElement(elRef) {
  var _a;
  const plain = toValue$1(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function cloneFnJSON(source) {
  return JSON.parse(JSON.stringify(source));
}
function useVModel(props, key, emit, options = {}) {
  var _a, _b, _c;
  const {
    clone = false,
    passive = false,
    eventName,
    deep = false,
    defaultValue,
    shouldEmit
  } = options;
  const vm = getCurrentInstance();
  const _emit = emit || (vm == null ? void 0 : vm.emit) || ((_a = vm == null ? void 0 : vm.$emit) == null ? void 0 : _a.bind(vm)) || ((_c = (_b = vm == null ? void 0 : vm.proxy) == null ? void 0 : _b.$emit) == null ? void 0 : _c.bind(vm == null ? void 0 : vm.proxy));
  let event = eventName;
  event = event || `update:${key.toString()}`;
  const cloneFn = (val) => !clone ? val : typeof clone === "function" ? clone(val) : cloneFnJSON(val);
  const getValue2 = () => isDef(props[key]) ? cloneFn(props[key]) : defaultValue;
  const triggerEmit = (value) => {
    if (shouldEmit) {
      if (shouldEmit(value))
        _emit(event, value);
    } else {
      _emit(event, value);
    }
  };
  if (passive) {
    const initialValue = getValue2();
    const proxy = ref(initialValue);
    let isUpdating = false;
    watch(
      () => props[key],
      (v) => {
        if (!isUpdating) {
          isUpdating = true;
          proxy.value = cloneFn(v);
          nextTick(() => isUpdating = false);
        }
      }
    );
    watch(
      proxy,
      (v) => {
        if (!isUpdating && (v !== props[key] || deep))
          triggerEmit(v);
      },
      { deep }
    );
    return proxy;
  } else {
    return computed({
      get() {
        return getValue2();
      },
      set(value) {
        triggerEmit(value);
      }
    });
  }
}
function useForwardExpose() {
  const instance = getCurrentInstance();
  const currentRef = ref();
  const currentElement = computed(() => {
    var _a, _b;
    return ["#text", "#comment"].includes((_a = currentRef.value) == null ? void 0 : _a.$el.nodeName) ? (_b = currentRef.value) == null ? void 0 : _b.$el.nextElementSibling : unrefElement(currentRef);
  });
  const localExpose = Object.assign({}, instance.exposed);
  const ret = {};
  for (const key in instance.props) {
    Object.defineProperty(ret, key, {
      enumerable: true,
      configurable: true,
      get: () => instance.props[key]
    });
  }
  if (Object.keys(localExpose).length > 0) {
    for (const key in localExpose) {
      Object.defineProperty(ret, key, {
        enumerable: true,
        configurable: true,
        get: () => localExpose[key]
      });
    }
  }
  Object.defineProperty(ret, "$el", {
    enumerable: true,
    configurable: true,
    get: () => instance.vnode.el
  });
  instance.exposed = ret;
  function forwardRef(ref2) {
    currentRef.value = ref2;
    if (!ref2)
      return;
    Object.defineProperty(ret, "$el", {
      enumerable: true,
      configurable: true,
      get: () => ref2 instanceof Element ? ref2 : ref2.$el
    });
    instance.exposed = ret;
  }
  return { forwardRef, currentRef, currentElement };
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Label",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { default: "label" }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        onMousedown: _cache[0] || (_cache[0] = (event) => {
          if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
        })
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Input",
  props: {
    defaultValue: {},
    modelValue: {},
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits, {
      passive: true,
      defaultValue: props.defaultValue
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("input", {
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null),
        "data-slot": "input",
        class: normalizeClass(unref(cn)(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          props.class
        ))
      }, null, 2)), [
        [vModelText, unref(modelValue)]
      ]);
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Label",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$2), mergeProps({ "data-slot": "label" }, delegatedProps.value, {
        class: unref(cn)(
          "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          props.class
        )
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["class"]);
    };
  }
});
export {
  _sfc_main as _,
  _sfc_main$1 as a,
  _sfc_main$3 as b,
  useForwardExpose as c,
  defaultWindow as d,
  useVModel as e,
  isClient as i,
  toValue as t,
  unrefElement as u
};
