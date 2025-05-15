import { r as resolveComponent, c as createBlock, o as openBlock, w as withCtx, e as createBaseVNode, f as createElementBlock, a as createVNode, i as axios$1, j as createTextVNode, t as toDisplayString, n as normalizeClass, p as normalizeStyle, g as ref, h as onMounted, F as Fragment, q as nextTick } from "./app-Dv9xi8Gw.js";
import { _ as _export_sfc, m, u as useStockStream, a as _sfc_main$3, b as _sfc_main$4, M as MarketStatus, L as LiveStocksTable, I as IntradayGraph, F as FooterComponent } from "./FooterComponent-jsotabOL.js";
const _sfc_main$2 = {
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
const _hoisted_1$1 = { class: "w-full" };
const _hoisted_2$1 = {
  key: 0,
  class: "flex items-center justify-center h-64"
};
const _hoisted_3$1 = { key: 1 };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_apexchart = resolveComponent("apexchart");
  const _component_v_card = resolveComponent("v-card");
  return openBlock(), createBlock(_component_v_card, {
    color: "primary",
    style: { "border": "1px solid rgba(255, 255, 255, 0.5)" }
  }, {
    default: withCtx(() => [
      createBaseVNode("div", _hoisted_1$1, [
        $data.loading ? (openBlock(), createElementBlock("div", _hoisted_2$1, _cache[0] || (_cache[0] = [
          createBaseVNode("span", { class: "text-gray-500" }, "Loading chart...", -1)
        ]))) : (openBlock(), createElementBlock("div", _hoisted_3$1, [
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
const SectorPerformanceGraph = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);
const _sfc_main$1 = {
  props: {
    title: {
      type: String
    },
    symbols: {
      type: Array
    }
  },
  data() {
    return {
      search: "",
      stocks: [],
      flashStates: {},
      logoStatus: {},
      apiKey: "1id5h3veZCsdF5IKj8C",
      headers: [],
      prevCloseMap: {},
      hasPreloaded: false,
      isReady: false,
      stockGraphLoading: false,
      stock: ""
    };
  },
  setup() {
    const { formattedStocks: globalFormattedStocks } = useStockStream();
    return { globalFormattedStocks };
  },
  watch: {
    globalFormattedStocks: {
      async handler() {
        await this.rebuildStocks();
      },
      immediate: true,
      deep: true
    },
    symbols(newSymbols) {
      this.rebuildStocks();
    },
    stocks: {
      handler(newVal) {
        if (!this.hasPreloaded && newVal.length > 0) {
          this.preloadLogosForStocks(newVal);
          this.hasPreloaded = true;
        }
      },
      immediate: true
    }
  },
  methods: {
    async rebuildStocks() {
      if (!this.isReady || !this.symbols.length) return;
      this.stocks = (await Promise.all(this.globalFormattedStocks.map(async (stock) => {
        if (!this.symbols.includes(stock.sym)) return null;
        const existing = this.stocks.find((s) => s.sym === stock.sym);
        const prevVWAP = (existing == null ? void 0 : existing.vwap) ?? null;
        const vwapChanged = prevVWAP !== null && stock.vwap !== prevVWAP;
        let percentageChange = null;
        let priceChange = null;
        const matched = this.prevCloseMap.find((entry) => entry.symbol === stock.sym);
        let prevClose = matched ? matched.prev_day_close : null;
        let latest_vwap = null;
        if (stock.vwap == null) {
          if (prevClose == null) {
            try {
              const prevRes = await axios.get(`/prev_close/${stock.sym}`);
              prevClose = parseFloat(prevRes.data["prev_day_close"]);
            } catch {
              prevClose = 0;
            }
          }
          try {
            const latestRes = await axios.get(`/latest_price/${stock.sym}`);
            latest_vwap = parseFloat(latestRes.data["price"]);
          } catch {
            latest_vwap = -1;
          }
        }
        const effectiveVWAP = latest_vwap ?? stock.vwap;
        percentageChange = (effectiveVWAP - prevClose) / prevClose * 100;
        percentageChange = percentageChange.toFixed(2);
        priceChange = (effectiveVWAP - prevClose).toFixed(2);
        return {
          ...stock,
          previous_vwap: prevVWAP,
          vwapFlash: vwapChanged,
          prev_day_close: prevClose,
          vwap: effectiveVWAP,
          percentageChange,
          priceChange
        };
      }))).filter(Boolean);
      this.stock = this.stocks[0];
      setTimeout(() => {
        this.stocks.forEach((s) => s.vwapFlash = false);
      }, 600);
    },
    checkIfImageExists(src, callback) {
      const img = new Image();
      img.onload = () => callback(true);
      img.onerror = () => callback(false);
      img.src = src;
    },
    preloadLogosForStocks(stocks) {
      stocks.forEach((stock) => {
        var _a;
        const symbol = stock.sym;
        if ((_a = this.logoStatus[symbol]) == null ? void 0 : _a.local) return;
        if (!this.logoStatus[symbol]) {
          const remote = `https://cdn.brandfetch.io/${symbol}/icon/stock_symbol/fallback/404/h/40/w/40?c=${this.apiKey}`;
          this.checkIfImageExists(remote, (exists) => {
            this.logoStatus[symbol] = {
              ...this.logoStatus[symbol] || {},
              remote: exists
            };
          });
        }
      });
    },
    showStockGraph(sym) {
      const stock = this.stocks.find((s) => s.sym === sym);
      if (stock) {
        this.stockGraphLoading = true;
        this.$emit("show-graph", {
          sym: stock.sym,
          previous_close: stock.prev_day_close
        });
      }
    },
    goToProfile(event, row) {
      if (!this.stockGraphLoading) {
        window.location.href = `/company_profile/${row.item.sym}`;
      }
      this.stockGraphLoading = false;
    }
  },
  async created() {
    try {
      const prevCloseRes = await fetch("/storage/cache/previous_close.json");
      const previousCloseData = await prevCloseRes.json();
      this.prevCloseMap = previousCloseData;
    } catch (error) {
      console.error("Failed to load prevCloseMap:", error);
    }
    this.isReady = true;
    this.headers = [
      { title: "", key: "sym" },
      { title: "Price", key: "vwap" },
      { title: "% Change", key: "percentage_change", align: "end" }
    ];
  }
};
const _hoisted_1 = {
  style: { "border": "1px solid rgba(255, 255, 255, 0.5)", "min-height": "64px" },
  class: "d-flex align-center"
};
const _hoisted_2 = { class: "d-flex align-center gap-2 h-100" };
const _hoisted_3 = ["src"];
const _hoisted_4 = ["src"];
const _hoisted_5 = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  width: "60%",
  height: "60%",
  class: "bi bi-graph-up-arrow",
  viewBox: "0 0 16 16"
};
const _hoisted_6 = { style: { "font-size": "14px" } };
const _hoisted_7 = { style: { "color": "#5E75E8" } };
const _hoisted_8 = { class: "d-flex align-center gap-2" };
const _hoisted_9 = { class: "font-weight-bold" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_avatar = resolveComponent("v-avatar");
  const _component_v_col = resolveComponent("v-col");
  const _component_v_row = resolveComponent("v-row");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_v_row, {
      class: "w-100 h-100 pa-0 pa-sm-2 ma-0",
      "no-gutters": "",
      align: "center"
    }, {
      default: withCtx(() => [
        createVNode(_component_v_col, {
          cols: "7",
          class: "h-100"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_2, [
              createVNode(_component_v_avatar, {
                size: "32",
                rounded: "1",
                class: "bg-white"
              }, {
                default: withCtx(() => {
                  var _a, _b;
                  return [
                    ((_a = $data.logoStatus[$data.stock.sym]) == null ? void 0 : _a.local) ? (openBlock(), createElementBlock("img", {
                      key: 0,
                      src: `/storage/images/logos/${$data.stock.sym}.png`,
                      alt: "Local Logo",
                      class: "w-100 h-100"
                    }, null, 8, _hoisted_3)) : ((_b = $data.logoStatus[$data.stock.sym]) == null ? void 0 : _b.remote) ? (openBlock(), createElementBlock("img", {
                      key: 1,
                      src: `https://cdn.brandfetch.io/${$data.stock.sym}/icon/stock_symbol/fallback/404/h/40/w/40?c=${$data.apiKey}`,
                      alt: "Brandfetch Logo",
                      class: "w-100 h-100"
                    }, null, 8, _hoisted_4)) : (openBlock(), createElementBlock("svg", _hoisted_5, _cache[0] || (_cache[0] = [
                      createBaseVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"
                      }, null, -1)
                    ])))
                  ];
                }),
                _: 1
              }),
              createBaseVNode("span", _hoisted_6, [
                createTextVNode(toDisplayString($props.title) + " ", 1),
                createBaseVNode("span", _hoisted_7, "[" + toDisplayString($data.stock.sym ?? "—") + "]", 1)
              ])
            ])
          ]),
          _: 1
        }),
        createVNode(_component_v_col, { class: "h-100 d-flex align-center" }, {
          default: withCtx(() => [
            createBaseVNode("div", null, "$" + toDisplayString($data.stock.vwap), 1)
          ]),
          _: 1
        }),
        createVNode(_component_v_col, { class: "h-100 d-flex align-center justify-end" }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("span", _hoisted_9, toDisplayString($data.stock.priceChange), 1),
              createBaseVNode("span", {
                style: normalizeStyle({
                  backgroundColor: $data.stock.percentageChange < 0 ? "rgba(244, 67, 54, 0.2)" : $data.stock.percentageChange > 0 ? "rgba(76, 175, 80, 0.2)" : "transparent"
                }),
                class: normalizeClass([
                  "font-mono px-2 py-1 rounded",
                  $data.stock.percentageChange < 0 ? "text-red" : $data.stock.percentageChange > 0 ? "text-green" : "text-grey"
                ])
              }, toDisplayString($data.stock.percentageChange) + "% ", 7)
            ])
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ]);
}
const LiveSingleStockComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-0fd20ee6"]]);
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
