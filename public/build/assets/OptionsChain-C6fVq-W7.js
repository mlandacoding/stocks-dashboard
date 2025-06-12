import { g as ref, h as onMounted, r as resolveComponent, f as createElementBlock, o as openBlock, e as createBaseVNode, a as createVNode, w as withCtx, n as normalizeClass, j as createTextVNode, F as Fragment, k as renderList, p as normalizeStyle, t as toDisplayString } from "./app-QYOQF0v9.js";
import { _ as _export_sfc, a as _sfc_main$1, b as _sfc_main$2, M as MarketStatus, F as FooterComponent } from "./FooterComponent-BSU4I882.js";
import { L as LiveSingleStockComponent } from "./LiveSingleStockComponent-ZSA6MrXf.js";
import "./useStockStream-BRoWc8OK.js";
const _hoisted_1 = ["rowspan"];
const _hoisted_2 = ["rowspan"];
const _hoisted_3 = ["rowspan"];
const _hoisted_4 = { style: { "display": "none" } };
const _hoisted_5 = ["rowspan"];
const _hoisted_6 = ["rowspan"];
const _hoisted_7 = ["rowspan"];
const _hoisted_8 = { style: { "display": "none" } };
const _sfc_main = {
  __name: "OptionsChain",
  props: {
    symbol: String
  },
  setup(__props) {
    const props = __props;
    ref(false);
    const symbolArr = ref([props.symbol]);
    const drawer = ref(false);
    const optionsChainCalls = ref([]);
    const optionsChainPuts = ref([]);
    const groupedCalls = ref([]);
    const groupedPuts = ref([]);
    const handleDrawerToggle = (value) => {
      drawer.value = value;
    };
    onMounted(async () => {
      try {
        const optionsCallsRes = await fetch(`/getChainCallsByUnderlyingAsset/${props.symbol}`);
        const optionsPutsRes = await fetch(`/getChainPutsByUnderlyingAsset/${props.symbol}`);
        optionsChainCalls.value = await optionsCallsRes.json();
        optionsChainPuts.value = await optionsPutsRes.json();
        groupedCalls.value = groupOptionsBySymbol(optionsChainCalls);
        groupedPuts.value = groupOptionsBySymbol(optionsChainPuts);
      } catch (error) {
        console.error("Failed to fetch options chain:", error);
      }
    });
    function groupOptionsBySymbol(optionChainValues) {
      const map = {};
      for (const row of optionChainValues.value) {
        if (!map[row.option_symbol]) map[row.option_symbol] = [];
        map[row.option_symbol].push(row);
      }
      return map;
    }
    function formatNullable(value) {
      return value !== null ? value : "NULL";
    }
    return (_ctx, _cache) => {
      const _component_v_col = resolveComponent("v-col");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_alert = resolveComponent("v-alert");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_chip = resolveComponent("v-chip");
      const _component_v_table = resolveComponent("v-table");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_main = resolveComponent("v-main");
      const _component_v_layout = resolveComponent("v-layout");
      const _component_v_sheet = resolveComponent("v-sheet");
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[7] || (_cache[7] = createBaseVNode("link", {
          href: "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css",
          rel: "stylesheet"
        }, null, -1)),
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
                      class: "pa-0",
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
                        createVNode(_component_v_row, null, {
                          default: withCtx(() => [
                            createVNode(_component_v_col, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(_component_v_alert, {
                                  type: "info",
                                  color: "blue-grey-lighten-4",
                                  text: "",
                                  border: "start",
                                  class: "mb-3"
                                }, {
                                  default: withCtx(() => _cache[0] || (_cache[0] = [
                                    createBaseVNode("div", null, [
                                      createBaseVNode("strong", null, "Disclaimer:"),
                                      createTextVNode(" The price from "),
                                      createBaseVNode("strong", null, "Model - PolygonAPI"),
                                      createTextVNode(" is considered truth. All other prices and greeks have been calculated using the code "),
                                      createBaseVNode("a", {
                                        href: "https://github.com/mlandacoding/stocks-dashboard/tree/main/python/options_calculations",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        class: "text-blue text-decoration-underline"
                                      }, " here on GitHub "),
                                      createTextVNode(". This data is updated at the end of each day due to the computational cost. ")
                                    ], -1)
                                  ])),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_col, {
                          cols: "12",
                          sm: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_card, {
                              class: "pa-0",
                              color: "primary"
                            }, {
                              default: withCtx(() => [
                                createVNode(LiveSingleStockComponent, { symbols: symbolArr.value }, null, 8, ["symbols"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_col, {
                          cols: "12",
                          sm: "12"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_row, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(_component_v_col, { sm: "11" }, {
                                  default: withCtx(() => _cache[1] || (_cache[1] = [
                                    createBaseVNode("span", null, [
                                      createBaseVNode("h2", null, "Calls")
                                    ], -1)
                                  ])),
                                  _: 1
                                }),
                                createVNode(_component_v_col, {
                                  sm: "1",
                                  style: { "text-align": "end" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_chip, {
                                      color: "green",
                                      "text-color": "white",
                                      label: ""
                                    }, {
                                      default: withCtx(() => _cache[2] || (_cache[2] = [
                                        createTextVNode(" In the Money ")
                                      ])),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_table, {
                              density: "compact",
                              style: { "border": "1px solid rgba(255, 255, 255, 0.5)", "padding-bottom": ".5em", "background-color": "#0c1427" }
                            }, {
                              default: withCtx(() => [
                                _cache[3] || (_cache[3] = createBaseVNode("thead", null, [
                                  createBaseVNode("tr", null, [
                                    createBaseVNode("th", null, "Option Symbol"),
                                    createBaseVNode("th", null, "Strike"),
                                    createBaseVNode("th", null, "IV"),
                                    createBaseVNode("th", null, "Model"),
                                    createBaseVNode("th", null, "Last Price"),
                                    createBaseVNode("th", null, "Delta"),
                                    createBaseVNode("th", null, "Gamma"),
                                    createBaseVNode("th", null, "Theta"),
                                    createBaseVNode("th", null, "Rho"),
                                    createBaseVNode("th", null, "Vega")
                                  ])
                                ], -1)),
                                createBaseVNode("tbody", null, [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(groupedCalls.value, (group, option_symbol) => {
                                    return openBlock(), createElementBlock(Fragment, { key: option_symbol }, [
                                      (openBlock(true), createElementBlock(Fragment, null, renderList(group, (row, index) => {
                                        return openBlock(), createElementBlock("tr", { key: index }, [
                                          index === 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                            createBaseVNode("td", {
                                              rowspan: group.length,
                                              style: normalizeStyle({
                                                borderLeft: row.moneyness === 1 ? "4px solid green" : "4px solid red",
                                                paddingLeft: row.moneyness === 1 ? "8px" : "4px solid red"
                                              })
                                            }, toDisplayString(row.option_symbol), 13, _hoisted_1),
                                            createBaseVNode("td", {
                                              rowspan: group.length
                                            }, toDisplayString(row.strike_price), 9, _hoisted_2),
                                            createBaseVNode("td", {
                                              rowspan: group.length
                                            }, toDisplayString(row.implied_volatility), 9, _hoisted_3)
                                          ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, renderList(4, (i) => {
                                            return createBaseVNode("td", _hoisted_4);
                                          }), 64)),
                                          createBaseVNode("td", null, toDisplayString(row.model), 1),
                                          createBaseVNode("td", null, toDisplayString(row.last_price), 1),
                                          createBaseVNode("td", null, toDisplayString(formatNullable(row.delta)), 1),
                                          createBaseVNode("td", null, toDisplayString(formatNullable(row.gamma)), 1),
                                          createBaseVNode("td", null, toDisplayString(formatNullable(row.theta)), 1),
                                          createBaseVNode("td", null, toDisplayString(formatNullable(row.rho)), 1),
                                          createBaseVNode("td", null, toDisplayString(formatNullable(row.vega)), 1)
                                        ]);
                                      }), 128))
                                    ], 64);
                                  }), 128))
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_col, {
                          cols: "12",
                          sm: "12"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_row, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(_component_v_col, { sm: "11" }, {
                                  default: withCtx(() => _cache[4] || (_cache[4] = [
                                    createBaseVNode("span", null, [
                                      createBaseVNode("h2", null, "Puts")
                                    ], -1)
                                  ])),
                                  _: 1
                                }),
                                createVNode(_component_v_col, {
                                  justify: "end",
                                  sm: "1",
                                  style: { "text-align": "end" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_chip, {
                                      color: "green",
                                      "text-color": "white",
                                      label: ""
                                    }, {
                                      default: withCtx(() => _cache[5] || (_cache[5] = [
                                        createTextVNode(" In the Money ")
                                      ])),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_table, {
                              density: "compact",
                              style: { "border": "1px solid rgba(255, 255, 255, 0.5)", "padding-bottom": ".5em", "background-color": "#0c1427" }
                            }, {
                              default: withCtx(() => [
                                _cache[6] || (_cache[6] = createBaseVNode("thead", null, [
                                  createBaseVNode("tr", null, [
                                    createBaseVNode("th", null, "Option Symbol"),
                                    createBaseVNode("th", null, "Strike"),
                                    createBaseVNode("th", null, "IV"),
                                    createBaseVNode("th", null, "Model"),
                                    createBaseVNode("th", null, "Last Price"),
                                    createBaseVNode("th", null, "Delta"),
                                    createBaseVNode("th", null, "Gamma"),
                                    createBaseVNode("th", null, "Theta"),
                                    createBaseVNode("th", null, "Rho"),
                                    createBaseVNode("th", null, "Vega")
                                  ])
                                ], -1)),
                                createBaseVNode("tbody", null, [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(groupedPuts.value, (group, option_symbol) => {
                                    return openBlock(), createElementBlock(Fragment, { key: option_symbol }, [
                                      (openBlock(true), createElementBlock(Fragment, null, renderList(group, (row, index) => {
                                        return openBlock(), createElementBlock("tr", { key: index }, [
                                          index === 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                                            createBaseVNode("td", {
                                              rowspan: group.length,
                                              style: normalizeStyle({
                                                borderLeft: row.moneyness === 1 ? "4px solid green" : "4px solid red",
                                                paddingLeft: row.moneyness === 1 ? "8px" : "4px solid red"
                                              })
                                            }, toDisplayString(row.option_symbol), 13, _hoisted_5),
                                            createBaseVNode("td", {
                                              rowspan: group.length
                                            }, toDisplayString(row.strike_price), 9, _hoisted_6),
                                            createBaseVNode("td", {
                                              rowspan: group.length
                                            }, toDisplayString(row.implied_volatility), 9, _hoisted_7)
                                          ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, renderList(4, (i) => {
                                            return createBaseVNode("td", _hoisted_8);
                                          }), 64)),
                                          createBaseVNode("td", null, toDisplayString(row.model), 1),
                                          createBaseVNode("td", null, toDisplayString(row.last_price), 1),
                                          createBaseVNode("td", null, toDisplayString(formatNullable(row.delta)), 1),
                                          createBaseVNode("td", null, toDisplayString(formatNullable(row.gamma)), 1),
                                          createBaseVNode("td", null, toDisplayString(formatNullable(row.theta)), 1),
                                          createBaseVNode("td", null, toDisplayString(formatNullable(row.rho)), 1),
                                          createBaseVNode("td", null, toDisplayString(formatNullable(row.vega)), 1)
                                        ]);
                                      }), 128))
                                    ], 64);
                                  }), 128))
                                ])
                              ]),
                              _: 1
                            })
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
const OptionsChain = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-337837f5"]]);
export {
  OptionsChain as default
};
