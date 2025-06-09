import { d as defineComponent, r as resolveComponent, c as createBlock, o as openBlock, w as withCtx, a as createVNode, b as createCommentVNode, e as createBaseVNode, f as createElementBlock, t as toDisplayString, g as ref, h as onMounted, i as axios, j as createTextVNode, F as Fragment, k as renderList, u as useDisplay, l as createStaticVNode, n as normalizeClass, m as unref } from "./app-CARG_xon.js";
import { _ as _export_sfc, a as _sfc_main$4, b as _sfc_main$5, M as MarketStatus, F as FooterComponent } from "./FooterComponent-CkzMO7WZ.js";
import { L as LiveStocksTable, I as IntradayGraph } from "./IntradayGraph-ClCzai_A.js";
import { m } from "./vue3-apexcharts-9fWjqkCD.js";
import "./useStockStream-BA8lq4eq.js";
const _sfc_main$3 = defineComponent({
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
    const barLabel = ref();
    const lineLabel = ref();
    onMounted(async () => {
      try {
        const response = await axios.get(
          `/getMetricsForLastFive/${props.symbol}?metrics=${props.first_metric},${props.second_metric}`
        );
        const data = response.data["metrics"];
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
          legend: {
            labels: {
              colors: "#FFFFFF"
            }
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
            type: "category",
            labels: {
              style: {
                colors: "#FFFFFF"
              }
            }
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
                show: true,
                style: {
                  colors: "#FFFFFF"
                }
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
      barLabel,
      lineLabel
    };
  }
});
const _hoisted_1$2 = { key: 0 };
const _hoisted_2$1 = { key: 1 };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
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
        style: { "text-align": "center", "color": "white" }
      }, {
        default: withCtx(() => [
          !_ctx.title ? (openBlock(), createElementBlock("span", _hoisted_1$2, toDisplayString(this.barLabel) + " vs " + toDisplayString(this.lineLabel), 1)) : (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString(_ctx.title), 1))
        ]),
        _: 1
      }),
      _ctx.series.length ? (openBlock(), createBlock(_component_apexchart, {
        key: 0,
        type: "line",
        height: "400",
        options: _ctx.chartOptions,
        series: _ctx.series
      }, null, 8, ["options", "series"])) : createCommentVNode("", true),
      _cache[0] || (_cache[0] = createBaseVNode("div", { class: "text-right pr-4 pb-2" }, [
        createBaseVNode("small", null, [
          createBaseVNode("h2", null, "* In Millions")
        ])
      ], -1))
    ]),
    _: 1
  });
}
const TwoFinancialMetricsGraph = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2]]);
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
            enabledOnSeries: [1],
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
            type: "category",
            labels: {
              style: {
                colors: "#FFFFFF",
                fontSize: "12px"
              }
            }
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
      label
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
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
        height: "405",
        options: _ctx.chartOptions,
        series: _ctx.series
      }, null, 8, ["type", "options", "series"])) : createCommentVNode("", true)
    ]),
    _: 1
  });
}
const FinancialMetricGraph = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);
const _sfc_main$1 = {
  props: {
    symbol: {
      type: String,
      default: "SPY"
    }
  },
  data() {
    return {
      news: [],
      loading: false,
      headers: [
        { text: "Publisher", value: "Publisher_name" },
        { text: "Article Title", value: "Title" },
        { text: "Description", value: "Description" },
        { text: "Article Date", value: "published_utc" }
      ]
    };
  },
  async mounted() {
    this.loadNews();
  },
  methods: {
    async loadNews() {
      try {
        const newsRes = await fetch(`/getNewsPerSymbol/${this.symbol}`);
        this.news = await newsRes.json();
        this.loading = false;
      } catch (error) {
        console.error("Error loading news:", error);
        this.loading = false;
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(void 0, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
  }
};
const _hoisted_1$1 = {
  class: "pa-4",
  style: { "border": "1px solid rgba(255, 255, 255, 0.5)" }
};
const _hoisted_2 = {
  class: "news-item d-flex flex-column",
  style: { "border-bottom": "1px solid #ccc", "padding-bottom": "16px" }
};
const _hoisted_3 = { class: "d-flex justify-space-between align-start" };
const _hoisted_4 = { class: "pe-2" };
const _hoisted_5 = ["href"];
const _hoisted_6 = { class: "text-caption mt-1" };
const _hoisted_7 = { class: "text-body-2 mt-2" };
const _hoisted_8 = {
  key: 0,
  class: "mt-2 d-flex align-start sentiment-box"
};
const _hoisted_9 = { class: "text-caption sentiment-text" };
const _hoisted_10 = ["src", "alt"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_card_title = resolveComponent("v-card-title");
  const _component_v_divider = resolveComponent("v-divider");
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_avatar = resolveComponent("v-avatar");
  const _component_v_col = resolveComponent("v-col");
  const _component_v_row = resolveComponent("v-row");
  const _component_v_card = resolveComponent("v-card");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createVNode(_component_v_card, {
      flat: "",
      color: "primary"
    }, {
      default: withCtx(() => [
        createVNode(_component_v_card_title, { class: "text-h6 font-weight-bold pb-2" }, {
          default: withCtx(() => [
            createTextVNode(" Recent News: " + toDisplayString($props.symbol), 1)
          ]),
          _: 1
        }),
        createVNode(_component_v_row, { dense: "" }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.news, (item, index) => {
              return openBlock(), createBlock(_component_v_col, {
                key: index,
                cols: "12",
                sm: "6",
                class: "pb-4"
              }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createBaseVNode("div", _hoisted_2, [
                      createBaseVNode("div", _hoisted_3, [
                        createBaseVNode("div", _hoisted_4, [
                          createBaseVNode("a", {
                            href: item.Article_url,
                            target: "_blank",
                            class: "font-weight-medium text-body-1",
                            style: { "text-decoration": "none" }
                          }, toDisplayString(item.Title), 9, _hoisted_5),
                          createBaseVNode("div", _hoisted_6, toDisplayString(item.Publisher_name) + " • " + toDisplayString($options.formatDate(item.published_utc)), 1),
                          createBaseVNode("div", _hoisted_7, toDisplayString(item.Description), 1),
                          createVNode(_component_v_divider, { class: "my-1" }),
                          ((_a = item.Insights) == null ? void 0 : _a.length) ? (openBlock(), createElementBlock("div", _hoisted_8, [
                            item.Insights[0].sentiment === "positive" ? (openBlock(), createBlock(_component_v_icon, {
                              key: 0,
                              color: "green",
                              size: "18",
                              class: "mt-1 me-1"
                            }, {
                              default: withCtx(() => _cache[0] || (_cache[0] = [
                                createTextVNode("mdi-arrow-up-bold")
                              ])),
                              _: 1
                            })) : item.Insights[0].sentiment === "negative" ? (openBlock(), createBlock(_component_v_icon, {
                              key: 1,
                              color: "red",
                              size: "18",
                              class: "mt-1 me-1"
                            }, {
                              default: withCtx(() => _cache[1] || (_cache[1] = [
                                createTextVNode("mdi-arrow-down-bold")
                              ])),
                              _: 1
                            })) : (openBlock(), createBlock(_component_v_icon, {
                              key: 2,
                              color: "grey",
                              size: "18",
                              class: "mt-1 me-1"
                            }, {
                              default: withCtx(() => _cache[2] || (_cache[2] = [
                                createTextVNode("mdi-minus")
                              ])),
                              _: 1
                            })),
                            createBaseVNode("div", _hoisted_9, toDisplayString(item.Insights[0].sentiment_reasoning), 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        item.Publisher_logo_url ? (openBlock(), createBlock(_component_v_avatar, {
                          key: 0,
                          size: "80",
                          class: "publisher-avatar",
                          rounded: "0"
                        }, {
                          default: withCtx(() => [
                            createBaseVNode("img", {
                              src: item.Publisher_logo_url,
                              alt: item.Publisher_name,
                              class: "svg-logo"
                            }, null, 8, _hoisted_10)
                          ]),
                          _: 2
                        }, 1024)) : createCommentVNode("", true)
                      ])
                    ])
                  ];
                }),
                _: 2
              }, 1024);
            }), 128))
          ]),
          _: 1
        })
      ]),
      _: 1
    })
  ]);
}
const LatestNewsPerSymbol = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-de58ba35"]]);
const _hoisted_1 = { style: { "font-size": "13px" } };
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
    function goToOptionsChain() {
      console.log("testing");
      window.location.href = `/optionsChain/${props.symbol}`;
    }
    return (_ctx, _cache) => {
      const _component_v_col = resolveComponent("v-col");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_divider = resolveComponent("v-divider");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_main = resolveComponent("v-main");
      const _component_v_layout = resolveComponent("v-layout");
      const _component_v_sheet = resolveComponent("v-sheet");
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[8] || (_cache[8] = createStaticVNode('<head data-v-b300cb49><meta charset="UTF-8" data-v-b300cb49><meta name="viewport" content="width=device-width, initial-scale=1.0" data-v-b300cb49><meta http-equiv="X-UA-Compatible" content="ie=edge" data-v-b300cb49><title data-v-b300cb49>All Global Data</title><meta name="description" content="We are a Financial Data repository with a focus on Public Companies and their Fundamental data." data-v-b300cb49></head><link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet" data-v-b300cb49>', 2)),
        createVNode(_component_v_sheet, { class: "custom-width-wrapper" }, {
          default: withCtx(() => [
            createVNode(_component_v_layout, { style: { "background": "#0c1427" } }, {
              default: withCtx(() => [
                createVNode(_sfc_main$4, { onToggleDrawer: handleDrawerToggle }),
                createVNode(_sfc_main$5, {
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
                                createVNode(_component_v_row, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_col, { cols: "12" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_btn, {
                                          onClick: goToOptionsChain,
                                          color: "primary",
                                          block: "",
                                          size: "large",
                                          tag: "a",
                                          style: { "border": "1px solid rgba(255, 255, 255, 0.5)" }
                                        }, {
                                          default: withCtx(() => [
                                            _cache[0] || (_cache[0] = createTextVNode(" View Options Chain ")),
                                            createVNode(_component_v_icon, {
                                              icon: "mdi-link-variant",
                                              class: "ms-2"
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
                            createVNode(_component_v_col, null, {
                              default: withCtx(() => [
                                createVNode(LatestNewsPerSymbol, { symbol: symbol.value }, null, 8, ["symbol"])
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
                              sm: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_card, {
                                  color: "primary",
                                  style: { "border": "1px solid rgba(255, 255, 255, 0.5)" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_col, { cols: "12" }, {
                                      default: withCtx(() => _cache[1] || (_cache[1] = [
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
                                            _cache[2] || (_cache[2] = createBaseVNode("strong", null, "Total Employees:", -1)),
                                            _cache[3] || (_cache[3] = createBaseVNode("br", null, null, -1)),
                                            createTextVNode(" " + toDisplayString(__props.asset_details.total_employees), 1)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_col, { cols: "4" }, {
                                          default: withCtx(() => [
                                            _cache[4] || (_cache[4] = createBaseVNode("strong", null, "Industry:", -1)),
                                            _cache[5] || (_cache[5] = createBaseVNode("br", null, null, -1)),
                                            createBaseVNode("span", _hoisted_1, toDisplayString(__props.asset_details.sic_description), 1)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_v_col, { cols: "4" }, {
                                          default: withCtx(() => [
                                            _cache[6] || (_cache[6] = createBaseVNode("strong", null, "Shares Outstanding:", -1)),
                                            _cache[7] || (_cache[7] = createBaseVNode("br", null, null, -1)),
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
const CompanyProfilePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b300cb49"]]);
export {
  CompanyProfilePage as default
};
