import { r as ref, a as resolveComponent, c as createElementBlock, o as openBlock, b as createStaticVNode, d as createVNode, w as withCtx, n as normalizeClass, e as createBlock, F as Fragment } from "./app-BBkNXwKj.js";
import { _ as _export_sfc, a as _sfc_main$1, b as _sfc_main$2, M as MarketStatus, L as LiveStocksTable, I as IntradayGraph, F as FooterComponent } from "./FooterComponent-zAGaa51D.js";
const _sfc_main = {
  __name: "CompanyProfilePage",
  props: {
    symbol: String
  },
  setup(__props) {
    var _a;
    const props = __props;
    const symbol = ref(props.symbol);
    const normalizedSymbol = ((_a = props.symbol) == null ? void 0 : _a.toUpperCase()) ?? "";
    const symbol_array = ref([normalizedSymbol]);
    const previousClose = ref("");
    const drawer = ref(false);
    const handleDrawerToggle = (value) => {
      drawer.value = value;
    };
    function updateSymbol({ sym, previous_close }) {
      symbol.value = sym;
      symbol_array.value = [sym];
      previousClose.value = previous_close;
    }
    return (_ctx, _cache) => {
      const _component_v_col = resolveComponent("v-col");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_main = resolveComponent("v-main");
      const _component_v_layout = resolveComponent("v-layout");
      const _component_v_sheet = resolveComponent("v-sheet");
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[0] || (_cache[0] = createStaticVNode('<head data-v-76c6f50f><meta charset="UTF-8" data-v-76c6f50f><meta name="viewport" content="width=device-width, initial-scale=1.0" data-v-76c6f50f><meta http-equiv="X-UA-Compatible" content="ie=edge" data-v-76c6f50f><title data-v-76c6f50f>All Global Data</title><meta name="description" content="We are a Financial Data repository with a focus on Public Companies and their Fundamental data." data-v-76c6f50f></head><link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet" data-v-76c6f50f>', 2)),
        createVNode(_component_v_sheet, { class: "custom-width-wrapper" }, {
          default: withCtx(() => [
            createVNode(_component_v_layout, { style: { "background": "#0c1427" } }, {
              default: withCtx(() => [
                createVNode(_sfc_main$1, { onToggleDrawer: handleDrawerToggle }),
                createVNode(_sfc_main$2, {
                  drawer: drawer.value,
                  "onUpdate:drawer": handleDrawerToggle
                }, null, 8, ["drawer"]),
                createVNode(_component_v_main, {
                  class: normalizeClass({ "content-expanded": !drawer.value, "content-shrinked": drawer.value })
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_container, {
                      fluid: "",
                      class: "pa-0 pa-sm-5 ma-0"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_row, { justify: "end" }, {
                          default: withCtx(() => [
                            createVNode(_component_v_col, { cols: "auto" }, {
                              default: withCtx(() => [
                                createVNode(MarketStatus)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_row, {
                          justify: "center",
                          class: "mb-4",
                          "no-gutters": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(LiveStocksTable, {
                              title: "",
                              symbols: symbol_array.value,
                              onShowGraph: updateSymbol,
                              chartButton: false
                            }, null, 8, ["symbols"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_row, { justify: "center" }, {
                          default: withCtx(() => [
                            createVNode(_component_v_col, {
                              cols: "12",
                              sm: "8"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(IntradayGraph, {
                                  symbol: symbol.value,
                                  previous_close: previousClose.value,
                                  key: symbol.value
                                }, null, 8, ["symbol", "previous_close"]))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["class"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(FooterComponent)
      ], 64);
    };
  }
};
const CompanyProfilePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-76c6f50f"]]);
export {
  CompanyProfilePage as default
};
