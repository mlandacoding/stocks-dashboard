import { _ as _export_sfc, F as FooterComponent, b as _sfc_main$6, a as _sfc_main$7 } from "./FooterComponent-D7VV_RBj.js";
import { M as MarketStatus } from "./MarketStatus-BWNCAFoI.js";
import { L as LiveSingleStockComponent } from "./LiveSingleStockComponent-Bk4d3-lv.js";
import { m } from "./vue3-apexcharts-Dy1aaU6o.js";
import { r as resolveComponent, f as createElementBlock, o as openBlock, a as createVNode, w as withCtx, j as createTextVNode, e as createBaseVNode, t as toDisplayString, F as Fragment, c as createBlock, b as createCommentVNode, n as normalizeClass } from "./app-B8Z1Fyv-.js";
import "./useStockStream-BjAXdcwL.js";
const _hoisted_1$4 = { class: "mb-2" };
const _hoisted_2$4 = { class: "text-caption text-grey-lighten-1" };
const _hoisted_3$4 = { class: "text-caption text-blue-lighten-1" };
const _hoisted_4$2 = { class: "text-caption text-blue-lighten-1" };
const _hoisted_5$1 = { class: "text-caption text-blue-lighten-1" };
const _hoisted_6 = { class: "pl-3" };
const _hoisted_7 = { class: "mb-2" };
const _hoisted_8 = { class: "text-caption text-grey-lighten-1" };
const _hoisted_9 = { class: "text-caption text-blue-lighten-1" };
const _hoisted_10 = { class: "text-caption text-blue-lighten-1" };
const _hoisted_11 = { class: "text-caption text-blue-lighten-1" };
const _hoisted_12 = { class: "pl-3" };
const _sfc_main$5 = {
  __name: "SelectedOptionsDetails",
  props: {
    selectedITMOption: {
      type: Object,
      required: true
    },
    selectedOTMOption: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_v_card_title = resolveComponent("v-card-title");
      const _component_v_col = resolveComponent("v-col");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_card_text = resolveComponent("v-card-text");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_v_card_title, { class: "text-h6" }, {
          default: withCtx(() => _cache[0] || (_cache[0] = [
            createTextVNode("Selected Options Details")
          ])),
          _: 1
        }),
        createVNode(_component_v_card_text, null, {
          default: withCtx(() => [
            createVNode(_component_v_row, { dense: "" }, {
              default: withCtx(() => [
                createVNode(_component_v_col, {
                  cols: "12",
                  sm: "6"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_1$4, [
                      createBaseVNode("div", _hoisted_2$4, toDisplayString(__props.selectedITMOption.option_symbol), 1),
                      createBaseVNode("div", _hoisted_3$4, "Last Price: " + toDisplayString(__props.selectedITMOption.last_price), 1),
                      createBaseVNode("div", _hoisted_4$2, "Strike Price: " + toDisplayString(__props.selectedITMOption.strike_price), 1),
                      createBaseVNode("div", _hoisted_5$1, "Implied Volatility: " + toDisplayString(__props.selectedITMOption.implied_volatility), 1)
                    ]),
                    createBaseVNode("ul", _hoisted_6, [
                      createBaseVNode("li", null, "Delta: " + toDisplayString(__props.selectedITMOption.delta), 1),
                      createBaseVNode("li", null, "Gamma: " + toDisplayString(__props.selectedITMOption.gamma), 1),
                      createBaseVNode("li", null, "Theta: " + toDisplayString(__props.selectedITMOption.theta), 1),
                      createBaseVNode("li", null, "Vega: " + toDisplayString(__props.selectedITMOption.vega), 1)
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_v_col, {
                  cols: "12",
                  sm: "6"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_7, [
                      createBaseVNode("div", _hoisted_8, toDisplayString(__props.selectedOTMOption.option_symbol), 1),
                      createBaseVNode("div", _hoisted_9, "Last Price: " + toDisplayString(__props.selectedOTMOption.last_price), 1),
                      createBaseVNode("div", _hoisted_10, "Strike Price: " + toDisplayString(__props.selectedOTMOption.strike_price), 1),
                      createBaseVNode("div", _hoisted_11, "Implied Volatility: " + toDisplayString(__props.selectedOTMOption.implied_volatility), 1)
                    ]),
                    createBaseVNode("ul", _hoisted_12, [
                      createBaseVNode("li", null, "Delta: " + toDisplayString(__props.selectedOTMOption.delta), 1),
                      createBaseVNode("li", null, "Gamma: " + toDisplayString(__props.selectedOTMOption.gamma), 1),
                      createBaseVNode("li", null, "Theta: " + toDisplayString(__props.selectedOTMOption.theta), 1),
                      createBaseVNode("li", null, "Vega: " + toDisplayString(__props.selectedOTMOption.vega), 1)
                    ])
                  ]),
                  _: 1
                })
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
const _sfc_main$4 = {
  name: "BullCallSpread",
  props: {
    strategy: String,
    symbol: String,
    in_the_money_calls: Object,
    out_of_the_money_calls: Object,
    callsByExpiration: Object
  },
  components: {
    apexchart: m,
    LiveSingleStockComponent,
    SelectedOptionsDetails: _sfc_main$5
  },
  data() {
    return {
      drawer: false,
      selectedExpiration: null,
      selectedITMOption: null,
      selectedOTMOption: null,
      expirationDates: [],
      ITMOptions: [],
      OTMOptions: [],
      maximumLoss: 0,
      maximumProfit: 0,
      breakEven: 0,
      chartOptions: {
        chart: {
          id: "bull-spread-payoff",
          toolbar: { show: false },
          zoom: { enabled: false },
          background: "transparent"
        },
        colors: ["#00e396", "#ff4560"],
        xaxis: {
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
          enabled: true,
          theme: "dark",
          y: {
            formatter: (val) => `$${val.toFixed(2)}`,
            title: {
              formatter: () => "P/L"
            }
          },
          x: {
            show: true,
            formatter: (val) => `Price: $${val}`
          }
        },
        annotations: {},
        markers: {
          size: 0,
          strokeColors: "#fff",
          strokeWidth: 2
        },
        fill: {
          type: "solid"
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        }
      },
      chartSeries: []
    };
  },
  mounted() {
    this.expirationDates = Object.keys(this.callsByExpiration).sort();
    if (this.expirationDates.length) {
      this.selectedExpiration = this.expirationDates[0];
    }
    document.title = "Bull Call Spread Visualizer | Options Strategy Builder";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "Visualize Bull Call Spread strategies using real-time stock data. Analyze risk/reward and payoff diagrams with our free interactive options tool.";
  },
  methods: {
    handleDrawerToggle() {
      this.drawer = !this.drawer;
    },
    itemTitle(option) {
      if (!option) return "";
      return `${option.strike_price} (${option.option_symbol}) - $${option.last_price}`;
    },
    getMaximumLoss() {
      if (this.selectedITMOption && this.selectedOTMOption) {
        return this.selectedITMOption.last_price - this.selectedOTMOption.last_price;
      }
      return 0;
    },
    getMaximumProfit() {
      if (this.selectedITMOption && this.selectedOTMOption) {
        return this.selectedOTMOption.strike_price - this.selectedITMOption.strike_price - this.getMaximumLoss();
      }
      return 0;
    },
    getBreakeven() {
      if (this.selectedITMOption && this.selectedOTMOption) {
        return Number(this.selectedITMOption.strike_price) + Number(this.getMaximumLoss());
      }
      return 0;
    },
    updateMetrics() {
      if (this.selectedITMOption && this.selectedOTMOption) {
        this.maximumLoss = this.getMaximumLoss();
        this.maximumProfit = this.getMaximumProfit();
        this.breakEven = this.getBreakeven();
      } else {
        this.maximumLoss = 0;
        this.maximumProfit = 0;
        this.breakEven = 0;
      }
    },
    generateChartData() {
      if (!this.selectedITMOption || !this.selectedOTMOption) return;
      const lowerStrike = Number(this.selectedITMOption.strike_price);
      const upperStrike = Number(this.selectedOTMOption.strike_price);
      const netDebit = Number(this.selectedITMOption.last_price) - Number(this.selectedOTMOption.last_price);
      const minPrice = Math.max(1, Math.floor(lowerStrike * 0.9));
      const maxPrice = Math.ceil(upperStrike * 1.1);
      const profitSeries = [];
      const lossSeries = [];
      let price = minPrice;
      for (price; price <= maxPrice; price += 1) {
        let pnl = 0;
        if (price <= lowerStrike) {
          pnl = -netDebit;
        } else if (price >= upperStrike) {
          pnl = upperStrike - lowerStrike - netDebit;
        } else {
          pnl = price - lowerStrike - netDebit;
        }
        profitSeries.push({ x: price, y: pnl > 0 ? pnl : 0 });
        lossSeries.push({ x: price, y: pnl < 0 ? pnl : 0 });
      }
      this.chartSeries = [
        { name: "Profit", data: profitSeries },
        { name: "Loss", data: lossSeries }
      ];
      this.chartOptions = {
        ...this.chartOptions,
        stroke: {
          curve: "straight",
          width: 2
        },
        fill: {
          type: "solid",
          opacity: 0.4
        }
      };
    }
  },
  watch: {
    selectedExpiration(newVal) {
      this.ITMOptions = this.in_the_money_calls[newVal];
      this.OTMOptions = this.out_of_the_money_calls[newVal];
      this.selectedITMOption = null;
      this.selectedOTMOption = null;
    },
    selectedITMOption() {
      this.updateMetrics();
      this.generateChartData();
    },
    selectedOTMOption() {
      this.updateMetrics();
      this.generateChartData();
    }
  }
};
const _hoisted_1$3 = { style: { "color": "#ff4560" } };
const _hoisted_2$3 = { style: { "color": "#00e396" } };
const _hoisted_3$3 = { style: { "color": "#facc15" } };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_select = resolveComponent("v-select");
  const _component_v_col = resolveComponent("v-col");
  const _component_v_alert = resolveComponent("v-alert");
  const _component_v_row = resolveComponent("v-row");
  const _component_v_card_title = resolveComponent("v-card-title");
  const _component_apexchart = resolveComponent("apexchart");
  const _component_v_card_text = resolveComponent("v-card-text");
  const _component_v_card = resolveComponent("v-card");
  const _component_SelectedOptionsDetails = resolveComponent("SelectedOptionsDetails");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_v_row, {
      dense: "",
      class: "ma-0 pa-1"
    }, {
      default: withCtx(() => [
        createVNode(_component_v_col, {
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_select, {
              modelValue: $data.selectedExpiration,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.selectedExpiration = $event),
              items: $data.expirationDates,
              label: "Select Expiration",
              variant: "underlined",
              dense: ""
            }, null, 8, ["modelValue", "items"])
          ]),
          _: 1
        }),
        createVNode(_component_v_col, {
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_select, {
              modelValue: $data.selectedITMOption,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.selectedITMOption = $event),
              items: $data.ITMOptions,
              "item-title": $options.itemTitle,
              "item-value": "option_symbol",
              "return-object": "",
              label: "Select In-The-Money Call",
              variant: "underlined",
              dense: ""
            }, null, 8, ["modelValue", "items", "item-title"])
          ]),
          _: 1
        }),
        createVNode(_component_v_col, {
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_select, {
              modelValue: $data.selectedOTMOption,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.selectedOTMOption = $event),
              items: $data.OTMOptions,
              "item-title": $options.itemTitle,
              "item-value": "option_symbol",
              "return-object": "",
              label: "Select Out-Of-The-Money Call",
              variant: "underlined",
              dense: ""
            }, null, 8, ["modelValue", "items", "item-title"])
          ]),
          _: 1
        }),
        createVNode(_component_v_col, { cols: "12" }, {
          default: withCtx(() => [
            $data.maximumProfit < 0 ? (openBlock(), createBlock(_component_v_alert, {
              key: 0,
              color: "#C51162",
              icon: "mdi-cancel",
              theme: "dark",
              density: "compact",
              border: ""
            }, {
              default: withCtx(() => _cache[3] || (_cache[3] = [
                createTextVNode(" Your selected options would result in a negative maximum profit ")
              ])),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    createVNode(_component_v_row, {
      dense: "",
      class: "ma-0 pa-0"
    }, {
      default: withCtx(() => [
        createVNode(_component_v_col, {
          cols: "12",
          sm: "8"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_card, {
              class: "pa-0",
              style: { "background": "#181f3a", "color": "#fff", "border-radius": "8px", "border": "1px solid #2c365a" }
            }, {
              default: withCtx(() => [
                createVNode(_component_v_card_title, {
                  class: "text-h6 mb-3",
                  style: { "align-content": "center" }
                }, {
                  default: withCtx(() => _cache[4] || (_cache[4] = [
                    createTextVNode(" Strategy P&L Summary ")
                  ])),
                  _: 1
                }),
                createVNode(_component_v_row, { dense: "" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[5] || (_cache[5] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Max Loss:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_1$3, "$" + toDisplayString($data.maximumLoss.toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[6] || (_cache[6] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Max Profit Kat:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_2$3, "$" + toDisplayString($data.maximumProfit.toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[7] || (_cache[7] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Break Even:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_3$3, "$" + toDisplayString($data.breakEven.toFixed(2)), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_card_text, null, {
                  default: withCtx(() => [
                    createVNode(_component_apexchart, {
                      width: "100%",
                      height: "300",
                      type: "area",
                      options: $data.chartOptions,
                      series: $data.chartSeries
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
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            $data.selectedITMOption && $data.selectedOTMOption ? (openBlock(), createBlock(_component_v_card, {
              key: 0,
              class: "pa-4",
              style: { "background": "#181f3a", "color": "#fff", "border-radius": "8px", "border": "1px solid #2c365a" }
            }, {
              default: withCtx(() => [
                createVNode(_component_SelectedOptionsDetails, {
                  selectedITMOption: $data.selectedITMOption,
                  selectedOTMOption: $data.selectedOTMOption
                }, null, 8, ["selectedITMOption", "selectedOTMOption"])
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ], 64);
}
const BullCallSpread = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const _sfc_main$3 = {
  name: "BearPutSpread",
  props: {
    strategy: String,
    symbol: String,
    in_the_money_puts: Object,
    out_of_the_money_puts: Object,
    putsByExpiration: Object
  },
  components: {
    apexchart: m,
    LiveSingleStockComponent,
    SelectedOptionsDetails: _sfc_main$5
  },
  data() {
    return {
      drawer: false,
      selectedExpiration: null,
      selectedITMOption: null,
      selectedOTMOption: null,
      expirationDates: [],
      ITMOptions: [],
      OTMOptions: [],
      maximumLoss: 0,
      maximumProfit: 0,
      breakEven: 0,
      chartOptions: {
        chart: {
          id: "bull-spread-payoff",
          toolbar: { show: false },
          zoom: { enabled: false },
          background: "transparent"
        },
        colors: ["#00e396", "#ff4560"],
        xaxis: {
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
          enabled: true,
          theme: "dark",
          y: {
            formatter: (val) => `$${val.toFixed(2)}`,
            title: {
              formatter: () => "P/L"
            }
          },
          x: {
            show: true,
            formatter: (val) => `Price: $${val}`
          }
        },
        annotations: {},
        markers: {
          size: 0,
          strokeColors: "#fff",
          strokeWidth: 2
        },
        fill: {
          type: "solid"
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        }
      },
      chartSeries: []
    };
  },
  mounted() {
    this.expirationDates = Object.keys(this.putsByExpiration).sort();
    if (this.expirationDates.length) {
      this.selectedExpiration = this.expirationDates[0];
    }
    document.title = "Bear Put Spread Visualizer | Options Strategy Builder";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "Analyze Bear Put Spread strategies in real-time. Use our interactive builder to understand payoffs, breakevens, and downside protection.";
  },
  methods: {
    handleDrawerToggle() {
      this.drawer = !this.drawer;
    },
    itemTitle(option) {
      if (!option) return "";
      return `${option.strike_price} (${option.option_symbol}) - $${option.last_price}`;
    },
    getMaximumLoss() {
      if (this.selectedITMOption && this.selectedOTMOption) {
        return this.selectedITMOption.last_price - this.selectedOTMOption.last_price;
      }
      return 0;
    },
    getMaximumProfit() {
      if (this.selectedITMOption && this.selectedOTMOption) {
        return this.selectedITMOption.strike_price - this.selectedOTMOption.strike_price - this.getMaximumLoss();
      }
      return 0;
    },
    getBreakeven() {
      if (this.selectedITMOption && this.selectedOTMOption) {
        return Number(this.selectedITMOption.strike_price) - Number(this.getMaximumLoss());
      }
      return 0;
    },
    updateMetrics() {
      if (this.selectedITMOption && this.selectedOTMOption) {
        this.maximumLoss = this.getMaximumLoss();
        this.maximumProfit = this.getMaximumProfit();
        this.breakEven = this.getBreakeven();
      } else {
        this.maximumLoss = 0;
        this.maximumProfit = 0;
        this.breakEven = 0;
      }
    },
    generateChartData() {
      if (!this.selectedITMOption || !this.selectedOTMOption) return;
      const higherStrike = Number(this.selectedITMOption.strike_price);
      const lowerStrike = Number(this.selectedOTMOption.strike_price);
      const netDebit = Number(this.selectedITMOption.last_price) - Number(this.selectedOTMOption.last_price);
      const minPrice = Math.max(1, Math.floor(lowerStrike * 0.9));
      const maxPrice = Math.ceil(higherStrike * 1.1);
      const profitSeries = [];
      const lossSeries = [];
      for (let price = minPrice; price <= maxPrice; price++) {
        let pnl = 0;
        if (price <= lowerStrike) {
          pnl = higherStrike - lowerStrike - netDebit;
        } else if (price >= higherStrike) {
          pnl = -netDebit;
        } else {
          pnl = higherStrike - price - netDebit;
        }
        profitSeries.push({ x: price, y: pnl > 0 ? pnl : 0 });
        lossSeries.push({ x: price, y: pnl < 0 ? pnl : 0 });
      }
      this.chartSeries = [
        { name: "Profit", data: profitSeries },
        { name: "Loss", data: lossSeries }
      ];
    }
  },
  watch: {
    selectedExpiration(newVal) {
      this.ITMOptions = this.in_the_money_puts[newVal];
      this.OTMOptions = this.out_of_the_money_puts[newVal];
      this.selectedITMOption = null;
      this.selectedOTMOption = null;
    },
    selectedITMOption() {
      this.updateMetrics();
      this.generateChartData();
    },
    selectedOTMOption() {
      this.updateMetrics();
      this.generateChartData();
    }
  }
};
const _hoisted_1$2 = { style: { "color": "#ff4560" } };
const _hoisted_2$2 = { style: { "color": "#00e396" } };
const _hoisted_3$2 = { style: { "color": "#facc15" } };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_select = resolveComponent("v-select");
  const _component_v_col = resolveComponent("v-col");
  const _component_v_alert = resolveComponent("v-alert");
  const _component_v_row = resolveComponent("v-row");
  const _component_v_card_title = resolveComponent("v-card-title");
  const _component_apexchart = resolveComponent("apexchart");
  const _component_v_card_text = resolveComponent("v-card-text");
  const _component_v_card = resolveComponent("v-card");
  const _component_SelectedOptionsDetails = resolveComponent("SelectedOptionsDetails");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_v_row, {
      dense: "",
      class: "ma-0 pa-1"
    }, {
      default: withCtx(() => [
        createVNode(_component_v_col, {
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_select, {
              modelValue: $data.selectedExpiration,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.selectedExpiration = $event),
              items: $data.expirationDates,
              label: "Select Expiration",
              variant: "underlined",
              dense: ""
            }, null, 8, ["modelValue", "items"])
          ]),
          _: 1
        }),
        createVNode(_component_v_col, {
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_select, {
              modelValue: $data.selectedITMOption,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.selectedITMOption = $event),
              items: $data.ITMOptions,
              "item-title": $options.itemTitle,
              "item-value": "option_symbol",
              "return-object": "",
              label: "Select In-The-Money Put",
              variant: "underlined",
              dense: ""
            }, null, 8, ["modelValue", "items", "item-title"])
          ]),
          _: 1
        }),
        createVNode(_component_v_col, {
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_select, {
              modelValue: $data.selectedOTMOption,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.selectedOTMOption = $event),
              items: $data.OTMOptions,
              "item-title": $options.itemTitle,
              "item-value": "option_symbol",
              "return-object": "",
              label: "Select Out-Of-The-Money Put",
              variant: "underlined",
              dense: ""
            }, null, 8, ["modelValue", "items", "item-title"])
          ]),
          _: 1
        }),
        createVNode(_component_v_col, { cols: "12" }, {
          default: withCtx(() => [
            $data.maximumProfit < 0 ? (openBlock(), createBlock(_component_v_alert, {
              key: 0,
              color: "#C51162",
              icon: "mdi-cancel",
              theme: "dark",
              density: "compact",
              border: ""
            }, {
              default: withCtx(() => _cache[3] || (_cache[3] = [
                createTextVNode(" Your selected options would result in a negative maximum profit ")
              ])),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    createVNode(_component_v_row, {
      dense: "",
      class: "ma-0 pa-0"
    }, {
      default: withCtx(() => [
        createVNode(_component_v_col, {
          cols: "12",
          sm: "8"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_card, {
              class: "pa-0",
              style: { "background": "#181f3a", "color": "#fff", "border-radius": "8px", "border": "1px solid #2c365a" }
            }, {
              default: withCtx(() => [
                createVNode(_component_v_card_title, {
                  class: "text-h6 mb-3",
                  style: { "align-content": "center" }
                }, {
                  default: withCtx(() => _cache[4] || (_cache[4] = [
                    createTextVNode(" Strategy P&L Summary ")
                  ])),
                  _: 1
                }),
                createVNode(_component_v_row, { dense: "" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[5] || (_cache[5] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Max Loss:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_1$2, "$" + toDisplayString($data.maximumLoss.toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[6] || (_cache[6] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Max Profit:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_2$2, "$" + toDisplayString($data.maximumProfit.toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[7] || (_cache[7] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Break Even:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_3$2, "$" + toDisplayString($data.breakEven.toFixed(2)), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_card_text, null, {
                  default: withCtx(() => [
                    createVNode(_component_apexchart, {
                      width: "100%",
                      height: "300",
                      type: "area",
                      options: $data.chartOptions,
                      series: $data.chartSeries
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
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            $data.selectedITMOption && $data.selectedOTMOption ? (openBlock(), createBlock(_component_v_card, {
              key: 0,
              class: "pa-4",
              style: { "background": "#181f3a", "color": "#fff", "border-radius": "8px", "border": "1px solid #2c365a" }
            }, {
              default: withCtx(() => [
                createVNode(_component_SelectedOptionsDetails, {
                  selectedITMOption: $data.selectedITMOption,
                  selectedOTMOption: $data.selectedOTMOption
                }, null, 8, ["selectedITMOption", "selectedOTMOption"])
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ], 64);
}
const BearPutSpread = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3]]);
const _sfc_main$2 = {
  name: "LongStraddle",
  props: {
    strategy: String,
    symbol: String,
    in_the_money_puts: Object,
    in_the_money_calls: Object,
    expirationDates: Array
  },
  components: {
    apexchart: m,
    LiveSingleStockComponent,
    SelectedOptionsDetails: _sfc_main$5
  },
  data() {
    return {
      drawer: false,
      selectedExpiration: null,
      selectedITMCall: null,
      selectedITMPut: null,
      underlying_asset_price: null,
      ITMCalls: [],
      ITMPuts: [],
      maximumLoss: 0,
      maximumProfit: 0,
      breakEven: 0,
      chartOptions: {
        chart: {
          id: "bull-spread-payoff",
          toolbar: { show: false },
          zoom: { enabled: false },
          background: "transparent"
        },
        colors: ["#00e396", "#ff4560"],
        xaxis: {
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
          enabled: true,
          theme: "dark",
          y: {
            formatter: (val) => `$${val.toFixed(2)}`,
            title: {
              formatter: () => "P/L"
            }
          },
          x: {
            show: true,
            formatter: (val) => `Price: $${val}`
          }
        },
        annotations: {},
        markers: {
          size: 0,
          strokeColors: "#fff",
          strokeWidth: 2
        },
        fill: {
          type: "solid"
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        }
      },
      chartSeries: []
    };
  },
  async mounted() {
    if (this.expirationDates.length) {
      this.selectedExpiration = this.expirationDates[0];
    }
    try {
      const latestRes = await axios.get(`/latest_price/${this.symbol}`);
      this.underlying_asset_price = parseFloat(latestRes.data["price"]);
    } catch (error) {
      console.error("Failed to load prevCloseMap:", error);
    }
    document.title = "Long Straddle Visualizer | Options Strategy Builder";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "Build and analyze Long Straddle options strategies. Visualize potential profits from volatility using our free and interactive payoff chart tool.";
  },
  methods: {
    handleDrawerToggle() {
      this.drawer = !this.drawer;
    },
    itemTitle(option) {
      if (!option) return "";
      return `${option.strike_price} (${option.option_symbol}) - $${option.last_price}`;
    },
    getMaximumLoss() {
      if (this.selectedITMCall && this.selectedITMPut) {
        return Number(this.selectedITMCall.last_price) + Number(this.selectedITMPut.last_price);
      }
      return 0;
    },
    getMaximumProfitUp() {
      if (this.selectedITMCall && this.selectedITMPut) {
        const strike = Number(this.selectedITMCall.strike_price);
        const callPremium = Number(this.selectedITMCall.last_price);
        const putPremium = Number(this.selectedITMPut.last_price);
        const netDebit = callPremium + putPremium;
        const simulatedHigh = strike * 1.5;
        const callPayoff = Math.max(simulatedHigh - strike, 0);
        const putPayoff = 0;
        return callPayoff + putPayoff - netDebit;
      }
      return 0;
    },
    getMaximumProfitDown() {
      if (this.selectedITMCall && this.selectedITMPut) {
        const strike = Number(this.selectedITMPut.strike_price);
        const callPremium = Number(this.selectedITMCall.last_price);
        const putPremium = Number(this.selectedITMPut.last_price);
        const netDebit = callPremium + putPremium;
        const simulatedLow = -strike * 1.5;
        const putPayoff = Math.max(strike - simulatedLow, 0);
        const callPayoff = 0;
        return putPayoff + callPayoff - netDebit;
      }
      return 0;
    },
    getMaximumProfit() {
      if (this.selectedITMCall && this.selectedITMPut) {
        return this.selectedITMCall.strike_price - this.selectedITMPut.strike_price - this.getMaximumLoss();
      }
      return 0;
    },
    getBreakeven() {
      if (this.selectedITMCall && this.selectedITMPut) {
        return Number(this.selectedITMCall.strike_price) + Number(this.getMaximumLoss());
      }
      return 0;
    },
    updateMetrics() {
      if (this.selectedITMCall && this.selectedITMPut) {
        this.maximumLoss = this.getMaximumLoss();
        console.log(this.maximumLoss);
        this.maximumProfit = this.getMaximumProfit();
        this.breakEven = this.getBreakeven();
      } else {
        this.maximumLoss = 0;
        this.maximumProfit = 0;
        this.breakEven = 0;
      }
    },
    generateChartData() {
      if (!this.selectedITMCall || !this.selectedITMPut) return;
      const strike = Number(this.selectedITMCall.strike_price);
      const callPremium = Number(this.selectedITMCall.last_price);
      const putPremium = Number(this.selectedITMPut.last_price);
      const netDebit = callPremium + putPremium;
      const minPrice = Math.max(1, Math.floor(strike * 0.5));
      const maxPrice = Math.ceil(strike * 1.5);
      const profitSeries = [];
      const lossSeries = [];
      for (let price = minPrice; price <= maxPrice; price++) {
        let callPayoff = Math.max(price - strike, 0);
        let putPayoff = Math.max(strike - price, 0);
        let pnl = callPayoff + putPayoff - netDebit;
        profitSeries.push({ x: price, y: pnl > 0 ? pnl : 0 });
        lossSeries.push({ x: price, y: pnl < 0 ? pnl : 0 });
      }
      this.chartSeries = [
        { name: "Profit", data: profitSeries },
        { name: "Loss", data: lossSeries }
      ];
      this.chartOptions = {
        ...this.chartOptions,
        stroke: {
          curve: "straight",
          width: 2
        },
        fill: {
          type: "solid",
          opacity: 0.4
        }
      };
    }
  },
  watch: {
    selectedExpiration(newVal) {
      this.ITMCalls = this.in_the_money_calls[newVal];
      this.ITMPuts = this.in_the_money_puts[newVal];
      this.selectedITMCall = null;
      this.selectedITMPut = null;
    },
    selectedITMCall() {
      this.updateMetrics();
      this.generateChartData();
    },
    selectedITMPut() {
      this.updateMetrics();
      this.generateChartData();
    }
  }
};
const _hoisted_1$1 = { style: { "color": "#ff4560" } };
const _hoisted_2$1 = { style: { "color": "#00e396" } };
const _hoisted_3$1 = { style: { "color": "#00e396" } };
const _hoisted_4$1 = { style: { "color": "#facc15" } };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_select = resolveComponent("v-select");
  const _component_v_col = resolveComponent("v-col");
  const _component_v_alert = resolveComponent("v-alert");
  const _component_v_row = resolveComponent("v-row");
  const _component_v_card_title = resolveComponent("v-card-title");
  const _component_apexchart = resolveComponent("apexchart");
  const _component_v_card_text = resolveComponent("v-card-text");
  const _component_v_card = resolveComponent("v-card");
  const _component_SelectedOptionsDetails = resolveComponent("SelectedOptionsDetails");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_v_row, {
      dense: "",
      class: "ma-0 pa-1"
    }, {
      default: withCtx(() => [
        createVNode(_component_v_col, {
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_select, {
              modelValue: $data.selectedExpiration,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.selectedExpiration = $event),
              items: $props.expirationDates,
              label: "Select Expiration",
              variant: "underlined",
              dense: ""
            }, null, 8, ["modelValue", "items"])
          ]),
          _: 1
        }),
        createVNode(_component_v_col, {
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_select, {
              modelValue: $data.selectedITMCall,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.selectedITMCall = $event),
              items: $data.ITMCalls,
              "item-title": $options.itemTitle,
              "item-value": "option_symbol",
              "return-object": "",
              label: "Select In-The-Money Call",
              variant: "underlined",
              dense: ""
            }, null, 8, ["modelValue", "items", "item-title"])
          ]),
          _: 1
        }),
        createVNode(_component_v_col, {
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_select, {
              modelValue: $data.selectedITMPut,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.selectedITMPut = $event),
              items: $data.ITMPuts,
              "item-title": $options.itemTitle,
              "item-value": "option_symbol",
              "return-object": "",
              label: "Select In-The-Money Put",
              variant: "underlined",
              dense: ""
            }, null, 8, ["modelValue", "items", "item-title"])
          ]),
          _: 1
        }),
        createVNode(_component_v_col, { cols: "12" }, {
          default: withCtx(() => [
            createVNode(_component_v_alert, {
              color: "blue",
              icon: "mdi-alert",
              theme: "dark",
              density: "compact",
              border: ""
            }, {
              default: withCtx(() => _cache[3] || (_cache[3] = [
                createTextVNode(" In order to find more financial instruments for this strategy the "),
                createBaseVNode("b", null, "In The Money", -1),
                createTextVNode(" calculation has a 5% tolerance ")
              ])),
              _: 1
            })
          ]),
          _: 1
        }),
        createVNode(_component_v_col, { cols: "12" }, {
          default: withCtx(() => [
            $options.getMaximumProfitUp() < 0 ? (openBlock(), createBlock(_component_v_alert, {
              key: 0,
              color: "#C51162",
              icon: "mdi-cancel",
              theme: "dark",
              density: "compact",
              border: ""
            }, {
              default: withCtx(() => _cache[4] || (_cache[4] = [
                createTextVNode(" Your selected options would result in a negative maximum profit ")
              ])),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(_component_v_col, { cols: "12" }, {
          default: withCtx(() => {
            var _a, _b;
            return [
              ((_a = $data.selectedITMCall) == null ? void 0 : _a.strike_price) != ((_b = $data.selectedITMPut) == null ? void 0 : _b.strike_price) ? (openBlock(), createBlock(_component_v_alert, {
                key: 0,
                color: "#C51162",
                icon: "mdi-cancel",
                theme: "dark",
                density: "compact",
                border: ""
              }, {
                default: withCtx(() => _cache[5] || (_cache[5] = [
                  createTextVNode(" Both options selected must have the same strike price to be considered a valid Straddle ")
                ])),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }),
          _: 1
        })
      ]),
      _: 1
    }),
    createVNode(_component_v_row, {
      dense: "",
      class: "ma-0 pa-0"
    }, {
      default: withCtx(() => [
        createVNode(_component_v_col, {
          cols: "12",
          sm: "8"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_card, {
              class: "pa-0",
              style: { "background": "#181f3a", "color": "#fff", "border-radius": "8px", "border": "1px solid #2c365a" }
            }, {
              default: withCtx(() => [
                createVNode(_component_v_card_title, {
                  class: "text-h6 mb-3",
                  style: { "align-content": "center" }
                }, {
                  default: withCtx(() => _cache[6] || (_cache[6] = [
                    createTextVNode(" Strategy P&L Summary ")
                  ])),
                  _: 1
                }),
                createVNode(_component_v_row, { dense: "" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[7] || (_cache[7] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Max Loss:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_1$1, "$" + toDisplayString($data.maximumLoss.toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[8] || (_cache[8] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Max Profit Up:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_2$1, "$" + toDisplayString($options.getMaximumProfitUp().toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[9] || (_cache[9] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Max Profit Down:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_3$1, "$" + toDisplayString($options.getMaximumProfitDown().toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[10] || (_cache[10] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Break Even:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_4$1, "$" + toDisplayString($data.breakEven.toFixed(2)), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_card_text, null, {
                  default: withCtx(() => [
                    createVNode(_component_apexchart, {
                      width: "100%",
                      height: "300",
                      type: "area",
                      options: $data.chartOptions,
                      series: $data.chartSeries
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
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            $data.selectedITMCall && $data.selectedITMPut ? (openBlock(), createBlock(_component_v_card, {
              key: 0,
              class: "pa-4",
              style: { "background": "#181f3a", "color": "#fff", "border-radius": "8px", "border": "1px solid #2c365a" }
            }, {
              default: withCtx(() => [
                createVNode(_component_SelectedOptionsDetails, {
                  selectedITMOption: $data.selectedITMCall,
                  selectedOTMOption: $data.selectedITMPut
                }, null, 8, ["selectedITMOption", "selectedOTMOption"])
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ], 64);
}
const LongStraddle = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2]]);
const _sfc_main$1 = {
  name: "LongStrangle",
  props: {
    strategy: String,
    symbol: String,
    out_of_the_money_puts: Object,
    out_of_the_money_calls: Object,
    expirationDates: Array
  },
  components: {
    apexchart: m,
    LiveSingleStockComponent,
    SelectedOptionsDetails: _sfc_main$5
  },
  data() {
    return {
      drawer: false,
      selectedExpiration: null,
      selectedOTMCall: null,
      selectedOTMPut: null,
      underlying_asset_price: null,
      OTMCalls: [],
      OTMPuts: [],
      maximumLoss: 0,
      maximumProfit: 0,
      breakEvenUp: 0,
      breakEvenDown: 0,
      chartOptions: {
        chart: {
          id: "long-strangle-payoff",
          toolbar: { show: false },
          zoom: { enabled: false },
          background: "transparent"
        },
        colors: ["#00e396", "#ff4560"],
        xaxis: {
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
          enabled: true,
          theme: "dark",
          y: {
            formatter: (val) => `$${val.toFixed(2)}`,
            title: {
              formatter: () => "P/L"
            }
          },
          x: {
            show: true,
            formatter: (val) => `Price: $${val}`
          }
        },
        annotations: {},
        markers: {
          size: 0,
          strokeColors: "#fff",
          strokeWidth: 2
        },
        fill: {
          type: "solid"
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        }
      },
      chartSeries: []
    };
  },
  async mounted() {
    if (this.expirationDates.length) {
      this.selectedExpiration = this.expirationDates[0];
    }
    try {
      const latestRes = await axios.get(`/latest_price/${this.symbol}`);
      this.underlying_asset_price = parseFloat(latestRes.data["price"]);
    } catch (error) {
      console.error("Failed to load prevCloseMap:", error);
    }
    document.title = "Long Strangle Visualizer | Options Strategy Builder";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = "Explore Long Strangle options strategies with a live visualizer. Compare call and put strike prices and model profits from major price swings.";
  },
  methods: {
    handleDrawerToggle() {
      this.drawer = !this.drawer;
    },
    itemTitle(option) {
      if (!option) return "";
      return `${option.strike_price} (${option.option_symbol}) - $${option.last_price}`;
    },
    getMaximumLoss() {
      if (this.selectedOTMCall && this.selectedOTMPut) {
        return Number(this.selectedOTMCall.last_price) + Number(this.selectedOTMPut.last_price);
      }
      return 0;
    },
    getMaximumProfitUp() {
      if (this.selectedOTMCall && this.selectedOTMPut) {
        const callStrike = Number(this.selectedOTMCall.strike_price);
        const callPremium = Number(this.selectedOTMCall.last_price);
        const putPremium = Number(this.selectedOTMPut.last_price);
        const netDebit = callPremium + putPremium;
        const simulatedHigh = callStrike * 1.5;
        const callPayoff = Math.max(simulatedHigh - callStrike, 0);
        return callPayoff - netDebit;
      }
      return 0;
    },
    getMaximumProfitDown() {
      if (this.selectedOTMCall && this.selectedOTMPut) {
        const putStrike = Number(this.selectedOTMPut.strike_price);
        const callPremium = Number(this.selectedOTMCall.last_price);
        const putPremium = Number(this.selectedOTMPut.last_price);
        const netDebit = callPremium + putPremium;
        const simulatedLow = 0;
        const putPayoff = putStrike - simulatedLow;
        return putPayoff - netDebit;
      }
      return 0;
    },
    getMaximumProfit() {
      if (this.selectedOTMCall && this.selectedOTMPut) {
        return this.selectedOTMCall.strike_price - this.selectedOTMPut.strike_price - this.getMaximumLoss();
      }
      return 0;
    },
    getBreakevenPoints() {
      if (this.selectedOTMCall && this.selectedOTMPut) {
        const callStrike = Number(this.selectedOTMCall.strike_price);
        const putStrike = Number(this.selectedOTMPut.strike_price);
        const netDebit = Number(this.selectedOTMCall.last_price) + Number(this.selectedOTMPut.last_price);
        const breakEvenUp = callStrike + netDebit;
        const breakEvenDown = putStrike + netDebit;
        return [breakEvenUp, breakEvenDown];
      }
      return 0;
    },
    updateMetrics() {
      if (this.selectedOTMCall && this.selectedOTMPut) {
        this.maximumLoss = this.getMaximumLoss();
        this.maximumProfit = this.getMaximumProfit();
        const breakEvenPoints = this.getBreakevenPoints();
        this.breakEvenUp = breakEvenPoints[0];
        this.breakEvenDown = breakEvenPoints[1];
      } else {
        this.maximumLoss = 0;
        this.maximumProfit = 0;
        this.breakEvenUp = 0;
        this.breakEvenDown = 0;
      }
    },
    generateChartData() {
      if (!this.selectedOTMCall || !this.selectedOTMPut) return;
      const callStrike = Number(this.selectedOTMCall.strike_price);
      const putStrike = Number(this.selectedOTMPut.strike_price);
      const callPremium = Number(this.selectedOTMCall.last_price);
      const putPremium = Number(this.selectedOTMPut.last_price);
      const netDebit = callPremium + putPremium;
      const minPrice = Math.max(1, Math.floor(putStrike * 0.5));
      const maxPrice = Math.ceil(callStrike * 1.5);
      const profitSeries = [];
      const lossSeries = [];
      for (let price = minPrice; price <= maxPrice; price++) {
        const callPayoff = Math.max(price - callStrike, 0);
        const putPayoff = Math.max(putStrike - price, 0);
        const pnl = callPayoff + putPayoff - netDebit;
        profitSeries.push({ x: price, y: pnl > 0 ? pnl : 0 });
        lossSeries.push({ x: price, y: pnl < 0 ? pnl : 0 });
      }
      this.chartSeries = [
        { name: "Profit", data: profitSeries },
        { name: "Loss", data: lossSeries }
      ];
      this.chartOptions = {
        ...this.chartOptions,
        stroke: {
          curve: "straight",
          width: 2
        },
        fill: {
          type: "solid",
          opacity: 0.4
        }
      };
    }
  },
  watch: {
    selectedExpiration(newVal) {
      this.OTMCalls = this.out_of_the_money_calls[newVal];
      this.OTMPuts = this.out_of_the_money_puts[newVal];
      this.selectedOTMCall = null;
      this.selectedOTMPut = null;
    },
    selectedOTMCall() {
      this.updateMetrics();
      this.generateChartData();
    },
    selectedOTMPut() {
      this.updateMetrics();
      this.generateChartData();
    }
  }
};
const _hoisted_1 = { style: { "color": "#ff4560" } };
const _hoisted_2 = { style: { "color": "#00e396" } };
const _hoisted_3 = { style: { "color": "#00e396" } };
const _hoisted_4 = { style: { "color": "#facc15" } };
const _hoisted_5 = { style: { "color": "#facc15" } };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_select = resolveComponent("v-select");
  const _component_v_col = resolveComponent("v-col");
  const _component_v_alert = resolveComponent("v-alert");
  const _component_v_row = resolveComponent("v-row");
  const _component_v_card_title = resolveComponent("v-card-title");
  const _component_apexchart = resolveComponent("apexchart");
  const _component_v_card_text = resolveComponent("v-card-text");
  const _component_v_card = resolveComponent("v-card");
  const _component_SelectedOptionsDetails = resolveComponent("SelectedOptionsDetails");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_v_row, {
      dense: "",
      class: "ma-0 pa-1"
    }, {
      default: withCtx(() => [
        createVNode(_component_v_col, {
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_select, {
              modelValue: $data.selectedExpiration,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.selectedExpiration = $event),
              items: $props.expirationDates,
              label: "Select Expiration",
              variant: "underlined",
              dense: ""
            }, null, 8, ["modelValue", "items"])
          ]),
          _: 1
        }),
        createVNode(_component_v_col, {
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_select, {
              modelValue: $data.selectedOTMCall,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.selectedOTMCall = $event),
              items: $data.OTMCalls,
              "item-title": $options.itemTitle,
              "item-value": "option_symbol",
              "return-object": "",
              label: "Select Out-Of-The-Money Call",
              variant: "underlined",
              dense: ""
            }, null, 8, ["modelValue", "items", "item-title"])
          ]),
          _: 1
        }),
        createVNode(_component_v_col, {
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_select, {
              modelValue: $data.selectedOTMPut,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.selectedOTMPut = $event),
              items: $data.OTMPuts,
              "item-title": $options.itemTitle,
              "item-value": "option_symbol",
              "return-object": "",
              label: "Select Out-Of-The-Money Put",
              variant: "underlined",
              dense: ""
            }, null, 8, ["modelValue", "items", "item-title"])
          ]),
          _: 1
        }),
        createVNode(_component_v_col, { cols: "12" }, {
          default: withCtx(() => [
            $options.getMaximumProfitUp() < 0 ? (openBlock(), createBlock(_component_v_alert, {
              key: 0,
              color: "#C51162",
              icon: "mdi-cancel",
              theme: "dark",
              density: "compact",
              border: ""
            }, {
              default: withCtx(() => _cache[3] || (_cache[3] = [
                createTextVNode(" Your selected options would result in a negative maximum profit ")
              ])),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(_component_v_col, { cols: "12" }, {
          default: withCtx(() => {
            var _a, _b;
            return [
              ((_a = $data.selectedOTMCall) == null ? void 0 : _a.strike_price) < ((_b = $data.selectedOTMPut) == null ? void 0 : _b.strike_price) ? (openBlock(), createBlock(_component_v_alert, {
                key: 0,
                color: "#C51162",
                icon: "mdi-cancel",
                theme: "dark",
                density: "compact",
                border: ""
              }, {
                default: withCtx(() => _cache[4] || (_cache[4] = [
                  createTextVNode(" The Call should have a higher strike price for it to be a valid Long Strangle ")
                ])),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }),
          _: 1
        })
      ]),
      _: 1
    }),
    createVNode(_component_v_row, {
      dense: "",
      class: "ma-0 pa-0"
    }, {
      default: withCtx(() => [
        createVNode(_component_v_col, {
          cols: "12",
          sm: "8"
        }, {
          default: withCtx(() => [
            createVNode(_component_v_card, {
              class: "pa-0",
              style: { "background": "#181f3a", "color": "#fff", "border-radius": "8px", "border": "1px solid #2c365a" }
            }, {
              default: withCtx(() => [
                createVNode(_component_v_card_title, {
                  class: "text-h6 mb-3",
                  style: { "align-content": "center" }
                }, {
                  default: withCtx(() => _cache[5] || (_cache[5] = [
                    createTextVNode(" Strategy P&L Summary ")
                  ])),
                  _: 1
                }),
                createVNode(_component_v_row, { dense: "" }, {
                  default: withCtx(() => [
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[6] || (_cache[6] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Max Loss:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_1, "$" + toDisplayString($data.maximumLoss.toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[7] || (_cache[7] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Max Profit Up:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_2, "$" + toDisplayString($options.getMaximumProfitUp().toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[8] || (_cache[8] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Max Profit Down:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_3, "$" + toDisplayString($options.getMaximumProfitDown().toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[9] || (_cache[9] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Break Even Up:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_4, "$" + toDisplayString($data.breakEvenUp.toFixed(2)), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_col, {
                      cols: "4",
                      sm: "4",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        _cache[10] || (_cache[10] = createBaseVNode("div", null, [
                          createBaseVNode("strong", null, "Break Even Down:")
                        ], -1)),
                        createBaseVNode("div", _hoisted_5, "$" + toDisplayString($data.breakEvenDown.toFixed(2)), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_card_text, null, {
                  default: withCtx(() => [
                    createVNode(_component_apexchart, {
                      width: "100%",
                      height: "300",
                      type: "area",
                      options: $data.chartOptions,
                      series: $data.chartSeries
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
          cols: "12",
          sm: "4"
        }, {
          default: withCtx(() => [
            $data.selectedOTMCall && $data.selectedOTMPut ? (openBlock(), createBlock(_component_v_card, {
              key: 0,
              class: "pa-4",
              style: { "background": "#181f3a", "color": "#fff", "border-radius": "8px", "border": "1px solid #2c365a" }
            }, {
              default: withCtx(() => [
                createVNode(_component_SelectedOptionsDetails, {
                  selectedITMOption: $data.selectedOTMCall,
                  selectedOTMOption: $data.selectedOTMPut
                }, null, 8, ["selectedITMOption", "selectedOTMOption"])
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ], 64);
}
const LongStrangle = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const _sfc_main = {
  name: "OptionsStrategyBuilder",
  props: {
    strategy: String,
    symbol: String,
    in_the_money_calls: Object,
    out_of_the_money_calls: Object,
    in_the_money_puts: Object,
    out_of_the_money_puts: Object,
    callsByExpiration: Object,
    putsByExpiration: Object,
    expirationDates: Object
  },
  components: {
    Navbar: _sfc_main$7,
    Sidebar: _sfc_main$6,
    MarketStatus,
    FooterComponent,
    LiveSingleStockComponent,
    BullCallSpread,
    BearPutSpread,
    LongStraddle,
    LongStrangle
  },
  data() {
    return {
      drawer: false
    };
  },
  mounted() {
  },
  methods: {
    handleDrawerToggle() {
      this.drawer = !this.drawer;
    }
  },
  watch: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Navbar = resolveComponent("Navbar");
  const _component_Sidebar = resolveComponent("Sidebar");
  const _component_MarketStatus = resolveComponent("MarketStatus");
  const _component_v_col = resolveComponent("v-col");
  const _component_v_row = resolveComponent("v-row");
  const _component_LiveSingleStockComponent = resolveComponent("LiveSingleStockComponent");
  const _component_v_card = resolveComponent("v-card");
  const _component_BullCallSpread = resolveComponent("BullCallSpread");
  const _component_BearPutSpread = resolveComponent("BearPutSpread");
  const _component_LongStraddle = resolveComponent("LongStraddle");
  const _component_LongStrangle = resolveComponent("LongStrangle");
  const _component_v_container = resolveComponent("v-container");
  const _component_FooterComponent = resolveComponent("FooterComponent");
  const _component_v_main = resolveComponent("v-main");
  const _component_v_layout = resolveComponent("v-layout");
  const _component_v_sheet = resolveComponent("v-sheet");
  return openBlock(), createElementBlock(Fragment, null, [
    _cache[2] || (_cache[2] = createBaseVNode("link", {
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
                    createVNode(_component_v_row, {
                      dense: "",
                      class: "ma-0 pa-1"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_col, null, {
                          default: withCtx(() => [
                            _cache[0] || (_cache[0] = createBaseVNode("h3", null, "Options Strategy Builder", -1)),
                            createBaseVNode("h4", null, "Strategy: " + toDisplayString($props.strategy), 1),
                            createBaseVNode("h4", null, "Symbol: " + toDisplayString($props.symbol), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_col, {
                      cols: "12",
                      sm: "4",
                      class: "ma-1 pa-1"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_card, {
                          class: "pa-0",
                          color: "primary"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_LiveSingleStockComponent, {
                              symbols: [$props.symbol]
                            }, null, 8, ["symbols"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    _cache[1] || (_cache[1] = createBaseVNode("br", null, null, -1)),
                    createVNode(_component_v_row, {
                      dense: "",
                      class: "ma-0 pa-1"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_col, {
                          cols: "12",
                          sm: "12"
                        }, {
                          default: withCtx(() => [
                            $props.strategy == "bullSpread" ? (openBlock(), createBlock(_component_BullCallSpread, {
                              key: 0,
                              strategy: $props.strategy,
                              symbol: $props.symbol,
                              callsByExpiration: $props.callsByExpiration,
                              out_of_the_money_calls: $props.out_of_the_money_calls,
                              in_the_money_calls: $props.in_the_money_calls
                            }, null, 8, ["strategy", "symbol", "callsByExpiration", "out_of_the_money_calls", "in_the_money_calls"])) : createCommentVNode("", true),
                            $props.strategy == "bearSpread" ? (openBlock(), createBlock(_component_BearPutSpread, {
                              key: 1,
                              strategy: $props.strategy,
                              symbol: $props.symbol,
                              putsByExpiration: $props.putsByExpiration,
                              out_of_the_money_puts: $props.out_of_the_money_puts,
                              in_the_money_puts: $props.in_the_money_puts
                            }, null, 8, ["strategy", "symbol", "putsByExpiration", "out_of_the_money_puts", "in_the_money_puts"])) : createCommentVNode("", true),
                            $props.strategy == "longStraddle" ? (openBlock(), createBlock(_component_LongStraddle, {
                              key: 2,
                              strategy: $props.strategy,
                              symbol: $props.symbol,
                              expirationDates: $props.expirationDates,
                              in_the_money_calls: $props.in_the_money_calls,
                              in_the_money_puts: $props.in_the_money_puts
                            }, null, 8, ["strategy", "symbol", "expirationDates", "in_the_money_calls", "in_the_money_puts"])) : createCommentVNode("", true),
                            $props.strategy == "longStrangle" ? (openBlock(), createBlock(_component_LongStrangle, {
                              key: 3,
                              strategy: $props.strategy,
                              symbol: $props.symbol,
                              expirationDates: $props.expirationDates,
                              out_of_the_money_calls: $props.out_of_the_money_calls,
                              out_of_the_money_puts: $props.out_of_the_money_puts
                            }, null, 8, ["strategy", "symbol", "expirationDates", "out_of_the_money_calls", "out_of_the_money_puts"])) : createCommentVNode("", true)
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
const OptionsStrategyBuilder = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-074f10e6"]]);
export {
  OptionsStrategyBuilder as default
};
