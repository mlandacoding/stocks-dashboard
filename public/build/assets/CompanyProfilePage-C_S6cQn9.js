import { d as defineComponent, r as resolveComponent, c as createBlock, o as openBlock, w as withCtx, a as createVNode, b as createCommentVNode, e as createElementBlock, t as toDisplayString, f as ref, g as onMounted, h as axios, u as useDisplay, i as createStaticVNode, n as normalizeClass, j as unref, k as createBaseVNode, l as createTextVNode, F as Fragment } from "./app-Sgxi9sYG.js";
import { _ as _export_sfc, m, a as _sfc_main$3, b as _sfc_main$4, M as MarketStatus, L as LiveStocksTable, I as IntradayGraph, F as FooterComponent } from "./FooterComponent-Bx4Yjtbl.js";
const _sfc_main$2 = defineComponent({
  name: "FinancialChart",
  components: {
    apexchart: m
  },
  props: {
    symbol: {
      type: String,
      required: true
    },
    first_metric: {
      type: String,
      required: true
    },
    second_metric: {
      type: String,
      required: true
    },
    title: {
      type: String
    }
  },
  setup(props) {
    const series = ref([]);
    const chartOptions = ref({});
    const timeframe = ref();
    const barLabel = ref();
    const lineLabel = ref();
    onMounted(async () => {
      try {
        const response = await axios.get(
          `/getMetricsForLastFive/${props.symbol}?metrics=${props.first_metric},${props.second_metric}`
        );
        const data = response.data["metrics"];
        timeframe.value = response.data["timeframe"];
        const keys = Object.keys(data);
        barLabel.value = data[keys[1]][0]["label"];
        lineLabel.value = data[keys[0]][1]["label"];
        const categories = data[keys[1]].map(
          (entry) => new Date(entry.filing_date).toLocaleDateString()
        );
        const firstMetricData = data[keys[1]].map(
          (entry) => parseFloat(entry.value)
        );
        const secondMetricData = data[keys[0]].map(
          (entry) => parseFloat(entry.value)
        );
        series.value = [
          {
            name: data[keys[1]][0]["label"],
            type: "column",
            data: firstMetricData
          },
          {
            name: data[keys[0]][1]["label"],
            type: "line",
            data: secondMetricData
          }
        ];
        chartOptions.value = {
          chart: {
            height: 400,
            type: "line",
            toolbar: { show: false },
            zoom: { enabled: false }
          },
          stroke: {
            width: [0, 3]
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
          },
          labels: categories,
          grid: {
            yaxis: {
              lines: {
                show: false
              }
            }
          },
          xaxis: {
            type: "category"
          },
          yaxis: [
            {
              labels: {
                show: false
              },
              axisTicks: {
                show: false
              }
            },
            {
              opposite: true,
              labels: {
                show: true
              },
              axisTicks: {
                show: false
              }
            }
          ],
          tooltip: {
            x: {
              format: "HH:mm"
            },
            theme: "dark"
          }
        };
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      }
    });
    return {
      series,
      chartOptions,
      timeframe,
      barLabel,
      lineLabel
    };
  }
});
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_card_title = resolveComponent("v-card-title");
  const _component_apexchart = resolveComponent("apexchart");
  const _component_v_card = resolveComponent("v-card");
  return openBlock(), createBlock(_component_v_card, {
    color: "primary",
    style: { "border": "1px solid rgba(255, 255, 255, 0.5)" }
  }, {
    default: withCtx(() => [
      createVNode(_component_v_card_title, {
        class: "d-flex",
        style: { "text-align": "center" }
      }, {
        default: withCtx(() => [
          !_ctx.title ? (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString(this.barLabel) + " vs " + toDisplayString(this.lineLabel), 1)) : (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(_ctx.title), 1))
        ]),
        _: 1
      }),
      _ctx.series.length ? (openBlock(), createBlock(_component_apexchart, {
        key: 0,
        type: "line",
        height: "400",
        options: _ctx.chartOptions,
        series: _ctx.series
      }, null, 8, ["options", "series"])) : createCommentVNode("", true)
    ]),
    _: 1
  });
}
const TwoFinancialMetricsGraph = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);
const _sfc_main$1 = defineComponent({
  name: "FinancialChart",
  components: {
    apexchart: m
  },
  props: {
    symbol: {
      type: String,
      required: true
    },
    metric: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    chartType: {
      type: String,
      default: "line"
    }
  },
  setup(props) {
    const series = ref([]);
    const chartOptions = ref({});
    const timeframe = ref();
    const label = ref();
    onMounted(async () => {
      try {
        let response = await axios.get(`/getMetricsForLastFive/${props.symbol}?metrics=${props.metric}`);
        let data = response.data["metrics"];
        if (data.length === 0) {
          const other_metrics = ["gross_profit", "liabilities_and_equity"];
          for (const other_metric of other_metrics) {
            response = await axios.get(`/getMetricsForLastFive/${props.symbol}?metrics=${other_metric}`);
            data = response.data["metrics"];
            if (data.length !== 0) {
              break;
            }
          }
        }
        timeframe.value = response.data["timeframe"];
        const keys = Object.keys(data);
        label.value = data[keys[0]][0]["label"];
        const categories = data[keys[0]].map(
          (entry) => new Date(entry.filing_date).toLocaleDateString()
        );
        const MetricData = data[keys[0]].map(
          (entry) => parseFloat(entry.value)
        );
        series.value = [
          {
            name: label.value,
            data: MetricData
          }
        ];
        chartOptions.value = {
          chart: {
            height: 400,
            type: props.chartType,
            toolbar: { show: false },
            zoom: { enabled: false }
          },
          title: {
            text: label.value,
            align: "left",
            margin: 10,
            offsetX: 10,
            offsetY: 10,
            floating: false,
            style: {
              fontSize: "16px",
              fontWeight: "bold",
              color: "white"
            }
          },
          fill: {
            colors: ["#5E75E8"]
          },
          stroke: {
            width: 3
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: "top"
              }
            }
          },
          dataLabels: {
            enabled: true,
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["white"]
            }
          },
          labels: categories,
          grid: {
            yaxis: {
              lines: {
                show: false
              }
            }
          },
          xaxis: {
            type: "category"
          },
          yaxis: [
            {
              labels: {
                show: false
              },
              axisTicks: {
                show: false
              }
            }
          ],
          tooltip: {
            x: {
              format: "HH:mm"
            },
            theme: "dark"
          }
        };
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
      }
    });
    return {
      series,
      chartOptions,
      timeframe,
      label
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_apexchart = resolveComponent("apexchart");
  const _component_v_card = resolveComponent("v-card");
  return openBlock(), createBlock(_component_v_card, {
    color: "primary",
    style: { "border": "1px solid rgba(255, 255, 255, 0.5)" }
  }, {
    default: withCtx(() => [
      _ctx.series.length ? (openBlock(), createBlock(_component_apexchart, {
        key: 0,
        type: _ctx.chartType,
        height: "448",
        options: _ctx.chartOptions,
        series: _ctx.series
      }, null, 8, ["type", "options", "series"])) : createCommentVNode("", true)
    ]),
    _: 1
  });
}
const FinancialMetricGraph = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const _sfc_main = {
  __name: "CompanyProfilePage",
  props: {
    symbol: String,
    asset_details: Object
  },
  setup(__props) {
    var _a;
    const { smAndDown } = useDisplay();
    const props = __props;
    const symbol = ref(props.symbol);
    const normalizedSymbol = ((_a = props.symbol) == null ? void 0 : _a.toUpperCase()) ?? "";
    const symbol_array = ref([normalizedSymbol]);
    const previousClose = ref("");
    const drawer = ref(false);
    const handleDrawerToggle = (value) => {
      drawer.value = value;
    };
    function updateSymbol({ sym, previous_close }) {
      symbol.value = sym;
      symbol_array.value = [sym];
      previousClose.value = previous_close;
    }
    return (_ctx, _cache) => {
      const _component_v_col = resolveComponent("v-col");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_divider = resolveComponent("v-divider");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_main = resolveComponent("v-main");
      const _component_v_layout = resolveComponent("v-layout");
      const _component_v_sheet = resolveComponent("v-sheet");
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[7] || (_cache[7] = createStaticVNode('<head data-v-ae827f45><meta charset="UTF-8" data-v-ae827f45><meta name="viewport" content="width=device-width, initial-scale=1.0" data-v-ae827f45><meta http-equiv="X-UA-Compatible" content="ie=edge" data-v-ae827f45><title data-v-ae827f45>All Global Data</title><meta name="description" content="We are a Financial Data repository with a focus on Public Companies and their Fundamental data." data-v-ae827f45></head><link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet" data-v-ae827f45>', 2)),
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
                      class: "pa-0 pa-sm-5 ma-0",
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
                        createVNode(_component_v_row, {
                          justify: "center",
                          class: "pa-0 pa-sm-5 ma-0",
                          "no-gutters": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_col, {
                              cols: "12",
                              sm: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode(LiveStocksTable, {
                                  title: __props.asset_details.name,
                                  symbols: symbol_array.value,
                                  onShowGraph: updateSymbol,
                                  chartButton: false
                                }, null, 8, ["title", "symbols"]),
                                unref(smAndDown) ? (openBlock(), createBlock(IntradayGraph, {
                                  symbol: symbol.value,
                                  previous_close: previousClose.value,
                                  key: symbol.value
                                }, null, 8, ["symbol", "previous_close"])) : createCommentVNode("", true),
                                createVNode(FinancialMetricGraph, {
                                  symbol: symbol.value,
                                  metric: "basic_earnings_per_share",
                                  title: "Earnings Per Share",
                                  "chart-type": "bar"
                                }, null, 8, ["symbol"])
                              ]),
                              _: 1
                            }),
                            !unref(smAndDown) ? (openBlock(), createBlock(_component_v_col, {
                              key: 0,
                              cols: "12",
                              sm: "9"
                            }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(IntradayGraph, {
                                  symbol: symbol.value,
                                  previous_close: previousClose.value,
                                  key: symbol.value,
                                  height: "486"
                                }, null, 8, ["symbol", "previous_close"]))
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_row, {
                          justify: "center",
                          class: "pa-0 pa-sm-5 ma-0",
                          "no-gutters": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_col, {
                              cols: "12",
                              sm: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_card, {
                                  color: "primary",
                                  style: { "border": "1px solid rgba(255, 255, 255, 0.5)" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_col, { cols: "3" }, {
                                      default: withCtx(() => _cache[0] || (_cache[0] = [
                                        createBaseVNode("strong", null, "Company Description:", -1)
                                      ])),
                                      _: 1
                                    }),
                                    createVNode(_component_v_col, {
                                      cols: "12",
                                      style: { "font-size": ".85rem" }
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(__props.asset_details.description), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_v_divider, { class: "my-1" }),
                                    createVNode(_component_v_row, { class: "pa-2" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_col, { cols: "4" }, {
                                          default: withCtx(() => [
                                            _cache[1] || (_cache[1] = createBaseVNode("strong", null, "Total Employees:", -1)),
                                            _cache[2] || (_cache[2] = createBaseVNode("br", null, null, -1)),
                                            createTextVNode(" " + toDisplayString(__props.asset_details.total_employees), 1)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_col, { cols: "4" }, {
                                          default: withCtx(() => [
                                            _cache[3] || (_cache[3] = createBaseVNode("strong", null, "Industry:", -1)),
                                            _cache[4] || (_cache[4] = createBaseVNode("br", null, null, -1)),
                                            createTextVNode(" " + toDisplayString(__props.asset_details.sic_description), 1)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_col, { cols: "4" }, {
                                          default: withCtx(() => [
                                            _cache[5] || (_cache[5] = createBaseVNode("strong", null, "Shares Outstanding:", -1)),
                                            _cache[6] || (_cache[6] = createBaseVNode("br", null, null, -1)),
                                            createTextVNode(" " + toDisplayString(__props.asset_details.share_class_shares_outstanding), 1)
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
                            createVNode(_component_v_col, {
                              cols: "12",
                              sm: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(TwoFinancialMetricsGraph, {
                                  symbol: symbol.value,
                                  first_metric: "net_income_loss",
                                  second_metric: "net_cash_flow_from_operating_activities"
                                }, null, 8, ["symbol"])
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
const CompanyProfilePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ae827f45"]]);
export {
  CompanyProfilePage as default
};
