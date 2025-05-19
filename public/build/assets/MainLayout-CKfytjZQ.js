import { r as resolveComponent, c as createBlock, o as openBlock, w as withCtx, e as createBaseVNode, f as createElementBlock, a as createVNode, i as axios, g as ref, h as onMounted, n as normalizeClass, F as Fragment, q as nextTick } from "./app-LTFrDTJ3.js";
import { _ as _export_sfc, a as _sfc_main$2, b as _sfc_main$3, M as MarketStatus, F as FooterComponent } from "./FooterComponent-ClBkgLjE.js";
import { m, L as LiveStocksTable, I as IntradayGraph } from "./IntradayGraph-BXOylNlZ.js";
import { L as LiveSingleStockComponent } from "./LiveSingleStockComponent-CektC-tl.js";
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
        const response = await axios.get(`/get_sectors`);
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
    const spyArr = ref(["SPY"]);
    const iwmArr = ref(["IWM"]);
    const diaArr = ref(["DIA"]);
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
        const winRes = await axios.get(`winners_and_losers`);
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
                createVNode(_sfc_main$2, { onToggleDrawer: handleDrawerToggle }),
                createVNode(_sfc_main$3, {
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
                                    createVNode(LiveSingleStockComponent, {
                                      symbols: spyArr.value,
                                      title: "SPDR S&P 500 ETF Trust"
                                    }, null, 8, ["symbols"])
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
                                    createVNode(LiveSingleStockComponent, {
                                      symbols: iwmArr.value,
                                      title: "iShares Russell 2000 ETF"
                                    }, null, 8, ["symbols"])
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
                                    createVNode(LiveSingleStockComponent, {
                                      symbols: diaArr.value,
                                      title: "SPDR Dow Jones Industrial Average"
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
                        createVNode(_component_v_row, { justify: "center" }, {
                          default: withCtx(() => [
                            createVNode(_component_v_col, {
                              cols: "12",
                              sm: "4",
                              "pe-2": ""
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
const MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1e51ced8"]]);
export {
  MainLayout as M
};
