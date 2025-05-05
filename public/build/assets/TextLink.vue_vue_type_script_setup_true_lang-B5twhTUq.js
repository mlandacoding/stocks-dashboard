import { p as defineComponent, c as createBlock, o as openBlock, A as unref, X as Pe, w as withCtx, E as renderSlot } from "./app-oWvZKKRr.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TextLink",
  props: {
    href: {},
    tabindex: {},
    method: {},
    as: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Pe), {
        href: _ctx.href,
        tabindex: _ctx.tabindex,
        method: _ctx.method,
        as: _ctx.as,
        class: "text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["href", "tabindex", "method", "as"]);
    };
  }
});
export {
  _sfc_main as _
};
