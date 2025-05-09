import { u as useDisplay, r as ref, a as resolveComponent, c as createElementBlock, o as openBlock, b as createStaticVNode, d as createVNode, w as withCtx, n as normalizeClass, e as createBlock, f as createCommentVNode, g as unref, h as createBaseVNode, i as createTextVNode, t as toDisplayString, F as Fragment } from "./app-COAw10yy.js";
import { _ as _export_sfc, a as _sfc_main$1, b as _sfc_main$2, M as MarketStatus, L as LiveStocksTable, I as IntradayGraph, F as FooterComponent } from "./FooterComponent-nNKdLpgl.js";
const _sfc_main = {
  __name: "CompanyProfilePage",
  props: {
    symbol: String,
    asset_details: Object
  },
  setup(__props) {
    var _a;
    const { smAndDown } = useDisplay();
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
      const _component_v_divider = resolveComponent("v-divider");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_main = resolveComponent("v-main");
      const _component_v_layout = resolveComponent("v-layout");
      const _component_v_sheet = resolveComponent("v-sheet");
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[2] || (_cache[2] = createStaticVNode('<head data-v-616d8775><meta charset="UTF-8" data-v-616d8775><meta name="viewport" content="width=device-width, initial-scale=1.0" data-v-616d8775><meta http-equiv="X-UA-Compatible" content="ie=edge" data-v-616d8775><title data-v-616d8775>All Global Data</title><meta name="description" content="We are a Financial Data repository with a focus on Public Companies and their Fundamental data." data-v-616d8775></head><link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet" data-v-616d8775>', 2)),
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
                      class: "pa-0 pa-sm-5 ma-0",
                      "no-gutters": ""
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
                          class: "pa-0 pa-sm-5 ma-0",
                          "no-gutters": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_col, {
                              cols: "12",
                              sm: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode(LiveStocksTable, {
                                  title: __props.asset_details.name,
                                  symbols: symbol_array.value,
                                  onShowGraph: updateSymbol,
                                  chartButton: false
                                }, null, 8, ["title", "symbols"]),
                                unref(smAndDown) ? (openBlock(), createBlock(IntradayGraph, {
                                  symbol: symbol.value,
                                  previous_close: previousClose.value,
                                  key: symbol.value
                                }, null, 8, ["symbol", "previous_close"])) : createCommentVNode("", true),
                                createVNode(_component_v_card, {
                                  style: { "border": "1px solid rgba(255, 255, 255, 0.5)", "padding-bottom": ".5em" },
                                  color: "primary"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_col, { cols: "3" }, {
                                      default: withCtx(() => _cache[0] || (_cache[0] = [
                                        createBaseVNode("strong", null, "Description:", -1)
                                      ])),
                                      _: 1
                                    }),
                                    createVNode(_component_v_col, { cols: "12" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(__props.asset_details.description), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_divider, { class: "my-3" }),
                                    createVNode(_component_v_col, { cols: "3" }, {
                                      default: withCtx(() => _cache[1] || (_cache[1] = [
                                        createBaseVNode("strong", null, "Total Employees:", -1)
                                      ])),
                                      _: 1
                                    }),
                                    createVNode(_component_v_col, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(__props.asset_details.total_employees), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            !unref(smAndDown) ? (openBlock(), createBlock(_component_v_col, {
                              key: 0,
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
                            })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(FooterComponent)
                  ]),
                  _: 1
                }, 8, ["class"])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ], 64);
    };
  }
};
const CompanyProfilePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-616d8775"]]);
export {
  CompanyProfilePage as default
};
