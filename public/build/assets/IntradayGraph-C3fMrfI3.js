import { u as useStockStream } from "./useStockStream-B2e18YaT.js";
import { r as resolveComponent, f as createElementBlock, o as openBlock, c as createBlock, b as createCommentVNode, a as createVNode, w as withCtx, j as createTextVNode, t as toDisplayString, e as createBaseVNode, n as normalizeClass, p as normalizeStyle } from "./app-DIVAU1yG.js";
import { _ as _export_sfc } from "./FooterComponent-CJDXMBzI.js";
import { m } from "./vue3-apexcharts-CzGknkqO.js";
const _sfc_main$1 = {
  props: {
    title: {
      type: String
    },
    symbols: {
      type: Array
    },
    chartButton: {
      type: Boolean,
      default: true
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
      stockGraphLoading: false
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
        const symbol = stock.sym;
        if (!this.logoStatus[symbol]) {
          this.logoStatus[symbol] = {};
        }
        const localUrl = `/storage/images/logos/${symbol}.png`;
        this.checkIfImageExists(localUrl, (exists) => {
          this.logoStatus[symbol].local = exists;
        });
        const remoteUrl = `https://cdn.brandfetch.io/${symbol}/icon/stock_symbol/fallback/404/h/40/w/40?c=${this.apiKey}`;
        this.checkIfImageExists(remoteUrl, (exists) => {
          this.logoStatus[symbol].remote = exists;
        });
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
    if (this.chartButton) {
      this.headers = [
        { title: "Symbol", key: "sym" },
        { title: "Price", key: "vwap" },
        { title: "% Change", key: "percentage_change", align: "end" },
        { title: "Chart", key: "chart" }
      ];
    } else {
      this.headers = [
        { title: "Data Delayed", key: "sym" },
        { title: "Price", key: "vwap" },
        { title: "% Change", key: "percentage_change", align: "end" }
      ];
    }
  }
};
const _hoisted_1$1 = { style: { "border": "1px solid rgba(255, 255, 255, 0.5)", "padding-bottom": ".5em" } };
const _hoisted_2$1 = { class: "d-flex align-center gap-2" };
const _hoisted_3$1 = ["src"];
const _hoisted_4$1 = ["src"];
const _hoisted_5 = {
  key: 2,
  xmlns: "http://www.w3.org/2000/svg",
  width: "60%",
  height: "60%",
  class: "bi bi-graph-up-arrow",
  viewBox: "0 0 16 16"
};
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { style: { "color": "#5E75E8" } };
const _hoisted_8 = { key: 1 };
const _hoisted_9 = { class: "d-flex gap-2 text-end align-center justify-end text-end" };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_spacer = resolveComponent("v-spacer");
  const _component_v_card_title = resolveComponent("v-card-title");
  const _component_v_avatar = resolveComponent("v-avatar");
  const _component_v_btn = resolveComponent("v-btn");
  const _component_v_data_table = resolveComponent("v-data-table");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    $props.title && $props.chartButton ? (openBlock(), createBlock(_component_v_card_title, {
      key: 0,
      class: "d-flex align-center pe-2"
    }, {
      default: withCtx(() => [
        createTextVNode(toDisplayString($props.title) + " ", 1),
        createVNode(_component_v_spacer)
      ]),
      _: 1
    })) : createCommentVNode("", true),
    createVNode(_component_v_data_table, {
      headers: $data.headers,
      items: $data.stocks,
      density: "compact",
      search: $data.search,
      "items-per-page": 10,
      class: "custom-table",
      "onClick:row": $options.goToProfile,
      hover: true
    }, {
      "item.company_name": withCtx(({ item }) => [
        createTextVNode(toDisplayString($props.title), 1)
      ]),
      "item.sym": withCtx(({ item }) => [
        createBaseVNode("div", _hoisted_2$1, [
          createVNode(_component_v_avatar, {
            size: "32",
            rounded: "1",
            class: "bg-white"
          }, {
            default: withCtx(() => {
              var _a, _b;
              return [
                ((_a = $data.logoStatus[item.sym]) == null ? void 0 : _a.local) ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  src: `/storage/images/logos/${item.sym}.png`,
                  alt: "Local Logo",
                  class: "w-100 h-100"
                }, null, 8, _hoisted_3$1)) : ((_b = $data.logoStatus[item.sym]) == null ? void 0 : _b.remote) ? (openBlock(), createElementBlock("img", {
                  key: 1,
                  src: `https://cdn.brandfetch.io/${item.sym}/icon/stock_symbol/fallback/404/h/40/w/40?c=${$data.apiKey}`,
                  alt: "Brandfetch Logo",
                  class: "w-100 h-100"
                }, null, 8, _hoisted_4$1)) : (openBlock(), createElementBlock("svg", _hoisted_5, _cache[0] || (_cache[0] = [
                  createBaseVNode("path", {
                    "fill-rule": "evenodd",
                    d: "M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"
                  }, null, -1)
                ])))
              ];
            }),
            _: 2
          }, 1024),
          !this.chartButton ? (openBlock(), createElementBlock("span", _hoisted_6, [
            createTextVNode(toDisplayString($props.title) + " ", 1),
            createBaseVNode("span", _hoisted_7, "[" + toDisplayString(item.sym ?? "—") + "]", 1)
          ])) : (openBlock(), createElementBlock("span", _hoisted_8, "[" + toDisplayString(item.sym ?? "—") + "]", 1))
        ])
      ]),
      "item.vwap": withCtx(({ item }) => [
        createBaseVNode("span", {
          class: normalizeClass([
            "font-mono transition-all duration-300",
            {
              "text-red": item.previous_vwap !== null && item.vwap < item.previous_vwap,
              "text-green": item.previous_vwap !== null && item.vwap > item.previous_vwap,
              "bg-green-lighten-4": $data.flashStates[item.sym] && item.vwap > item.previous_vwap,
              "bg-red-lighten-4": $data.flashStates[item.sym] && item.vwap < item.previous_vwap
            }
          ])
        }, " $" + toDisplayString(item.vwap != null ? item.vwap.toFixed(2) : "—"), 3)
      ]),
      "item.percentage_change": withCtx(({ item }) => [
        createBaseVNode("div", _hoisted_9, [
          createBaseVNode("span", null, [
            createBaseVNode("b", null, toDisplayString(item.priceChange), 1)
          ]),
          createBaseVNode("span", {
            style: normalizeStyle({
              backgroundColor: item.percentageChange < 0 ? "rgba(244, 67, 54, 0.2)" : item.percentageChange > 0 ? "rgba(76, 175, 80, 0.2)" : "transparent"
            }),
            class: normalizeClass([
              "font-mono px-2 py-1 rounded",
              item.percentageChange < 0 ? "text-red" : item.percentageChange > 0 ? "text-green" : "text-grey"
            ])
          }, toDisplayString(item.percentageChange) + "% ", 7)
        ])
      ]),
      "item.chart": withCtx(({ item }) => [
        createVNode(_component_v_btn, {
          color: "primary",
          variant: "flat",
          "prepend-icon": "mdi-chart-line",
          class: "text-white text-capitalize font-weight-bold",
          onClick: ($event) => $options.showStockGraph(item.sym),
          style: { "border": "1px solid rgba(255, 255, 255, 0.2) !important", "border-radius": "1px" }
        }, null, 8, ["onClick"])
      ]),
      bottom: withCtx(() => _cache[1] || (_cache[1] = [])),
      _: 1
    }, 8, ["headers", "items", "search", "onClick:row"])
  ]);
}
const LiveStocksTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-85a4e571"]]);
const _sfc_main = {
  name: "IntradayChart",
  components: {
    apexchart: m
  },
  props: {
    symbol: {
      type: String,
      default: "SPY"
    },
    previous_close: {
      type: String
    },
    height: {
      type: Number,
      default: 390
    }
  },
  data() {
    return {
      loading: true,
      chartOptions: {},
      chartSeries: [],
      previousCloseData: []
    };
  },
  async mounted() {
    this.loadChartData();
  },
  methods: {
    async loadChartData() {
      var _a, _b;
      try {
        const normalizedSymbol = ((_a = this.symbol) == null ? void 0 : _a.toUpperCase()) ?? "";
        const intradayRes = await fetch(`/storage/intraday/${normalizedSymbol}.json`);
        const intradayData = await intradayRes.json();
        const pricePoints = intradayData.map((entry) => ({
          x: new Date(entry[0]),
          y: entry[1]
        }));
        const lastPrice = (_b = pricePoints[pricePoints.length - 1]) == null ? void 0 : _b.y;
        var prevClosePrice = 0;
        if (this.previous_close === "") {
          try {
            const res = await axios.get(`/prev_close/${this.symbol}`);
            prevClosePrice = parseFloat(res.data["prev_day_close"]);
          } catch (error) {
            console.error("Error fetching previous close:", error);
          }
        } else {
          prevClosePrice = parseFloat(this.previous_close);
        }
        const isGreen = lastPrice >= prevClosePrice;
        const cutoff = new Date(intradayData[0][0]);
        cutoff.setUTCHours(20, 15, 0, 0);
        const pre_market_cutoff = new Date(intradayData[0][0]);
        pre_market_cutoff.setUTCHours(13, 30, 0, 0);
        const regularHoursData = [];
        const afterHoursData = [];
        const preMarketHoursData = [];
        intradayData.forEach((entry) => {
          const entryTime = new Date(entry[0]);
          if (entryTime <= pre_market_cutoff) {
            preMarketHoursData.push([entryTime.getTime(), entry[1]]);
          }
          if (entryTime >= cutoff) {
            afterHoursData.push([entryTime.getTime(), entry[1]]);
          } else {
            regularHoursData.push([entryTime.getTime(), entry[1]]);
          }
        });
        this.chartSeries = [
          {
            name: "Regular Hours",
            data: regularHoursData,
            color: isGreen ? "#00C076" : "#FF3B30"
          },
          {
            name: "After Hours",
            data: afterHoursData,
            color: isGreen ? "#A6EBC9" : "#F8B4B4"
          },
          {
            name: "Pre Market",
            data: preMarketHoursData,
            color: "#808080"
          }
        ];
        this.chartOptions = {
          annotations: {
            yaxis: [
              {
                y: prevClosePrice,
                borderColor: "#999",
                strokeDashArray: 4,
                label: {
                  borderColor: "#999",
                  style: {
                    color: "#fff",
                    background: "#999"
                  },
                  text: `Prev Close: $${prevClosePrice.toFixed(2)}`
                }
              }
            ]
          },
          chart: {
            id: `chart-${this.symbol}`,
            toolbar: { show: false },
            zoom: { enabled: false }
          },
          grid: {
            yaxis: {
              lines: {
                show: false
              }
            }
          },
          stroke: {
            curve: "straight",
            width: 2
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            type: "datetime"
          },
          colors: [isGreen ? "#00e396" : "#ff4560"],
          fill: {
            type: ["gradient", "solid"],
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.4,
              opacityTo: 0,
              stops: [0, 100],
              colorStops: [
                [
                  {
                    offset: 0,
                    color: isGreen ? "#00e396" : "#ff4560",
                    opacity: 0.4
                  },
                  {
                    offset: 100,
                    color: isGreen ? "#00e396" : "#ff4560",
                    opacity: 0
                  }
                ]
              ]
            },
            opacity: [1, 0]
          },
          tooltip: {
            x: {
              format: "HH:mm"
            },
            theme: "dark"
          }
        };
        this.loading = false;
      } catch (error) {
        console.error("Error loading chart data:", error);
        this.loading = false;
      }
    }
  }
};
const _hoisted_1 = { style: { "text-transform": "uppercase" } };
const _hoisted_2 = { class: "w-full" };
const _hoisted_3 = {
  key: 0,
  class: "flex items-center justify-center h-64"
};
const _hoisted_4 = { key: 1 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_card_title = resolveComponent("v-card-title");
  const _component_v_card = resolveComponent("v-card");
  const _component_apexchart = resolveComponent("apexchart");
  return openBlock(), createBlock(_component_v_card, {
    color: "primary",
    style: { "border": "1px solid rgba(255, 255, 255, 0.5)" }
  }, {
    default: withCtx(() => [
      createVNode(_component_v_card_title, null, {
        default: withCtx(() => [
          createBaseVNode("span", _hoisted_1, toDisplayString($props.symbol), 1),
          _cache[0] || (_cache[0] = createTextVNode(" - Intraday"))
        ]),
        _: 1
      }),
      createBaseVNode("div", _hoisted_2, [
        $data.loading ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createVNode(_component_v_card, { color: "primary" }, {
            default: withCtx(() => _cache[1] || (_cache[1] = [
              createBaseVNode("br", null, null, -1),
              createTextVNode(),
              createBaseVNode("br", null, null, -1),
              createBaseVNode("span", { class: "text-gray-500" }, [
                createBaseVNode("h3", null, " Loading chart...")
              ], -1)
            ])),
            _: 1
          })
        ])) : (openBlock(), createElementBlock("div", _hoisted_4, [
          createVNode(_component_apexchart, {
            type: "area",
            height: $props.height,
            options: $data.chartOptions,
            series: $data.chartSeries
          }, null, 8, ["height", "options", "series"])
        ]))
      ])
    ]),
    _: 1
  });
}
const IntradayGraph = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  IntradayGraph as I,
  LiveStocksTable as L
};
