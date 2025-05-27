var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
import { d as defineComponent, c as createBlock, o as openBlock, w as withCtx, G as renderSlot, m as unref, H as inject, I as provide, J as useId$1, g as ref, A as watch, q as nextTick, K as onUnmounted, B as computed, z as toRefs, x as getCurrentInstance, s as h, L as toHandlerKey, M as camelize, N as toRef, O as watchEffect, P as markRaw, Q as mergeProps, f as createElementBlock, k as renderList, F as Fragment, h as onMounted, a as createVNode, b as createCommentVNode, R as withKeys, E as withModifiers, S as resolveDynamicComponent, C, e as createBaseVNode, D as me, t as toDisplayString, j as createTextVNode } from "./app-CYux1Zp0.js";
import { d as defaultWindow, i as isClient, u as unrefElement, t as toValue, c as useForwardExpose, e as useVModel, _ as _sfc_main$8, a as _sfc_main$9, b as _sfc_main$a } from "./Label.vue_vue_type_script_setup_true_lang-CRr2D0XR.js";
import { _ as _sfc_main$b } from "./TextLink.vue_vue_type_script_setup_true_lang-c4RqYq_2.js";
import { P as Primitive, r as renderSlotFragments, S as Slot, c as createLucideIcon, b as cn, _ as _sfc_main$c, L as LoaderCircle, a as _sfc_main$d } from "./loader-circle-BvgcGN5X.js";
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "VisuallyHidden",
  props: {
    feature: { default: "focusable" },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "aria-hidden": _ctx.feature === "focusable" ? "true" : void 0,
        "data-hidden": _ctx.feature === "fully-hidden" ? "" : void 0,
        tabindex: _ctx.feature === "fully-hidden" ? "-1" : void 0,
        style: {
          // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
          position: "absolute",
          border: 0,
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
          wordWrap: "normal"
        }
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["as", "as-child", "aria-hidden", "data-hidden", "tabindex"]);
    };
  }
});
function createContext(providerComponentName, contextName) {
  const symbolDescription = typeof providerComponentName === "string" && true ? `${providerComponentName}Context` : contextName;
  const injectionKey = Symbol(symbolDescription);
  const injectContext = (fallback) => {
    const context = inject(injectionKey, fallback);
    if (context)
      return context;
    if (context === null)
      return context;
    throw new Error(
      `Injection \`${injectionKey.toString()}\` not found. Component must be used within ${Array.isArray(providerComponentName) ? `one of the following components: ${providerComponentName.join(
        ", "
      )}` : `\`${providerComponentName}\``}`
    );
  };
  const provideContext = (contextValue) => {
    provide(injectionKey, contextValue);
    return contextValue;
  };
  return [injectContext, provideContext];
}
function serialize(o) {
  return typeof o == "string" ? `'${o}'` : new c().serialize(o);
}
const c = /* @__PURE__ */ function() {
  var _t;
  class o {
    constructor() {
      __privateAdd(this, _t, /* @__PURE__ */ new Map());
    }
    compare(t, r) {
      const e = typeof t, n = typeof r;
      return e === "string" && n === "string" ? t.localeCompare(r) : e === "number" && n === "number" ? t - r : String.prototype.localeCompare.call(this.serialize(t, true), this.serialize(r, true));
    }
    serialize(t, r) {
      if (t === null) return "null";
      switch (typeof t) {
        case "string":
          return r ? t : `'${t}'`;
        case "bigint":
          return `${t}n`;
        case "object":
          return this.$object(t);
        case "function":
          return this.$function(t);
      }
      return String(t);
    }
    serializeObject(t) {
      const r = Object.prototype.toString.call(t);
      if (r !== "[object Object]") return this.serializeBuiltInType(r.length < 10 ? `unknown:${r}` : r.slice(8, -1), t);
      const e = t.constructor, n = e === Object || e === void 0 ? "" : e.name;
      if (n !== "" && globalThis[n] === e) return this.serializeBuiltInType(n, t);
      if (typeof t.toJSON == "function") {
        const i = t.toJSON();
        return n + (i !== null && typeof i == "object" ? this.$object(i) : `(${this.serialize(i)})`);
      }
      return this.serializeObjectEntries(n, Object.entries(t));
    }
    serializeBuiltInType(t, r) {
      const e = this["$" + t];
      if (e) return e.call(this, r);
      if (typeof (r == null ? void 0 : r.entries) == "function") return this.serializeObjectEntries(t, r.entries());
      throw new Error(`Cannot serialize ${t}`);
    }
    serializeObjectEntries(t, r) {
      const e = Array.from(r).sort((i, a) => this.compare(i[0], a[0]));
      let n = `${t}{`;
      for (let i = 0; i < e.length; i++) {
        const [a, l] = e[i];
        n += `${this.serialize(a, true)}:${this.serialize(l)}`, i < e.length - 1 && (n += ",");
      }
      return n + "}";
    }
    $object(t) {
      let r = __privateGet(this, _t).get(t);
      return r === void 0 && (__privateGet(this, _t).set(t, `#${__privateGet(this, _t).size}`), r = this.serializeObject(t), __privateGet(this, _t).set(t, r)), r;
    }
    $function(t) {
      const r = Function.prototype.toString.call(t);
      return r.slice(-15) === "[native code] }" ? `${t.name || ""}()[native]` : `${t.name}(${t.length})${r.replace(/\s*\n\s*/g, "")}`;
    }
    $Array(t) {
      let r = "[";
      for (let e = 0; e < t.length; e++) r += this.serialize(t[e]), e < t.length - 1 && (r += ",");
      return r + "]";
    }
    $Date(t) {
      try {
        return `Date(${t.toISOString()})`;
      } catch {
        return "Date(null)";
      }
    }
    $ArrayBuffer(t) {
      return `ArrayBuffer[${new Uint8Array(t).join(",")}]`;
    }
    $Set(t) {
      return `Set${this.$Array(Array.from(t).sort((r, e) => this.compare(r, e)))}`;
    }
    $Map(t) {
      return this.serializeObjectEntries("Map", t.entries());
    }
  }
  _t = new WeakMap();
  for (const s of ["Error", "RegExp", "URL"]) o.prototype["$" + s] = function(t) {
    return `${s}(${t})`;
  };
  for (const s of ["Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array"]) o.prototype["$" + s] = function(t) {
    return `${s}[${t.join(",")}]`;
  };
  for (const s of ["BigInt64Array", "BigUint64Array"]) o.prototype["$" + s] = function(t) {
    return `${s}[${t.join("n,")}${t.length > 0 ? "n" : ""}]`;
  };
  return o;
}();
function isEqual(object1, object2) {
  if (object1 === object2) {
    return true;
  }
  if (serialize(object1) === serialize(object2)) {
    return true;
  }
  return false;
}
function isNullish(value) {
  return value === null || value === void 0;
}
function isValueEqualOrExist(base, current) {
  if (isNullish(base))
    return false;
  if (Array.isArray(base)) {
    return base.some((val) => isEqual(val, current));
  } else {
    return isEqual(base, current);
  }
}
const [injectConfigProviderContext, provideConfigProviderContext] = createContext("ConfigProvider");
let count = 0;
function useId(deterministicId, prefix = "reka") {
  const configProviderContext = injectConfigProviderContext({ useId: void 0 });
  if (useId$1) {
    return `${prefix}-${useId$1()}`;
  } else if (configProviderContext.useId) {
    return `${prefix}-${configProviderContext.useId()}`;
  }
  return `${prefix}-${++count}`;
}
function useStateMachine(initialState, machine) {
  const state = ref(initialState);
  function reducer(event) {
    const nextState = machine[state.value][event];
    return nextState ?? state.value;
  }
  const dispatch = (event) => {
    state.value = reducer(event);
  };
  return {
    state,
    dispatch
  };
}
function usePresence(present, node) {
  var _a;
  const stylesRef = ref({});
  const prevAnimationNameRef = ref("none");
  const prevPresentRef = ref(present);
  const initialState = present.value ? "mounted" : "unmounted";
  let timeoutId;
  const ownerWindow = ((_a = node.value) == null ? void 0 : _a.ownerDocument.defaultView) ?? defaultWindow;
  const { state, dispatch } = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  const dispatchCustomEvent = (name) => {
    var _a2;
    if (isClient) {
      const customEvent = new CustomEvent(name, { bubbles: false, cancelable: false });
      (_a2 = node.value) == null ? void 0 : _a2.dispatchEvent(customEvent);
    }
  };
  watch(
    present,
    async (currentPresent, prevPresent) => {
      var _a2;
      const hasPresentChanged = prevPresent !== currentPresent;
      await nextTick();
      if (hasPresentChanged) {
        const prevAnimationName = prevAnimationNameRef.value;
        const currentAnimationName = getAnimationName(node.value);
        if (currentPresent) {
          dispatch("MOUNT");
          dispatchCustomEvent("enter");
          if (currentAnimationName === "none")
            dispatchCustomEvent("after-enter");
        } else if (currentAnimationName === "none" || currentAnimationName === "undefined" || ((_a2 = stylesRef.value) == null ? void 0 : _a2.display) === "none") {
          dispatch("UNMOUNT");
          dispatchCustomEvent("leave");
          dispatchCustomEvent("after-leave");
        } else {
          const isAnimating = prevAnimationName !== currentAnimationName;
          if (prevPresent && isAnimating) {
            dispatch("ANIMATION_OUT");
            dispatchCustomEvent("leave");
          } else {
            dispatch("UNMOUNT");
            dispatchCustomEvent("after-leave");
          }
        }
      }
    },
    { immediate: true }
  );
  const handleAnimationEnd = (event) => {
    const currentAnimationName = getAnimationName(node.value);
    const isCurrentAnimation = currentAnimationName.includes(
      event.animationName
    );
    const directionName = state.value === "mounted" ? "enter" : "leave";
    if (event.target === node.value && isCurrentAnimation) {
      dispatchCustomEvent(`after-${directionName}`);
      dispatch("ANIMATION_END");
      if (!prevPresentRef.value) {
        const currentFillMode = node.value.style.animationFillMode;
        node.value.style.animationFillMode = "forwards";
        timeoutId = ownerWindow == null ? void 0 : ownerWindow.setTimeout(() => {
          var _a2;
          if (((_a2 = node.value) == null ? void 0 : _a2.style.animationFillMode) === "forwards") {
            node.value.style.animationFillMode = currentFillMode;
          }
        });
      }
    }
    if (event.target === node.value && currentAnimationName === "none")
      dispatch("ANIMATION_END");
  };
  const handleAnimationStart = (event) => {
    if (event.target === node.value) {
      prevAnimationNameRef.value = getAnimationName(node.value);
    }
  };
  const watcher = watch(
    node,
    (newNode, oldNode) => {
      if (newNode) {
        stylesRef.value = getComputedStyle(newNode);
        newNode.addEventListener("animationstart", handleAnimationStart);
        newNode.addEventListener("animationcancel", handleAnimationEnd);
        newNode.addEventListener("animationend", handleAnimationEnd);
      } else {
        dispatch("ANIMATION_END");
        if (timeoutId !== void 0)
          ownerWindow == null ? void 0 : ownerWindow.clearTimeout(timeoutId);
        oldNode == null ? void 0 : oldNode.removeEventListener("animationstart", handleAnimationStart);
        oldNode == null ? void 0 : oldNode.removeEventListener("animationcancel", handleAnimationEnd);
        oldNode == null ? void 0 : oldNode.removeEventListener("animationend", handleAnimationEnd);
      }
    },
    { immediate: true }
  );
  const stateWatcher = watch(state, () => {
    const currentAnimationName = getAnimationName(node.value);
    prevAnimationNameRef.value = state.value === "mounted" ? currentAnimationName : "none";
  });
  onUnmounted(() => {
    watcher();
    stateWatcher();
  });
  const isPresent = computed(
    () => ["mounted", "unmountSuspended"].includes(state.value)
  );
  return {
    isPresent
  };
}
function getAnimationName(node) {
  return node ? getComputedStyle(node).animationName || "none" : "none";
}
const Presence = defineComponent({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: true
    },
    forceMount: {
      type: Boolean
    }
  },
  slots: {},
  setup(props, { slots, expose }) {
    var _a;
    const { present, forceMount } = toRefs(props);
    const node = ref();
    const { isPresent } = usePresence(present, node);
    expose({ present: isPresent });
    let children = slots.default({ present: isPresent.value });
    children = renderSlotFragments(children || []);
    const instance = getCurrentInstance();
    if (children && (children == null ? void 0 : children.length) > 1) {
      const componentName = ((_a = instance == null ? void 0 : instance.parent) == null ? void 0 : _a.type.name) ? `<${instance.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${componentName}\` for  \`Presence\` component.`,
          "",
          "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
          "You can apply a few solutions:",
          [
            "Provide a single child element so that `presence` directive attach correctly.",
            "Ensure the first child is an actual element instead of a raw text node or comment node."
          ].map((line) => `  - ${line}`).join("\n")
        ].join("\n")
      );
    }
    return () => {
      if (forceMount.value || present.value || isPresent.value) {
        return h(slots.default({ present: isPresent.value })[0], {
          ref: (v) => {
            const el = unrefElement(v);
            if (typeof (el == null ? void 0 : el.hasAttribute) === "undefined")
              return el;
            if (el == null ? void 0 : el.hasAttribute("data-reka-popper-content-wrapper"))
              node.value = el.firstElementChild;
            else
              node.value = el;
            return el;
          }
        });
      } else {
        return null;
      }
    };
  }
});
function useEmitAsProps(emit) {
  const vm = getCurrentInstance();
  const events = vm == null ? void 0 : vm.type.emits;
  const result = {};
  if (!(events == null ? void 0 : events.length)) {
    console.warn(
      `No emitted event found. Please check component: ${vm == null ? void 0 : vm.type.__name}`
    );
  }
  events == null ? void 0 : events.forEach((ev) => {
    result[toHandlerKey(camelize(ev))] = (...arg) => emit(ev, ...arg);
  });
  return result;
}
function useForwardProps(props) {
  const vm = getCurrentInstance();
  const defaultProps = Object.keys((vm == null ? void 0 : vm.type.props) ?? {}).reduce((prev, curr) => {
    const defaultValue = (vm == null ? void 0 : vm.type.props[curr]).default;
    if (defaultValue !== void 0)
      prev[curr] = defaultValue;
    return prev;
  }, {});
  const refProps = toRef(props);
  return computed(() => {
    const preservedProps = {};
    const assignedProps = (vm == null ? void 0 : vm.vnode.props) ?? {};
    Object.keys(assignedProps).forEach((key) => {
      preservedProps[camelize(key)] = assignedProps[key];
    });
    return Object.keys({ ...defaultProps, ...preservedProps }).reduce((prev, curr) => {
      if (refProps.value[curr] !== void 0)
        prev[curr] = refProps.value[curr];
      return prev;
    }, {});
  });
}
function useForwardPropsEmits(props, emit) {
  const parsedProps = useForwardProps(props);
  const emitsAsProps = emit ? useEmitAsProps(emit) : {};
  return computed(() => ({
    ...parsedProps.value,
    ...emitsAsProps
  }));
}
function getActiveElement() {
  let activeElement = document.activeElement;
  if (activeElement == null) {
    return null;
  }
  while (activeElement != null && activeElement.shadowRoot != null && activeElement.shadowRoot.activeElement != null) {
    activeElement = activeElement.shadowRoot.activeElement;
  }
  return activeElement;
}
function usePrimitiveElement() {
  const primitiveElement = ref();
  const currentElement = computed(() => {
    var _a, _b;
    return ["#text", "#comment"].includes((_a = primitiveElement.value) == null ? void 0 : _a.$el.nodeName) ? (_b = primitiveElement.value) == null ? void 0 : _b.$el.nextElementSibling : unrefElement(primitiveElement);
  });
  return {
    primitiveElement,
    currentElement
  };
}
function useFormControl(el) {
  return computed(() => {
    var _a;
    return toValue(el) ? Boolean((_a = unrefElement(el)) == null ? void 0 : _a.closest("form")) : true;
  });
}
const MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl")
    return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key))
    return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key))
    return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
      return;
    candidate.focus({ preventScroll });
    if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT)
      return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
const ITEM_DATA_ATTR = "data-reka-collection-item";
function useCollection(options = {}) {
  const { key = "", isProvider = false } = options;
  const injectionKey = `${key}CollectionProvider`;
  let context;
  if (isProvider) {
    const itemMap = ref(/* @__PURE__ */ new Map());
    const collectionRef = ref();
    context = {
      collectionRef,
      itemMap
    };
    provide(injectionKey, context);
  } else {
    context = inject(injectionKey);
  }
  const getItems = (includeDisabledItem = false) => {
    const collectionNode = context.collectionRef.value;
    if (!collectionNode)
      return [];
    const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
    const items = Array.from(context.itemMap.value.values());
    const orderedItems = items.sort(
      (a, b) => orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref)
    );
    if (includeDisabledItem)
      return orderedItems;
    else
      return orderedItems.filter((i) => i.ref.dataset.disabled !== "");
  };
  const CollectionSlot = defineComponent({
    name: "CollectionSlot",
    setup(_, { slots }) {
      const { primitiveElement, currentElement } = usePrimitiveElement();
      watch(currentElement, () => {
        context.collectionRef.value = currentElement.value;
      });
      return () => h(Slot, { ref: primitiveElement }, slots);
    }
  });
  const CollectionItem = defineComponent({
    name: "CollectionItem",
    inheritAttrs: false,
    props: {
      value: {
        // It accepts any value
        validator: () => true
      }
    },
    setup(props, { slots, attrs }) {
      const { primitiveElement, currentElement } = usePrimitiveElement();
      watchEffect((cleanupFn) => {
        if (currentElement.value) {
          const key2 = markRaw(currentElement.value);
          context.itemMap.value.set(key2, { ref: currentElement.value, value: props.value });
          cleanupFn(() => context.itemMap.value.delete(key2));
        }
      });
      return () => h(Slot, { ...attrs, [ITEM_DATA_ATTR]: "", ref: primitiveElement }, slots);
    }
  });
  const reactiveItems = computed(() => Array.from(context.itemMap.value.values()));
  const itemMapSize = computed(() => context.itemMap.value.size);
  return { getItems, reactiveItems, itemMapSize, CollectionSlot, CollectionItem };
}
const [injectRovingFocusGroupContext, provideRovingFocusGroupContext] = createContext("RovingFocusGroup");
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "VisuallyHiddenInputBubble",
  props: {
    name: {},
    value: {},
    checked: { type: Boolean, default: void 0 },
    required: { type: Boolean },
    disabled: { type: Boolean },
    feature: { default: "fully-hidden" }
  },
  setup(__props) {
    const props = __props;
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const valueState = computed(() => props.checked ?? props.value);
    watch(valueState, (cur, prev) => {
      if (!currentElement.value)
        return;
      const input = currentElement.value;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(inputProto, "value");
      const setValue = descriptor.set;
      if (setValue && cur !== prev) {
        const inputEvent = new Event("input", { bubbles: true });
        const changeEvent = new Event("change", { bubbles: true });
        setValue.call(input, cur);
        input.dispatchEvent(inputEvent);
        input.dispatchEvent(changeEvent);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$7, mergeProps({
        ref_key: "primitiveElement",
        ref: primitiveElement
      }, { ...props, ..._ctx.$attrs }, { as: "input" }), null, 16);
    };
  }
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "VisuallyHiddenInput",
  props: {
    name: {},
    value: {},
    checked: { type: Boolean, default: void 0 },
    required: { type: Boolean },
    disabled: { type: Boolean },
    feature: { default: "fully-hidden" }
  },
  setup(__props) {
    const props = __props;
    const isFormArrayEmptyAndRequired = computed(
      () => typeof props.value === "object" && Array.isArray(props.value) && props.value.length === 0 && props.required
    );
    const parsedValue = computed(() => {
      if (typeof props.value === "string" || typeof props.value === "number" || typeof props.value === "boolean") {
        return [{ name: props.name, value: props.value }];
      } else if (typeof props.value === "object" && Array.isArray(props.value)) {
        return props.value.flatMap((obj, index) => {
          if (typeof obj === "object")
            return Object.entries(obj).map(([key, value]) => ({ name: `[${props.name}][${index}][${key}]`, value }));
          else
            return { name: `[${props.name}][${index}]`, value: obj };
        });
      } else if (props.value !== null && typeof props.value === "object" && !Array.isArray(props.value)) {
        return Object.entries(props.value).map(([key, value]) => ({ name: `[${props.name}][${key}]`, value }));
      }
      return [];
    });
    return (_ctx, _cache) => {
      return isFormArrayEmptyAndRequired.value ? (openBlock(), createBlock(_sfc_main$6, mergeProps({ key: _ctx.name }, { ...props, ..._ctx.$attrs }, {
        name: _ctx.name,
        value: _ctx.value
      }), null, 16, ["name", "value"])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(parsedValue.value, (parsed) => {
        return openBlock(), createBlock(_sfc_main$6, mergeProps({
          key: parsed.name,
          ref_for: true
        }, { ...props, ..._ctx.$attrs }, {
          name: parsed.name,
          value: parsed.value
        }), null, 16, ["name", "value"]);
      }), 128));
    };
  }
});
const [injectCheckboxGroupRootContext, provideCheckboxGroupRootContext] = createContext("CheckboxGroupRoot");
function isIndeterminate(checked) {
  return checked === "indeterminate";
}
function getState(checked) {
  return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "RovingFocusItem",
  props: {
    tabStopId: {},
    focusable: { type: Boolean, default: true },
    active: { type: Boolean },
    allowShiftKey: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const props = __props;
    const context = injectRovingFocusGroupContext();
    const randomId = useId();
    const id = computed(() => props.tabStopId || randomId);
    const isCurrentTabStop = computed(
      () => context.currentTabStopId.value === id.value
    );
    const { getItems, CollectionItem } = useCollection();
    onMounted(() => {
      if (props.focusable)
        context.onFocusableItemAdd();
    });
    onUnmounted(() => {
      if (props.focusable)
        context.onFocusableItemRemove();
    });
    function handleKeydown(event) {
      if (event.key === "Tab" && event.shiftKey) {
        context.onItemShiftTab();
        return;
      }
      if (event.target !== event.currentTarget)
        return;
      const focusIntent = getFocusIntent(
        event,
        context.orientation.value,
        context.dir.value
      );
      if (focusIntent !== void 0) {
        if (event.metaKey || event.ctrlKey || event.altKey || (props.allowShiftKey ? false : event.shiftKey))
          return;
        event.preventDefault();
        let candidateNodes = [...getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "")];
        if (focusIntent === "last") {
          candidateNodes.reverse();
        } else if (focusIntent === "prev" || focusIntent === "next") {
          if (focusIntent === "prev")
            candidateNodes.reverse();
          const currentIndex = candidateNodes.indexOf(
            event.currentTarget
          );
          candidateNodes = context.loop.value ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
        }
        nextTick(() => focusFirst(candidateNodes));
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionItem), null, {
        default: withCtx(() => [
          createVNode(unref(Primitive), {
            tabindex: isCurrentTabStop.value ? 0 : -1,
            "data-orientation": unref(context).orientation.value,
            "data-active": _ctx.active ? "" : void 0,
            "data-disabled": !_ctx.focusable ? "" : void 0,
            as: _ctx.as,
            "as-child": _ctx.asChild,
            onMousedown: _cache[0] || (_cache[0] = (event) => {
              if (!_ctx.focusable) event.preventDefault();
              else unref(context).onItemFocus(id.value);
            }),
            onFocus: _cache[1] || (_cache[1] = ($event) => unref(context).onItemFocus(id.value)),
            onKeydown: handleKeydown
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["tabindex", "data-orientation", "data-active", "data-disabled", "as", "as-child"])
        ]),
        _: 3
      });
    };
  }
});
const [injectCheckboxRootContext, provideCheckboxRootContext] = createContext("CheckboxRoot");
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "CheckboxRoot",
  props: {
    defaultValue: { type: [Boolean, String] },
    modelValue: { type: [Boolean, String, null], default: void 0 },
    disabled: { type: Boolean },
    value: { default: "on" },
    id: {},
    asChild: { type: Boolean },
    as: { default: "button" },
    name: {},
    required: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { forwardRef, currentElement } = useForwardExpose();
    const checkboxGroupContext = injectCheckboxGroupRootContext(null);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const disabled = computed(() => (checkboxGroupContext == null ? void 0 : checkboxGroupContext.disabled.value) || props.disabled);
    const checkboxState = computed(() => {
      if (!isNullish(checkboxGroupContext == null ? void 0 : checkboxGroupContext.modelValue.value)) {
        return isValueEqualOrExist(checkboxGroupContext.modelValue.value, props.value);
      } else {
        return modelValue.value === "indeterminate" ? "indeterminate" : modelValue.value;
      }
    });
    function handleClick() {
      if (!isNullish(checkboxGroupContext == null ? void 0 : checkboxGroupContext.modelValue.value)) {
        const modelValueArray = [...checkboxGroupContext.modelValue.value || []];
        if (isValueEqualOrExist(modelValueArray, props.value)) {
          const index = modelValueArray.findIndex((i) => isEqual(i, props.value));
          modelValueArray.splice(index, 1);
        } else {
          modelValueArray.push(props.value);
        }
        checkboxGroupContext.modelValue.value = modelValueArray;
      } else {
        modelValue.value = isIndeterminate(modelValue.value) ? true : !modelValue.value;
      }
    }
    const isFormControl = useFormControl(currentElement);
    const ariaLabel = computed(() => {
      var _a;
      return props.id && currentElement.value ? (_a = document.querySelector(`[for="${props.id}"]`)) == null ? void 0 : _a.innerText : void 0;
    });
    provideCheckboxRootContext({
      disabled,
      state: checkboxState
    });
    return (_ctx, _cache) => {
      var _a, _b;
      return openBlock(), createBlock(resolveDynamicComponent(((_a = unref(checkboxGroupContext)) == null ? void 0 : _a.rovingFocus.value) ? unref(_sfc_main$4) : unref(Primitive)), mergeProps(_ctx.$attrs, {
        id: _ctx.id,
        ref: unref(forwardRef),
        role: "checkbox",
        "as-child": _ctx.asChild,
        as: _ctx.as,
        type: _ctx.as === "button" ? "button" : void 0,
        "aria-checked": unref(isIndeterminate)(checkboxState.value) ? "mixed" : checkboxState.value,
        "aria-required": _ctx.required,
        "aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value,
        "data-state": unref(getState)(checkboxState.value),
        "data-disabled": disabled.value ? "" : void 0,
        disabled: disabled.value,
        focusable: ((_b = unref(checkboxGroupContext)) == null ? void 0 : _b.rovingFocus.value) ? !disabled.value : void 0,
        onKeydown: withKeys(withModifiers(() => {
        }, ["prevent"]), ["enter"]),
        onClick: handleClick
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {
            modelValue: unref(modelValue),
            state: checkboxState.value
          }),
          unref(isFormControl) && _ctx.name && !unref(checkboxGroupContext) ? (openBlock(), createBlock(unref(_sfc_main$5), {
            key: 0,
            type: "checkbox",
            checked: !!checkboxState.value,
            name: _ctx.name,
            value: _ctx.value,
            disabled: disabled.value,
            required: _ctx.required
          }, null, 8, ["checked", "name", "value", "disabled", "required"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 16, ["id", "as-child", "as", "type", "aria-checked", "aria-required", "aria-label", "data-state", "data-disabled", "disabled", "focusable", "onKeydown"]);
    };
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CheckboxIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(__props) {
    const { forwardRef } = useForwardExpose();
    const rootContext = injectCheckboxRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence), {
        present: _ctx.forceMount || unref(isIndeterminate)(unref(rootContext).state.value) || unref(rootContext).state.value === true
      }, {
        default: withCtx(() => [
          createVNode(unref(Primitive), mergeProps({
            ref: unref(forwardRef),
            "data-state": unref(getState)(unref(rootContext).state.value),
            "data-disabled": unref(rootContext).disabled.value ? "" : void 0,
            style: { pointerEvents: "none" },
            "as-child": _ctx.asChild,
            as: _ctx.as
          }, _ctx.$attrs), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["data-state", "data-disabled", "as-child", "as"])
        ]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Check = createLucideIcon("CheckIcon", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Checkbox",
  props: {
    defaultValue: { type: [Boolean, String] },
    modelValue: { type: [Boolean, String, null] },
    disabled: { type: Boolean },
    value: {},
    id: {},
    asChild: { type: Boolean },
    as: {},
    name: {},
    required: { type: Boolean },
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(_sfc_main$3), mergeProps({ "data-slot": "checkbox" }, unref(forwarded), {
        class: unref(cn)(
          "peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
          props.class
        )
      }), {
        default: withCtx(() => [
          createVNode(unref(_sfc_main$2), {
            "data-slot": "checkbox-indicator",
            class: "flex items-center justify-center text-current transition-none"
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(Check), { class: "size-3.5" })
              ])
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 16, ["class"]);
    };
  }
});
const _hoisted_1 = {
  key: 0,
  class: "mb-4 text-center text-sm font-medium text-green-600"
};
const _hoisted_2 = { class: "grid gap-6" };
const _hoisted_3 = { class: "grid gap-2" };
const _hoisted_4 = { class: "grid gap-2" };
const _hoisted_5 = { class: "flex items-center justify-between" };
const _hoisted_6 = {
  class: "flex items-center justify-between",
  tabindex: 3
};
const _hoisted_7 = { class: "text-center text-sm text-muted-foreground" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Login",
  props: {
    status: {},
    canResetPassword: { type: Boolean }
  },
  setup(__props) {
    const form = C({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$d, {
        title: "Log in to your account",
        description: "Enter your email and password below to log in"
      }, {
        default: withCtx(() => [
          createVNode(unref(me), { title: "Log in" }),
          _ctx.status ? (openBlock(), createElementBlock("div", _hoisted_1, toDisplayString(_ctx.status), 1)) : createCommentVNode("", true),
          createBaseVNode("form", {
            onSubmit: withModifiers(submit, ["prevent"]),
            class: "flex flex-col gap-6"
          }, [
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, [
                createVNode(unref(_sfc_main$8), { for: "email" }, {
                  default: withCtx(() => _cache[3] || (_cache[3] = [
                    createTextVNode("Email address")
                  ])),
                  _: 1
                }),
                createVNode(unref(_sfc_main$9), {
                  id: "email",
                  type: "email",
                  required: "",
                  autofocus: "",
                  tabindex: 1,
                  autocomplete: "email",
                  modelValue: unref(form).email,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(form).email = $event),
                  placeholder: "email@example.com"
                }, null, 8, ["modelValue"]),
                createVNode(_sfc_main$a, {
                  message: unref(form).errors.email
                }, null, 8, ["message"])
              ]),
              createBaseVNode("div", _hoisted_4, [
                createBaseVNode("div", _hoisted_5, [
                  createVNode(unref(_sfc_main$8), { for: "password" }, {
                    default: withCtx(() => _cache[4] || (_cache[4] = [
                      createTextVNode("Password")
                    ])),
                    _: 1
                  }),
                  _ctx.canResetPassword ? (openBlock(), createBlock(_sfc_main$b, {
                    key: 0,
                    href: _ctx.route("password.request"),
                    class: "text-sm",
                    tabindex: 5
                  }, {
                    default: withCtx(() => _cache[5] || (_cache[5] = [
                      createTextVNode(" Forgot password? ")
                    ])),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ]),
                createVNode(unref(_sfc_main$9), {
                  id: "password",
                  type: "password",
                  required: "",
                  tabindex: 2,
                  autocomplete: "current-password",
                  modelValue: unref(form).password,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(form).password = $event),
                  placeholder: "Password"
                }, null, 8, ["modelValue"]),
                createVNode(_sfc_main$a, {
                  message: unref(form).errors.password
                }, null, 8, ["message"])
              ]),
              createBaseVNode("div", _hoisted_6, [
                createVNode(unref(_sfc_main$8), {
                  for: "remember",
                  class: "flex items-center space-x-3"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(_sfc_main$1), {
                      id: "remember",
                      modelValue: unref(form).remember,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(form).remember = $event),
                      tabindex: 4
                    }, null, 8, ["modelValue"]),
                    _cache[6] || (_cache[6] = createBaseVNode("span", null, "Remember me", -1))
                  ]),
                  _: 1
                })
              ]),
              createVNode(unref(_sfc_main$c), {
                type: "submit",
                class: "mt-4 w-full",
                tabindex: 4,
                disabled: unref(form).processing
              }, {
                default: withCtx(() => [
                  unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                    key: 0,
                    class: "h-4 w-4 animate-spin"
                  })) : createCommentVNode("", true),
                  _cache[7] || (_cache[7] = createTextVNode(" Log in "))
                ]),
                _: 1
              }, 8, ["disabled"])
            ]),
            createBaseVNode("div", _hoisted_7, [
              _cache[9] || (_cache[9] = createTextVNode(" Don't have an account? ")),
              createVNode(_sfc_main$b, {
                href: _ctx.route("register"),
                tabindex: 5
              }, {
                default: withCtx(() => _cache[8] || (_cache[8] = [
                  createTextVNode("Sign up")
                ])),
                _: 1
              }, 8, ["href"])
            ])
          ], 32)
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
