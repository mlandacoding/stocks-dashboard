import { _ as _export_sfc, u as useStockStream } from "./FooterComponent-P6LQ7qTb.js";
import { r as resolveComponent, f as createElementBlock, o as openBlock, a as createVNode, w as withCtx, e as createBaseVNode, j as createTextVNode, t as toDisplayString, n as normalizeClass, p as normalizeStyle } from "./app-CisVKhMf.js";
const _sfc_main = {
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
            createTextVNode(" $" + toDisplayString($data.stock.vwap != null ? $data.stock.vwap.toFixed(2) : "—"), 1)
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
const LiveSingleStockComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-59a6bcaa"]]);
export {
  LiveSingleStockComponent as L
};
