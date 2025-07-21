import { r as resolveComponent, f as createElementBlock, o as openBlock, e as createBaseVNode, a as createVNode, w as withCtx, n as normalizeClass, b as createCommentVNode, j as createTextVNode, F as Fragment, k as renderList, t as toDisplayString, i as axios, u as useDisplay } from "./app-B8Z1Fyv-.js";
import { _ as _export_sfc, F as FooterComponent, b as _sfc_main$1, a as _sfc_main$2 } from "./FooterComponent-D7VV_RBj.js";
import { M as MarketStatus } from "./MarketStatus-BWNCAFoI.js";
import { m } from "./vue3-apexcharts-Dy1aaU6o.js";
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
      selectedStocks: [],
      showSelected: false,
      mdAndUp: useDisplay(),
      selectedStrategy: null,
      resultMessage: "",
      weights: {}
    };
  },
  computed: {
    filteredSymbols() {
      if (!this.searchTerm) return this.symbols;
      return this.symbols.filter(
        (item) => `${item.symbol} ${item.name}`.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    chartSeries() {
      return Object.values(this.weights);
    },
    chartOptions() {
      return {
        labels: Object.keys(this.weights),
        legend: {
          position: "bottom",
          labels: {
            colors: ["#fff"]
            // optional: make legend white
          }
        },
        chart: {
          background: "#0c1427"
        },
        tooltip: {
          theme: "dark"
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
    }
  },
  async mounted() {
    try {
      const response = await axios.get("/active-assets-with_companyname");
      const data = response.data.symbols;
      this.symbols = Object.entries(data).map(([symbol, name]) => ({
        symbol,
        name
      }));
    } catch (err) {
      console.error("Failed to load symbols", err);
    }
  },
  methods: {
    handleDrawerToggle(value) {
      this.drawer = value;
    },
    async optimizePortfolio() {
      this.showSelected = true;
      this.resultMessage = "";
      this.weights = {};
      const symbols = this.selectedStocks.map((s) => {
        if (typeof s === "string") {
          const match = s.match(/\[([A-Z.]+)\]$/);
          return match ? match[1] : s;
        } else {
          return s.symbol;
        }
      });
      try {
        const response = await axios.post("/optimize-portfolio", { symbols });
        this.resultMessage = response.data.message || "";
        if (response.data) {
          this.weights = response.data;
        } else {
          this.weights = {};
        }
      } catch (err) {
        this.weights = {};
        this.resultMessage = "Failed to optimize portfolio";
        alert(this.resultMessage);
      }
    }
  }
};
const _hoisted_1 = {
  key: 0,
  class: "mt-4",
  style: { "color": "#fff", "background": "#0c1427", "border": "2px solid #fff", "padding": "1em", "border-radius": "8px" }
};
const _hoisted_2 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Navbar = resolveComponent("Navbar");
  const _component_Sidebar = resolveComponent("Sidebar");
  const _component_MarketStatus = resolveComponent("MarketStatus");
  const _component_v_col = resolveComponent("v-col");
  const _component_v_row = resolveComponent("v-row");
  const _component_v_autocomplete = resolveComponent("v-autocomplete");
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_btn = resolveComponent("v-btn");
  const _component_apexchart = resolveComponent("apexchart");
  const _component_v_container = resolveComponent("v-container");
  const _component_FooterComponent = resolveComponent("FooterComponent");
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
            createVNode(_component_Navbar, { onToggleDrawer: $options.handleDrawerToggle }, null, 8, ["onToggleDrawer"]),
            createVNode(_component_Sidebar, {
              drawer: $data.drawer,
              "onUpdate:drawer": $options.handleDrawerToggle
            }, null, 8, ["drawer", "onUpdate:drawer"]),
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
                          default: withCtx(() => [
                            _cache[5] || (_cache[5] = createBaseVNode("h3", null, "Portfolio Optimizer", -1)),
                            createVNode(_component_v_autocomplete, {
                              modelValue: $data.selectedStocks,
                              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.selectedStocks = $event),
                              items: $options.filteredSymbols,
                              "item-title": (item) => item ? `${item.name} [${item.symbol}]` : "",
                              label: "Select stocks",
                              multiple: "",
                              chips: "",
                              clearable: "",
                              style: { "background": "#0c1427", "color": "#fff", "border": "2px solid #fff" },
                              search: $data.searchTerm,
                              "onUpdate:search": _cache[1] || (_cache[1] = ($event) => $data.searchTerm = $event)
                            }, null, 8, ["modelValue", "items", "item-title", "search"]),
                            _cache[6] || (_cache[6] = createBaseVNode("br", null, null, -1)),
                            createVNode(_component_v_btn, {
                              color: "accent",
                              variant: "tonal",
                              text: "",
                              ref: "bullSpread",
                              onClick: $options.optimizePortfolio
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_icon, null, {
                                  default: withCtx(() => _cache[2] || (_cache[2] = [
                                    createTextVNode("mdi-play")
                                  ])),
                                  _: 1
                                }),
                                _cache[3] || (_cache[3] = createBaseVNode("span", null, "Optimize", -1))
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            $data.showSelected ? (openBlock(), createElementBlock("div", _hoisted_1, [
                              $data.weights && Object.keys($data.weights).length ? (openBlock(), createElementBlock("div", _hoisted_2, [
                                _cache[4] || (_cache[4] = createBaseVNode("h4", null, "Latest Prices:", -1)),
                                createBaseVNode("ul", null, [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList($data.weights, (price, symbol) => {
                                    return openBlock(), createElementBlock("li", { key: symbol }, toDisplayString(symbol) + ": " + toDisplayString(price), 1);
                                  }), 128))
                                ]),
                                createVNode(_component_apexchart, {
                                  type: "pie",
                                  options: $options.chartOptions,
                                  series: $options.chartSeries,
                                  width: "380"
                                }, null, 8, ["options", "series"])
                              ])) : createCommentVNode("", true)
                            ])) : createCommentVNode("", true)
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
const SelectStocksForPortfolioOptimizer = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cbf9045f"]]);
export {
  SelectStocksForPortfolioOptimizer as default
};
