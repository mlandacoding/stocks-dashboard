import { r as resolveComponent, f as createElementBlock, o as openBlock, e as createBaseVNode, a as createVNode, w as withCtx, p as normalizeStyle, c as createBlock, b as createCommentVNode, j as createTextVNode, t as toDisplayString, F as Fragment, k as renderList, n as normalizeClass, u as useDisplay } from "./app-CARG_xon.js";
import { _ as _export_sfc, F as FooterComponent, M as MarketStatus, b as _sfc_main$1, a as _sfc_main$2 } from "./FooterComponent-CkzMO7WZ.js";
import { m } from "./vue3-apexcharts-9fWjqkCD.js";
const bullSpreadSeries = [
  {
    name: "Payoff",
    data: [0, 0, 0, 5, 10, 15, 20, 25, 30]
  }
];
const bullSpreadOptions = {
  chart: {
    id: "bull-spread-payoff",
    toolbar: { show: false },
    zoom: { enabled: false },
    background: "transparent"
  },
  xaxis: {
    categories: [90, 95, 100, 105, 110, 115, 120, 125, 130],
    title: { text: "Asset Price", style: { color: "#fff" } },
    labels: { show: false }
  },
  yaxis: {
    title: { text: "Profit / Loss", style: { color: "#fff" } },
    labels: { show: false }
  },
  grid: {
    borderColor: "#2c365a",
    row: { colors: ["#222b45", "transparent"], opacity: 0.1 }
  },
  stroke: {
    curve: "straight",
    width: 3,
    colors: ["#00e396"]
  },
  tooltip: {
    enabled: false
  },
  markers: {
    size: 5,
    colors: ["#00e396"],
    strokeColors: "#fff",
    strokeWidth: 2
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 100],
      colorStops: [
        [
          {
            offset: 0,
            color: "#00e396",
            opacity: 0.4
          },
          {
            offset: 100,
            color: "#00e396",
            opacity: 0
          }
        ]
      ]
    }
  },
  dataLabels: {
    enabled: false
  }
};
const bearSpreadSeries = [
  {
    name: "Payoff",
    data: [30, 25, 20, 15, 10, 5, 0, 0, 0]
    // Example data for visual representation
  }
];
const bearSpreadOptions = {
  chart: {
    id: "bear-spread-payoff",
    toolbar: { show: false },
    zoom: { enabled: false },
    background: "transparent"
  },
  xaxis: {
    categories: [90, 95, 100, 105, 110, 115, 120, 125, 130],
    title: { text: "Asset Price", style: { color: "#fff" } },
    labels: { show: false }
  },
  yaxis: {
    title: { text: "Profit / Loss", style: { color: "#fff" } },
    labels: { show: false }
  },
  grid: {
    borderColor: "#2c365a",
    row: { colors: ["#222b45", "transparent"], opacity: 0.1 }
  },
  stroke: {
    curve: "straight",
    width: 3,
    colors: ["#ff4560"]
  },
  tooltip: {
    enabled: false
  },
  markers: {
    size: 5,
    colors: ["#ff4560"],
    strokeColors: "#fff",
    strokeWidth: 2
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 100],
      colorStops: [
        [
          {
            offset: 0,
            color: "#ff4560",
            opacity: 0.4
          },
          {
            offset: 100,
            color: "#ff4560",
            opacity: 0
          }
        ]
      ]
    }
  },
  dataLabels: {
    enabled: false
  }
};
const straddleSeries = [
  {
    name: "Payoff",
    data: [20, 15, 10, 5, 0, 5, 10, 15, 20]
    // Example data for visual representation
  }
];
const straddleOptions = {
  chart: {
    id: "straddle-payoff",
    toolbar: { show: false },
    zoom: { enabled: false },
    background: "transparent"
  },
  xaxis: {
    categories: [90, 95, 100, 105, 110, 115, 120, 125, 130],
    title: { text: "Asset Price", style: { color: "#fff" } },
    labels: { show: false }
  },
  yaxis: {
    title: { text: "Profit / Loss", style: { color: "#fff" } },
    labels: { show: false }
  },
  grid: {
    borderColor: "#2c365a",
    row: { colors: ["#222b45", "transparent"], opacity: 0.1 }
  },
  stroke: {
    curve: "straight",
    width: 3,
    colors: ["#008ffb"]
  },
  tooltip: {
    enabled: false
  },
  markers: {
    size: 5,
    colors: ["#008ffb"],
    strokeColors: "#fff",
    strokeWidth: 2
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 100],
      colorStops: [
        [
          {
            offset: 0,
            color: "#008ffb",
            opacity: 0.4
          },
          {
            offset: 100,
            color: "red",
            opacity: 0.1
          }
        ]
      ]
    }
  },
  dataLabels: {
    enabled: false
  }
};
const longStrangleSeries = [
  {
    name: "Payoff",
    data: [15, 10, 5, 0, 0, 0, 5, 10, 15]
    // Example data for visual representation
  }
];
const longStrangleOptions = {
  chart: {
    id: "long-strangle-payoff",
    toolbar: { show: false },
    zoom: { enabled: false },
    background: "transparent"
  },
  xaxis: {
    categories: [90, 95, 100, 105, 110, 115, 120, 125, 130],
    title: { text: "Asset Price", style: { color: "#fff" } },
    labels: { show: false }
  },
  yaxis: {
    title: { text: "Profit / Loss", style: { color: "#fff" } },
    labels: { show: false }
  },
  grid: {
    borderColor: "#2c365a",
    row: { colors: ["#222b45", "transparent"], opacity: 0.1 }
  },
  stroke: {
    curve: "straight",
    width: 3,
    colors: ["#008ffb"]
  },
  tooltip: {
    enabled: false
  },
  markers: {
    size: 5,
    colors: ["#008ffb"],
    strokeColors: "#fff",
    strokeWidth: 2
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0,
      stops: [0, 100],
      colorStops: [
        [
          {
            offset: 0,
            color: "#008ffb",
            opacity: 0.4
          },
          {
            offset: 100,
            color: "red",
            opacity: 0.1
          }
        ]
      ]
    }
  },
  dataLabels: {
    enabled: false
  }
};
const _sfc_main = {
  name: "OptionsStrategyBuilder",
  components: {
    Navbar: _sfc_main$2,
    Sidebar: _sfc_main$1,
    MarketStatus,
    FooterComponent,
    apexchart: m
  },
  data() {
    return {
      drawer: false,
      showSearchDialog: false,
      searchTerm: "",
      symbols: [],
      bullSpreadSeries,
      bullSpreadOptions,
      bearSpreadSeries,
      bearSpreadOptions,
      straddleSeries,
      straddleOptions,
      longStrangleSeries,
      longStrangleOptions,
      mdAndUp: useDisplay(),
      selectedStrategy: null
    };
  },
  async mounted() {
    this.calculateBullSpreadPayoff();
    this.calculateBearSpreadPayoff();
    try {
      const response = await axios.get("/active-assets-with_companyname");
      const data = response.data.symbols;
      this.symbols = Object.entries(data).map(([symbol, name]) => ({
        symbol,
        name
      }));
    } catch (error) {
      console.error("Error fetching data");
    }
  },
  methods: {
    handleDrawerToggle(value) {
      this.drawer = value;
    },
    calculateBullSpreadPayoff() {
      this.bullSpreadSeries[0].data = this.bullSpreadOptions.xaxis.categories.map((price) => {
        const longCall = Math.max(0, price - 100) - 10;
        const shortCall = -1 * (Math.max(0, price - 120) - 4);
        return longCall + shortCall;
      });
    },
    calculateBearSpreadPayoff() {
      this.bearSpreadSeries[0].data = this.bearSpreadOptions.xaxis.categories.map((price) => {
        const longCall = 10 - Math.max(0, price - 100);
        const shortCall = -1 * (4 - Math.max(0, price - 120));
        return longCall + shortCall;
      });
    },
    goToProfile(symbol) {
      window.location.href = `/optionsStrategyBuilder/${this.selectedStrategy}/${symbol}`;
      this.showSearchDialog = false;
      this.searchTerm = "";
    },
    openStrategyDialog(strategy) {
      this.selectedStrategy = strategy;
      this.showSearchDialog = true;
    }
  },
  computed: {
    filteredSymbols() {
      if (!this.searchTerm) return this.symbols;
      return this.symbols.filter(
        (item) => `${item.symbol} ${item.name}`.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
};
const _hoisted_1 = { class: "d-flex align-center justify-space-between" };
const _hoisted_2 = { style: { "color": "#5E75E8" } };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Navbar = resolveComponent("Navbar");
  const _component_Sidebar = resolveComponent("Sidebar");
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_btn = resolveComponent("v-btn");
  const _component_v_toolbar_title = resolveComponent("v-toolbar-title");
  const _component_v_toolbar = resolveComponent("v-toolbar");
  const _component_v_card_subtitle = resolveComponent("v-card-subtitle");
  const _component_v_text_field = resolveComponent("v-text-field");
  const _component_v_list_item_title = resolveComponent("v-list-item-title");
  const _component_v_list_item = resolveComponent("v-list-item");
  const _component_v_list = resolveComponent("v-list");
  const _component_v_card_text = resolveComponent("v-card-text");
  const _component_v_card = resolveComponent("v-card");
  const _component_v_dialog = resolveComponent("v-dialog");
  const _component_MarketStatus = resolveComponent("MarketStatus");
  const _component_v_col = resolveComponent("v-col");
  const _component_v_row = resolveComponent("v-row");
  const _component_v_card_title = resolveComponent("v-card-title");
  const _component_apexchart = resolveComponent("apexchart");
  const _component_v_container = resolveComponent("v-container");
  const _component_FooterComponent = resolveComponent("FooterComponent");
  const _component_v_main = resolveComponent("v-main");
  const _component_v_layout = resolveComponent("v-layout");
  const _component_v_sheet = resolveComponent("v-sheet");
  return openBlock(), createElementBlock(Fragment, null, [
    _cache[23] || (_cache[23] = createBaseVNode("link", {
      href: "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css",
      rel: "stylesheet"
    }, null, -1)),
    createVNode(_component_v_sheet, { class: "custom-width-wrapper" }, {
      default: withCtx(() => [
        createVNode(_component_v_layout, { style: { "background": "#0c1427" } }, {
          default: withCtx(() => [
            createVNode(_component_Navbar, { onToggleDrawer: $options.handleDrawerToggle }, null, 8, ["onToggleDrawer"]),
            createVNode(_component_Sidebar, {
              drawer: $data.drawer,
              "onUpdate:drawer": $options.handleDrawerToggle
            }, null, 8, ["drawer", "onUpdate:drawer"]),
            createVNode(_component_v_dialog, {
              modelValue: $data.showSearchDialog,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.showSearchDialog = $event),
              transition: "dialog-bottom-transition",
              class: "forceLocation",
              "onClick:outside": _cache[3] || (_cache[3] = ($event) => $data.showSearchDialog = false)
            }, {
              default: withCtx(() => [
                createVNode(_component_v_card, {
                  class: "search-dialog-card",
                  style: normalizeStyle($data.mdAndUp ? "width: 90vw; height: 85vh;" : "width: 90vw; height: 85vh;")
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_toolbar, {
                      color: "primary",
                      dark: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_btn, {
                          icon: "",
                          onClick: _cache[0] || (_cache[0] = ($event) => $data.showSearchDialog = false)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_icon, null, {
                              default: withCtx(() => _cache[8] || (_cache[8] = [
                                createTextVNode("mdi-close")
                              ])),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_toolbar_title, null, {
                          default: withCtx(() => _cache[9] || (_cache[9] = [
                            createTextVNode("Search Companies")
                          ])),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    $data.selectedStrategy ? (openBlock(), createBlock(_component_v_card_subtitle, {
                      key: 0,
                      class: "text-center",
                      style: { "color": "#5E75E8", "font-weight": "bold" }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Building: " + toDisplayString($data.selectedStrategy.charAt(0).toUpperCase() + $data.selectedStrategy.slice(1).replace(/([A-Z])/g, " $1")), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_v_card_text, {
                      class: "pa-4",
                      style: { "padding-top": "0" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_text_field, {
                          modelValue: $data.searchTerm,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.searchTerm = $event),
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
                            (openBlock(true), createElementBlock(Fragment, null, renderList($options.filteredSymbols, (item) => {
                              return openBlock(), createBlock(_component_v_list_item, {
                                key: item.symbol,
                                onClick: ($event) => $options.goToProfile(item.symbol)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_list_item_title, null, {
                                    default: withCtx(() => [
                                      createBaseVNode("div", _hoisted_1, [
                                        createBaseVNode("span", null, toDisplayString(item.name), 1),
                                        createBaseVNode("span", _hoisted_2, "[" + toDisplayString(item.symbol) + "]", 1)
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
            }, 8, ["modelValue"]),
            createVNode(_component_v_main, {
              class: normalizeClass({ "content-expanded": !$data.drawer, "content-shrinked": $data.drawer })
            }, {
              default: withCtx(() => [
                createVNode(_component_v_container, {
                  fluid: "",
                  class: "pa-3",
                  "no-gutters": ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_row, { justify: "end" }, {
                      default: withCtx(() => [
                        createVNode(_component_v_col, { cols: "auto" }, {
                          default: withCtx(() => [
                            createVNode(_component_MarketStatus)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_row, null, {
                      default: withCtx(() => [
                        createVNode(_component_v_col, null, {
                          default: withCtx(() => _cache[10] || (_cache[10] = [
                            createBaseVNode("h3", null, "Options Strategy Builder", -1)
                          ])),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_row, {
                      cols: "12",
                      sm: "12",
                      md: "4",
                      lg: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_col, {
                          sm: "2",
                          md: "2",
                          lg: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_card, {
                              class: "pa-0",
                              elevation: "3",
                              style: { "background": "#181f3a", "color": "#fff", "border-radius": "1px", "border": "1px solid #2c365a" }
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_card_title, {
                                  class: "d-flex align-center justify-space-between",
                                  style: { "font-size": "1.3rem", "font-weight": "600" }
                                }, {
                                  default: withCtx(() => [
                                    _cache[13] || (_cache[13] = createBaseVNode("span", null, "Bull Spread", -1)),
                                    createVNode(_component_v_btn, {
                                      color: "accent",
                                      variant: "tonal",
                                      text: "",
                                      ref: "bullSpread",
                                      onClick: _cache[4] || (_cache[4] = ($event) => $options.openStrategyDialog("bullSpread"))
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_icon, null, {
                                          default: withCtx(() => _cache[11] || (_cache[11] = [
                                            createTextVNode("mdi-play")
                                          ])),
                                          _: 1
                                        }),
                                        _cache[12] || (_cache[12] = createBaseVNode("span", null, "Build", -1))
                                      ]),
                                      _: 1
                                    }, 512)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_card_text, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_apexchart, {
                                      type: "area",
                                      height: "250",
                                      options: $data.bullSpreadOptions,
                                      series: $data.bullSpreadSeries
                                    }, null, 8, ["options", "series"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_col, {
                          sm: "2",
                          md: "2",
                          lg: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_card, {
                              class: "pa-0",
                              elevation: "3",
                              style: { "background": "#181f3a", "color": "#fff", "border-radius": "1px", "border": "1px solid #2c365a" }
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_card_title, {
                                  class: "d-flex align-center justify-space-between",
                                  style: { "font-size": "1.3rem", "font-weight": "600" }
                                }, {
                                  default: withCtx(() => [
                                    _cache[16] || (_cache[16] = createBaseVNode("span", null, "Bear Spread", -1)),
                                    createVNode(_component_v_btn, {
                                      color: "accent",
                                      variant: "tonal",
                                      text: "",
                                      onClick: _cache[5] || (_cache[5] = ($event) => $options.openStrategyDialog("bearSpread"))
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_icon, null, {
                                          default: withCtx(() => _cache[14] || (_cache[14] = [
                                            createTextVNode("mdi-play")
                                          ])),
                                          _: 1
                                        }),
                                        _cache[15] || (_cache[15] = createBaseVNode("span", null, "Build", -1))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_card_text, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_apexchart, {
                                      type: "area",
                                      height: "250",
                                      options: $data.bearSpreadOptions,
                                      series: $data.bearSpreadSeries
                                    }, null, 8, ["options", "series"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_col, {
                          sm: "2",
                          md: "2",
                          lg: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_card, {
                              class: "pa-0",
                              elevation: "3",
                              style: { "background": "#181f3a", "color": "#fff", "border-radius": "1px", "border": "1px solid #2c365a" }
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_card_title, {
                                  class: "d-flex align-center justify-space-between",
                                  style: { "font-size": "1.3rem", "font-weight": "600" }
                                }, {
                                  default: withCtx(() => [
                                    _cache[19] || (_cache[19] = createBaseVNode("span", null, "Long Straddle", -1)),
                                    createVNode(_component_v_btn, {
                                      color: "accent",
                                      variant: "tonal",
                                      text: "",
                                      onClick: _cache[6] || (_cache[6] = ($event) => $options.openStrategyDialog("longStraddle"))
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_icon, null, {
                                          default: withCtx(() => _cache[17] || (_cache[17] = [
                                            createTextVNode("mdi-play")
                                          ])),
                                          _: 1
                                        }),
                                        _cache[18] || (_cache[18] = createBaseVNode("span", null, "Build", -1))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_card_text, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_apexchart, {
                                      type: "area",
                                      height: "250",
                                      options: $data.straddleOptions,
                                      series: $data.straddleSeries
                                    }, null, 8, ["options", "series"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_col, {
                          sm: "2",
                          md: "2",
                          lg: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_card, {
                              class: "pa-0",
                              elevation: "3",
                              style: { "background": "#181f3a", "color": "#fff", "border-radius": "1px", "border": "1px solid #2c365a" }
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_card_title, {
                                  class: "d-flex align-center justify-space-between",
                                  style: { "font-size": "1.3rem", "font-weight": "600" }
                                }, {
                                  default: withCtx(() => [
                                    _cache[22] || (_cache[22] = createBaseVNode("span", null, "Long Strangle", -1)),
                                    createVNode(_component_v_btn, {
                                      color: "accent",
                                      variant: "tonal",
                                      text: "",
                                      onClick: _cache[7] || (_cache[7] = ($event) => $options.openStrategyDialog("longStrangle"))
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_icon, null, {
                                          default: withCtx(() => _cache[20] || (_cache[20] = [
                                            createTextVNode("mdi-play")
                                          ])),
                                          _: 1
                                        }),
                                        _cache[21] || (_cache[21] = createBaseVNode("span", null, "Build", -1))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_v_card_text, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_apexchart, {
                                      type: "area",
                                      height: "250",
                                      options: $data.longStrangleOptions,
                                      series: $data.longStrangleSeries
                                    }, null, 8, ["options", "series"])
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
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_FooterComponent)
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
}
const OptionsStrategyBuilderIndex = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ded156d3"]]);
export {
  OptionsStrategyBuilderIndex as default
};
