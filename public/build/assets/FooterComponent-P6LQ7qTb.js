import { g as ref, u as useDisplay, h as onMounted, i as axios$1, B as computed, r as resolveComponent, c as createBlock, o as openBlock, w as withCtx, a as createVNode, e as createBaseVNode, p as normalizeStyle, m as unref, j as createTextVNode, f as createElementBlock, F as Fragment, k as renderList, t as toDisplayString, b as createCommentVNode } from "./app-CisVKhMf.js";
const _hoisted_1$2 = { class: "d-flex align-center justify-space-between" };
const _hoisted_2$2 = { style: { "color": "#5E75E8" } };
const _sfc_main$3 = {
  __name: "Navbar",
  emits: ["toggle-drawer"],
  setup(__props, { emit: __emit }) {
    const showSearchDialog = ref(false);
    const searchTerm = ref("");
    const symbols = ref([]);
    const { mdAndUp } = useDisplay();
    const drawer = ref(false);
    const emit = __emit;
    const updateDrawer = () => {
      drawer.value = !drawer.value;
      emit("toggle-drawer", drawer.value);
    };
    onMounted(async () => {
      try {
        const response = await axios$1.get("/active-assets-with_companyname");
        const data = response.data.symbols;
        symbols.value = Object.entries(data).map(([symbol, name]) => ({
          symbol,
          name
        }));
      } catch (err) {
        console.error("Failed to load symbols", err);
      }
    });
    const filteredSymbols = computed(() => {
      if (!searchTerm.value) return symbols.value;
      return symbols.value.filter(
        (item) => `${item.symbol} ${item.name}`.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });
    const goToProfile = (symbol) => {
      window.location.href = `/company_profile/${symbol}`;
      showSearchDialog.value = false;
      searchTerm.value = "";
    };
    return (_ctx, _cache) => {
      const _component_v_app_bar_nav_icon = resolveComponent("v-app-bar-nav-icon");
      const _component_v_toolbar_title = resolveComponent("v-toolbar-title");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_toolbar = resolveComponent("v-toolbar");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_list_item_title = resolveComponent("v-list-item-title");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_card_text = resolveComponent("v-card-text");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_dialog = resolveComponent("v-dialog");
      const _component_v_app_bar = resolveComponent("v-app-bar");
      return openBlock(), createBlock(_component_v_app_bar, {
        color: "primary",
        class: "outlined-navbar",
        style: { "border-bottom": ".5px solid #17223f" }
      }, {
        default: withCtx(() => [
          createVNode(_component_v_app_bar_nav_icon, {
            variant: "text",
            onClick: updateDrawer
          }),
          createVNode(_component_v_toolbar_title, null, {
            default: withCtx(() => _cache[5] || (_cache[5] = [
              createBaseVNode("a", {
                href: "/",
                style: { "text-decoration": "none", "display": "flex", "align-items": "center" }
              }, [
                createBaseVNode("img", {
                  src: "https://agdsvgs.s3.us-east-2.amazonaws.com/logo-icon.svg",
                  style: { "width": "35px", "margin-right": "5px" }
                }),
                createBaseVNode("img", {
                  src: "https://agdsvgs.s3.us-east-2.amazonaws.com/logo-text.svg",
                  style: { "width": "100px", "margin-right": "5px" }
                })
              ], -1)
            ])),
            _: 1
          }),
          createVNode(_component_v_btn, {
            icon: "mdi-magnify",
            variant: "text",
            onClick: _cache[0] || (_cache[0] = ($event) => showSearchDialog.value = true)
          }),
          createVNode(_component_v_dialog, {
            modelValue: showSearchDialog.value,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => showSearchDialog.value = $event),
            transition: "dialog-bottom-transition",
            class: "forceLocation",
            "onClick:outside": _cache[4] || (_cache[4] = ($event) => showSearchDialog.value = false)
          }, {
            default: withCtx(() => [
              createVNode(_component_v_card, {
                class: "search-dialog-card",
                style: normalizeStyle(unref(mdAndUp) ? "width: 30vw; height: 85vh;" : "")
              }, {
                default: withCtx(() => [
                  createVNode(_component_v_toolbar, {
                    color: "primary",
                    dark: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_btn, {
                        icon: "",
                        onClick: _cache[1] || (_cache[1] = ($event) => showSearchDialog.value = false)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_icon, null, {
                            default: withCtx(() => _cache[6] || (_cache[6] = [
                              createTextVNode("mdi-close")
                            ])),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_v_toolbar_title, null, {
                        default: withCtx(() => _cache[7] || (_cache[7] = [
                          createTextVNode("Search Companies")
                        ])),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_card_text, {
                    class: "pa-4",
                    style: { "padding-top": "0" }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_v_text_field, {
                        modelValue: searchTerm.value,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => searchTerm.value = $event),
                        placeholder: "Type to search companies...",
                        "prepend-inner-icon": "mdi-magnify",
                        clearable: "",
                        "hide-details": "",
                        density: "compact",
                        solo: "",
                        flat: "",
                        color: "primary"
                      }, null, 8, ["modelValue"]),
                      createVNode(_component_v_list, {
                        class: "mt-4",
                        style: { "max-height": "70vh", "overflow-y": "auto", "background-color": "#0c1427" }
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(filteredSymbols.value, (item) => {
                            return openBlock(), createBlock(_component_v_list_item, {
                              key: item.symbol,
                              onClick: ($event) => goToProfile(item.symbol)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_list_item_title, null, {
                                  default: withCtx(() => [
                                    createBaseVNode("div", _hoisted_1$2, [
                                      createBaseVNode("span", null, toDisplayString(item.name), 1),
                                      createBaseVNode("span", _hoisted_2$2, "[" + toDisplayString(item.symbol) + "]", 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["style"])
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      });
    };
  }
};
const _hoisted_1$1 = { class: "justify-content-center" };
const _hoisted_2$1 = ["href"];
const _sfc_main$2 = {
  __name: "Sidebar",
  props: {
    drawer: Boolean
    // Receives the drawer state from MainLayout.vue
  },
  emits: ["update:drawer"],
  setup(__props, { emit: __emit }) {
    const items = [
      { title: "Market Summary", link: "/", value: "bar" }
    ];
    const props = __props;
    const emit = __emit;
    const toggleDrawer = () => {
      emit("update:drawer", !props.drawer);
    };
    return (_ctx, _cache) => {
      const _component_v_list_subheader = resolveComponent("v-list-subheader");
      const _component_v_divider = resolveComponent("v-divider");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_navigation_drawer = resolveComponent("v-navigation-drawer");
      return openBlock(), createBlock(_component_v_navigation_drawer, {
        color: "primary",
        "model-value": __props.drawer,
        width: 250,
        "onUpdate:modelValue": toggleDrawer,
        class: "outlined-sidebar",
        style: { "border-right": "2px solid #17223f" }
      }, {
        default: withCtx(() => [
          createVNode(_component_v_list, { density: "compact" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$1, [
                createVNode(_component_v_list_subheader, { style: { "color": "white" } }, {
                  default: withCtx(() => _cache[0] || (_cache[0] = [
                    createTextVNode("Stocks")
                  ])),
                  _: 1
                })
              ]),
              createVNode(_component_v_divider),
              (openBlock(), createElementBlock(Fragment, null, renderList(items, (item, i) => {
                return createVNode(_component_v_list_item, {
                  key: i,
                  value: item,
                  color: "primary"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("a", {
                      href: item.link,
                      style: { "color": "white", "text-decoration": "none" }
                    }, toDisplayString(item.title), 9, _hoisted_2$1)
                  ]),
                  _: 2
                }, 1032, ["value"]);
              }), 64))
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model-value"]);
    };
  }
};
const stocks = ref({});
function setupWebSocketListeners() {
  window.Echo.channel("stocks").listen("StockPriceUpdated", (payload) => {
    payload.stocks.forEach((entry) => {
      const symbol = entry.sym;
      if (!stocks.value[symbol]) {
        stocks.value[symbol] = { sym: symbol };
      }
      const current = stocks.value[symbol];
      current.previous_vwap = current.vwap ?? null;
      Object.assign(current, {
        volume: entry.v,
        accumulated_volume: entry.av,
        official_open_price: entry.op,
        vwap: entry.vw,
        open: entry.o,
        close: entry.c,
        high: entry.h,
        low: entry.l,
        average_size: entry.a,
        updated: true
      });
    });
  });
}
function ensureWebSocketConnection() {
  if (window.Echo) {
    setupWebSocketListeners();
  } else {
    const wait = setInterval(() => {
      if (window.Echo) {
        setupWebSocketListeners();
        clearInterval(wait);
      }
    }, 100);
  }
}
async function fetchSymbolsFromAPI() {
  try {
    const response = await axios$1.get("/active-assets");
    const symbols = response.data.symbols || [];
    symbols.forEach((symbol) => {
      if (!stocks.value[symbol]) {
        stocks.value[symbol] = {
          sym: symbol,
          volume: null,
          accumulated_volume: null,
          official_open_price: null,
          vwap: null,
          previous_vwap: null,
          open: null,
          close: null,
          high: null,
          low: null,
          average_size: null,
          updated: false
        };
      }
    });
  } catch (error) {
    console.error("Error fetching active assets:", error);
  }
}
function useStockStream() {
  const formattedStocks = computed(
    () => Object.values(stocks.value).map((stock) => ({
      sym: stock.sym,
      ...stock
    }))
  );
  onMounted(async () => {
    await fetchSymbolsFromAPI();
    ensureWebSocketConnection();
  });
  return {
    formattedStocks
  };
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1 = { class: "content-wrapper" };
const _hoisted_2 = {
  key: 0,
  class: "after-hours-text"
};
const _hoisted_3 = {
  key: 1,
  class: "after-hours-text"
};
const _sfc_main$1 = {
  __name: "MarketStatus",
  setup(__props) {
    const holiday = ref("");
    ref("");
    const marketStatus = ref("");
    const closeTime = ref("");
    const afterHours = ref(false);
    const marketsAreOpen = ref(false);
    onMounted(async () => {
      const response = await axios.get(`/isHoliday`);
      if (response) {
        holiday.value = response.data.name;
        marketStatus.value = response.data.status;
        if (marketStatus.value == "early-close") {
          var date = new Date(response.data.close);
          closeTime.value = date.toTimeString().split(" ")[0];
        }
      } else {
        holiday.value = false;
      }
      const apiMarketStatus = await axios.get("/market-status");
      if (apiMarketStatus) {
        afterHours.value = apiMarketStatus.data.afterHours;
        marketsAreOpen.value = apiMarketStatus.data.market === "open";
      }
    });
    return (_ctx, _cache) => {
      const _component_v_alert = resolveComponent("v-alert");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_row = resolveComponent("v-row");
      return openBlock(), createElementBlock(Fragment, null, [
        holiday.value ? (openBlock(), createBlock(_component_v_container, { key: 0 }, {
          default: withCtx(() => [
            marketStatus.value == "closed" ? (openBlock(), createBlock(_component_v_alert, {
              key: 0,
              color: "#C51162",
              icon: "mdi-cancel",
              theme: "dark",
              density: "compact",
              border: ""
            }, {
              default: withCtx(() => [
                _cache[0] || (_cache[0] = createTextVNode(" Markets are closed in observance of ")),
                createBaseVNode("b", null, toDisplayString(holiday.value), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true),
            marketStatus.value == "early-close" ? (openBlock(), createBlock(_component_v_alert, {
              key: 1,
              color: "#C51162",
              icon: "mdi-cancel",
              theme: "dark",
              density: "compact",
              border: ""
            }, {
              default: withCtx(() => [
                _cache[1] || (_cache[1] = createTextVNode(" Markets are closing early ")),
                createBaseVNode("b", null, " [" + toDisplayString(closeTime.value) + " UTC]", 1),
                _cache[2] || (_cache[2] = createTextVNode(" in observance of ")),
                createBaseVNode("b", null, toDisplayString(holiday.value), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        })) : createCommentVNode("", true),
        afterHours.value || marketsAreOpen.value ? (openBlock(), createBlock(_component_v_container, { key: 1 }, {
          default: withCtx(() => [
            createVNode(_component_v_row, { justify: "end" }, {
              default: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(_component_v_btn, {
                    class: "after-hours-btn",
                    variant: "outlined",
                    color: "green",
                    density: "comfortable",
                    rounded: "lg",
                    ripple: false,
                    style: { "pointer-events": "none" }
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_1, [
                        afterHours.value ? (openBlock(), createElementBlock("span", _hoisted_2, "After Hours")) : createCommentVNode("", true),
                        marketsAreOpen.value && !afterHours.value ? (openBlock(), createElementBlock("span", _hoisted_3, "Markets Are Open")) : createCommentVNode("", true),
                        _cache[3] || (_cache[3] = createBaseVNode("span", { class: "dot" }, null, -1))
                      ])
                    ]),
                    _: 1
                  })
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        })) : (openBlock(), createBlock(_component_v_container, { key: 2 }, {
          default: withCtx(() => [
            createVNode(_component_v_row, { justify: "end" }, {
              default: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(_component_v_btn, {
                    class: "closed-hours-btn",
                    variant: "outlined",
                    color: "red",
                    density: "comfortable",
                    rounded: "lg",
                    ripple: false,
                    style: { "pointer-events": "none" }
                  }, {
                    default: withCtx(() => _cache[4] || (_cache[4] = [
                      createBaseVNode("div", { class: "content-wrapper" }, [
                        createBaseVNode("span", { class: "after-hours-text" }, "Markets Are Closed"),
                        createBaseVNode("span", { class: "closed-dot" })
                      ], -1)
                    ])),
                    _: 1
                  })
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }))
      ], 64);
    };
  }
};
const MarketStatus = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c5f99dfa"]]);
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_v_footer = resolveComponent("v-footer");
  const _component_v_alert = resolveComponent("v-alert");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_v_footer, {
      border: "",
      color: "primary"
    }, {
      default: withCtx(() => _cache[0] || (_cache[0] = [
        createTextVNode("* Data is delayed by at least 15 minutes")
      ])),
      _: 1
    }),
    createBaseVNode("div", null, [
      createVNode(_component_v_alert, {
        type: "info",
        variant: "tonal",
        border: "start",
        icon: "mdi-shield-alert"
      }, {
        default: withCtx(() => _cache[1] || (_cache[1] = [
          createBaseVNode("strong", null, "Disclaimer:", -1),
          createTextVNode(" The information provided on this page is for informational purposes only and does not constitute financial, investment, or legal advice. We do not make any guarantees about the completeness, reliability, or accuracy of this data. Always consult with a qualified financial advisor before making any investment decisions. ")
        ])),
        _: 1
      })
    ])
  ], 64);
}
const FooterComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  FooterComponent as F,
  MarketStatus as M,
  _export_sfc as _,
  _sfc_main$3 as a,
  _sfc_main$2 as b,
  useStockStream as u
};
