import { g as ref, m as useTheme, p as computed, q as watch, h as onMounted, r as resolveComponent, c as createBlock, o as openBlock, w as withCtx, a as createVNode, f as createElementBlock, b as createCommentVNode, e as createBaseVNode, t as toDisplayString, l as createTextVNode, n as normalizeClass, s as normalizeStyle, i as axios$1, F as Fragment, v as nextTick } from "./app-3sl2MM3A.js";
import { _ as _export_sfc, u as useStockStream, m, a as _sfc_main$3, b as _sfc_main$4, M as MarketStatus, L as LiveStocksTable, I as IntradayGraph, F as FooterComponent } from "./FooterComponent-YLQxKI-4.js";
const _hoisted_1$1 = ["src"];
const _hoisted_2$1 = ["src"];
const _hoisted_3$1 = { class: "d-flex align-center justify-space-between w-150" };
const _hoisted_4 = { class: "text-white text-subtitle-1 font-weight-bold" };
const _hoisted_5 = { class: "text-medium-emphasis" };
const _hoisted_6 = { class: "d-flex align-center gap-2" };
const _sfc_main$2 = {
  __name: "StockCardComponent",
  props: {
    symbol: String
  },
  setup(__props) {
    const props = __props;
    const companyName = ref("");
    const prev_day_close = ref(0);
    const currentPrice = ref(0);
    const percentageChange = ref(0);
    const isUp = ref(true);
    const priceFlash = ref(false);
    const { current } = useTheme();
    const cardStyle = computed(() => ({
      backgroundColor: current.value.colors.primary,
      border: "2px solid grey"
    }));
    const apiKey = "1id5h3veZCsdF5IKj8C";
    const logoUrl = computed(() => `https://cdn.brandfetch.io/${props.symbol}/icon/stock_symbol/fallback/404/h/40/w/40?c=${apiKey}`);
    const localLogoPath = computed(() => `/storage/images/logos/${props.symbol}.png`);
    const localImageExists = ref(false);
    const logoUrlExists = ref(false);
    function checkIfImageExists(pathRef, targetRef) {
      const img = new Image();
      img.src = pathRef.value;
      img.onload = () => targetRef.value = true;
      img.onerror = () => targetRef.value = false;
    }
    const priceClass = computed(() => {
      return priceFlash.value ? isUp.value ? "text-green--light" : "text-red--light" : "";
    });
    watch(
      () => currentPrice.value,
      (newPrice, oldPrice) => {
        if (newPrice !== oldPrice) {
          priceFlash.value = true;
          setTimeout(() => priceFlash.value = false, 500);
        }
      }
    );
    const stockStream = useStockStream();
    watch(
      () => stockStream.formattedStocks.value.find((s) => s.sym === props.symbol),
      (stockUpdate) => {
        if (stockUpdate && stockUpdate.vwap !== null) {
          const newPrice = stockUpdate.vwap;
          percentageChange.value = prev_day_close.value ? (newPrice - prev_day_close.value) / prev_day_close.value * 100 : 0;
          isUp.value = newPrice > currentPrice.value;
          currentPrice.value = newPrice;
        }
      },
      { immediate: true }
    );
    onMounted(async () => {
      try {
        const response = await axios.get(`/stocks_overview/company_name/${props.symbol}`);
        companyName.value = response.data.name;
        prev_day_close.value = response.data.prev_day_close;
      } catch (error) {
        console.error("Error fetching company name:", error);
        companyName.value = "Unknown Company";
      }
      checkIfImageExists(logoUrl, logoUrlExists);
      checkIfImageExists(localLogoPath, localImageExists);
    });
    return (_ctx, _cache) => {
      const _component_v_avatar = resolveComponent("v-avatar");
      const _component_v_col = resolveComponent("v-col");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_card = resolveComponent("v-card");
      return openBlock(), createBlock(_component_v_card, {
        class: "pa-3",
        rounded: "lg",
        elevation: "0",
        style: normalizeStyle({ ...cardStyle.value, margin: "0 4px" })
      }, {
        default: withCtx(() => [
          createVNode(_component_v_row, {
            align: "center",
            "no-gutters": ""
          }, {
            default: withCtx(() => [
              createVNode(_component_v_col, { cols: "auto" }, {
                default: withCtx(() => [
                  localImageExists.value || logoUrlExists.value ? (openBlock(), createBlock(_component_v_avatar, {
                    key: 0,
                    size: "40",
                    class: "d-flex align-center justify-space-around"
                  }, {
                    default: withCtx(() => [
                      localImageExists.value ? (openBlock(), createElementBlock("img", {
                        key: 0,
                        src: localLogoPath.value,
                        alt: "Local Logo",
                        class: "w-100 h-100"
                      }, null, 8, _hoisted_1$1)) : logoUrlExists.value ? (openBlock(), createElementBlock("img", {
                        key: 1,
                        src: logoUrl.value,
                        alt: "Brandfetch Logo",
                        class: "w-100 h-100"
                      }, null, 8, _hoisted_2$1)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_v_avatar, {
                    key: 1,
                    rounded: "0"
                  }, {
                    default: withCtx(() => _cache[0] || (_cache[0] = [
                      createBaseVNode("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "90%",
                        height: "90%",
                        fill: "currentColor",
                        class: "bi bi-graph-up-arrow",
                        viewBox: "0 0 16 16"
                      }, [
                        createBaseVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"
                        })
                      ], -1)
                    ])),
                    _: 1
                  }))
                ]),
                _: 1
              }),
              createVNode(_component_v_col, { class: "ms-4" }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3$1, [
                    createBaseVNode("div", null, [
                      createBaseVNode("div", _hoisted_4, toDisplayString(__props.symbol), 1),
                      createBaseVNode("div", _hoisted_5, [
                        createBaseVNode("h6", null, toDisplayString(companyName.value), 1)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_6, [
                      createVNode(_component_v_icon, {
                        color: percentageChange.value >= 0 ? "green" : "red",
                        size: "20",
                        class: "me-1"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(percentageChange.value >= 0 ? "mdi-arrow-up-bold" : "mdi-arrow-down-bold"), 1)
                        ]),
                        _: 1
                      }, 8, ["color"]),
                      createBaseVNode("div", {
                        class: normalizeClass([percentageChange.value >= 0 ? "text-green" : "text-red", "text-subtitle-1 font-weight-bold"])
                      }, toDisplayString(percentageChange.value.toFixed(2)) + "% ", 3)
                    ]),
                    createBaseVNode("div", {
                      class: normalizeClass([priceClass.value, "text-subtitle-1 font-weight-bold"])
                    }, " $" + toDisplayString(currentPrice.value.toFixed(2)), 3)
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["style"]);
    };
  }
};
const StockCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-6ebed245"]]);
const _sfc_main$1 = {
  name: "StockSectorBarChart",
  components: {
    apexchart: m
  },
  data() {
    return {
      loading: true,
      chartOptions: {},
      chartSeries: [
        {
          name: "Percentage Change",
          data: []
        }
      ],
      categories: []
    };
  },
  async mounted() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const response = await axios$1.get(`/get_sectors`);
        const sectorData = response.data;
        this.categories = sectorData.map((item) => item.sector_name);
        this.chartSeries[0].data = sectorData.map((item) => item.percentage_change);
        this.chartOptions = {
          chart: {
            type: "bar",
            height: 400,
            toolbar: { show: false },
            zoom: { enabled: false }
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "70%",
              borderRadius: 4,
              colors: {
                ranges: [
                  {
                    from: -100,
                    to: -1e-4,
                    color: "#FF3B30"
                  },
                  {
                    from: 0,
                    to: 100,
                    color: "#00C076"
                  }
                ]
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: this.categories,
            labels: {
              style: {
                colors: "#ffffff",
                fontSize: "14px"
              }
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
            offsetX: 50
          },
          yaxis: {
            labels: {
              style: {
                colors: "grey",
                fontSize: "11px"
              }
            }
          },
          grid: {
            show: false
          },
          title: {
            text: "Sector Performance",
            align: "left",
            style: {
              color: "#ffffff",
              fontSize: "18px"
            }
          },
          tooltip: {
            theme: "dark",
            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
              const sectorName = this.categories[dataPointIndex];
              const value = series[seriesIndex][dataPointIndex].toFixed(2);
              return `
                  <div style="padding: 8px;">
                    <strong>${sectorName}</strong><br/>
                    ${value}%
                  </div>
                `;
            }
          }
        };
        this.loading = false;
      } catch (error) {
        console.error("Error loading sector data:", error);
        this.loading = false;
      }
    }
  }
};
const _hoisted_1 = { class: "w-full" };
const _hoisted_2 = {
  key: 0,
  class: "flex items-center justify-center h-64"
};
const _hoisted_3 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_apexchart = resolveComponent("apexchart");
  const _component_v_card = resolveComponent("v-card");
  return openBlock(), createBlock(_component_v_card, {
    color: "primary",
    style: { "border": "1px solid rgba(255, 255, 255, 0.5)" }
  }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1, [
        $data.loading ? (openBlock(), createElementBlock("div", _hoisted_2, _cache[0] || (_cache[0] = [
          createBaseVNode("span", { class: "text-gray-500" }, "Loading chart...", -1)
        ]))) : (openBlock(), createElementBlock("div", _hoisted_3, [
          createVNode(_component_apexchart, {
            type: "bar",
            height: "440",
            options: $data.chartOptions,
            series: $data.chartSeries
          }, null, 8, ["options", "series"])
        ]))
      ])
    ]),
    _: 1
  });
}
const SectorPerformanceGraph = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const _sfc_main = {
  __name: "MainLayout",
  setup(__props) {
    const drawer = ref(false);
    const symbol = ref("SPY");
    const previousClose = ref("");
    const graphRef = ref(null);
    const losers = ref([]);
    const winners = ref([]);
    const popular_stocks = ref(["META", "MSFT", "AMZN", "TSLA", "NVDA", "GOOGL", "AAPL", "AMD", "MSFT", "BRK.B", "TSMC", "PLTR"]);
    function updateSymbol({ sym, previous_close }) {
      symbol.value = sym;
      previousClose.value = previous_close;
      nextTick(() => {
        var _a, _b;
        (_b = (_a = graphRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    const handleDrawerToggle = (value) => {
      drawer.value = value;
    };
    onMounted(async () => {
      try {
        const winRes = await axios$1.get(`winners_and_losers`);
        losers.value = winRes.data["losers"].map((item) => item.symbol);
        winners.value = winRes.data["winners"].map((item) => item.symbol);
      } catch (error) {
        console.error("Failed to fetch losers:", error);
      }
    });
    return (_ctx, _cache) => {
      const _component_v_col = resolveComponent("v-col");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_main = resolveComponent("v-main");
      const _component_v_layout = resolveComponent("v-layout");
      const _component_v_sheet = resolveComponent("v-sheet");
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[0] || (_cache[0] = createBaseVNode("link", {
          href: "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css",
          rel: "stylesheet"
        }, null, -1)),
        createVNode(_component_v_sheet, { class: "custom-width-wrapper" }, {
          default: withCtx(() => [
            createVNode(_component_v_layout, { style: { "background": "#0c1427" } }, {
              default: withCtx(() => [
                createVNode(_sfc_main$3, { onToggleDrawer: handleDrawerToggle }),
                createVNode(_sfc_main$4, {
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
                        createVNode(_component_v_row, {
                          justify: "end",
                          class: "mb-4",
                          "no-gutters": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_col, {
                              cols: "12",
                              sm: "4"
                            }, {
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
                                    createVNode(StockCard, { symbol: "SPY" })
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
                                    createVNode(StockCard, { symbol: "IWM" })
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
                                    createVNode(StockCard, { symbol: "DIA" })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_row, { justify: "center" }, {
                          default: withCtx(() => [
                            createVNode(_component_v_col, {
                              cols: "12",
                              sm: "4"
                            }, {
                              default: withCtx(() => [
                                createVNode(LiveStocksTable, {
                                  title: "Popular Stocks",
                                  symbols: popular_stocks.value,
                                  onShowGraph: updateSymbol
                                }, null, 8, ["symbols"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_col, {
                              cols: "12",
                              sm: "8"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(IntradayGraph, {
                                  ref_key: "graphRef",
                                  ref: graphRef,
                                  symbol: symbol.value,
                                  previous_close: previousClose.value,
                                  key: symbol.value
                                }, null, 8, ["symbol", "previous_close"]))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_row, {
                          justify: "center",
                          class: "mb-4"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_col, null, {
                              default: withCtx(() => [
                                createVNode(SectorPerformanceGraph)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_col, null, {
                              default: withCtx(() => [
                                createVNode(LiveStocksTable, {
                                  title: "Todays Winners",
                                  symbols: winners.value,
                                  onShowGraph: updateSymbol
                                }, null, 8, ["symbols"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_v_col, null, {
                              default: withCtx(() => [
                                createVNode(LiveStocksTable, {
                                  title: "Todays Losers",
                                  symbols: losers.value,
                                  onShowGraph: updateSymbol
                                }, null, 8, ["symbols"])
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
const MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-02e92fd2"]]);
export {
  MainLayout as M
};
