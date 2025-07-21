import { g as ref, u as useDisplay, G as ne, h as onMounted, i as axios, s as computed, r as resolveComponent, f as createElementBlock, o as openBlock, a as createVNode, w as withCtx, e as createBaseVNode, c as createBlock, b as createCommentVNode, m as unref, F as Fragment, P as Pe, j as createTextVNode, H as mergeProps, p as normalizeStyle, k as renderList, t as toDisplayString } from "./app-B8Z1Fyv-.js";
const _sfc_main$3 = {
  __name: "GoogleAnalytics",
  setup(__props) {
    if (!window.gtagInitialized) {
      const id = "G-02W67MHHME";
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      const script2 = document.createElement("script");
      script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${id}');
  `;
      document.head.appendChild(script1);
      document.head.appendChild(script2);
      window.gtagInitialized = true;
    }
    return () => {
    };
  }
};
const _hoisted_1$1 = { class: "d-flex align-center ml-auto gap-2 flex-wrap" };
const _hoisted_2$1 = { class: "d-flex align-center justify-space-between" };
const _hoisted_3$1 = { style: { "color": "#5E75E8" } };
const _sfc_main$2 = {
  __name: "Navbar",
  emits: ["toggle-drawer"],
  setup(__props, { emit: __emit }) {
    const showSearchDialog = ref(false);
    const searchTerm = ref("");
    const symbols = ref([]);
    const { mdAndUp } = useDisplay();
    const drawer = ref(false);
    const emit = __emit;
    const updateDrawer = () => {
      drawer.value = !drawer.value;
      emit("toggle-drawer", drawer.value);
    };
    const page = ne();
    onMounted(async () => {
      try {
        const response = await axios.get("/active-assets-with_companyname");
        const data = response.data.symbols;
        symbols.value = Object.entries(data).map(([symbol, name]) => ({
          symbol,
          name
        }));
      } catch (err) {
        console.error("Failed to load symbols", err);
      }
    });
    const filteredSymbols = computed(() => {
      if (!searchTerm.value) return symbols.value;
      return symbols.value.filter(
        (item) => `${item.symbol} ${item.name}`.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    });
    const goToProfile = (symbol) => {
      window.location.href = `/company_profile/${symbol}`;
      showSearchDialog.value = false;
      searchTerm.value = "";
    };
    return (_ctx, _cache) => {
      const _component_v_app_bar_nav_icon = resolveComponent("v-app-bar-nav-icon");
      const _component_v_toolbar_title = resolveComponent("v-toolbar-title");
      const _component_v_icon = resolveComponent("v-icon");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_menu = resolveComponent("v-menu");
      const _component_v_toolbar = resolveComponent("v-toolbar");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_list_item_title = resolveComponent("v-list-item-title");
      const _component_v_card_text = resolveComponent("v-card-text");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_dialog = resolveComponent("v-dialog");
      const _component_v_app_bar = resolveComponent("v-app-bar");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$3),
        createVNode(_component_v_app_bar, {
          color: "primary",
          class: "outlined-navbar",
          style: { "border-bottom": ".5px solid #17223f" }
        }, {
          default: withCtx(() => [
            createVNode(_component_v_app_bar_nav_icon, {
              variant: "text",
              onClick: updateDrawer
            }),
            createVNode(_component_v_toolbar_title, null, {
              default: withCtx(() => _cache[5] || (_cache[5] = [
                createBaseVNode("a", {
                  href: "/",
                  style: { "text-decoration": "none", "display": "flex", "align-items": "center" }
                }, [
                  createBaseVNode("img", {
                    src: "https://agdsvgs.s3.us-east-2.amazonaws.com/logo-icon.svg",
                    style: { "width": "35px", "margin-right": "5px" }
                  }),
                  createBaseVNode("img", {
                    src: "https://agdsvgs.s3.us-east-2.amazonaws.com/logo-text.svg",
                    style: { "width": "100px", "margin-right": "5px" }
                  })
                ], -1)
              ])),
              _: 1
            }),
            createBaseVNode("div", _hoisted_1$1, [
              createVNode(_component_v_menu, {
                "offset-y": "",
                transition: "slide-y-transition"
              }, {
                activator: withCtx(({ props }) => [
                  createVNode(_component_v_btn, mergeProps(props, {
                    icon: "",
                    class: "text-white"
                  }), {
                    default: withCtx(() => [
                      createVNode(_component_v_icon, null, {
                        default: withCtx(() => _cache[6] || (_cache[6] = [
                          createTextVNode("mdi-account")
                        ])),
                        _: 1
                      })
                    ]),
                    _: 2
                  }, 1040)
                ]),
                default: withCtx(() => [
                  createVNode(_component_v_list, { style: { "background-color": "#0c1427", "color": "#fff" } }, {
                    default: withCtx(() => [
                      unref(page).props.auth && !unref(page).props.auth.user ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        createVNode(_component_v_list_item, null, {
                          default: withCtx(() => [
                            createVNode(unref(Pe), {
                              href: _ctx.route("login"),
                              class: "w-100 text-decoration-none",
                              style: { "color": "#fff" }
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_icon, {
                                  left: "",
                                  class: "mr-2"
                                }, {
                                  default: withCtx(() => _cache[7] || (_cache[7] = [
                                    createTextVNode("mdi-login")
                                  ])),
                                  _: 1
                                }),
                                _cache[8] || (_cache[8] = createTextVNode("Login "))
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_list_item, null, {
                          default: withCtx(() => [
                            createVNode(unref(Pe), {
                              href: _ctx.route("register"),
                              class: "w-100 text-decoration-none",
                              style: { "color": "#fff" }
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_v_icon, {
                                  left: "",
                                  class: "mr-2"
                                }, {
                                  default: withCtx(() => _cache[9] || (_cache[9] = [
                                    createTextVNode("mdi-account-plus")
                                  ])),
                                  _: 1
                                }),
                                _cache[10] || (_cache[10] = createTextVNode("Register "))
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          _: 1
                        })
                      ], 64)) : unref(page).props.auth && unref(page).props.auth.user ? (openBlock(), createBlock(_component_v_list_item, { key: 1 }, {
                        default: withCtx(() => [
                          createVNode(unref(Pe), {
                            href: _ctx.route("logout"),
                            method: "post",
                            as: "button",
                            class: "w-100 text-decoration-none",
                            style: { "color": "#fff" }
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_v_icon, {
                                left: "",
                                class: "mr-2"
                              }, {
                                default: withCtx(() => _cache[11] || (_cache[11] = [
                                  createTextVNode("mdi-logout")
                                ])),
                                _: 1
                              }),
                              _cache[12] || (_cache[12] = createTextVNode("Logout "))
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            createVNode(_component_v_btn, {
              icon: "mdi-magnify",
              variant: "text",
              onClick: _cache[0] || (_cache[0] = ($event) => showSearchDialog.value = true)
            }),
            createVNode(_component_v_dialog, {
              modelValue: showSearchDialog.value,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => showSearchDialog.value = $event),
              transition: "dialog-bottom-transition",
              class: "forceLocation",
              "onClick:outside": _cache[4] || (_cache[4] = ($event) => showSearchDialog.value = false)
            }, {
              default: withCtx(() => [
                createVNode(_component_v_card, {
                  class: "search-dialog-card",
                  style: normalizeStyle(unref(mdAndUp) ? "width: 30vw; height: 85vh;" : "")
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_toolbar, {
                      color: "primary",
                      dark: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_btn, {
                          icon: "",
                          onClick: _cache[1] || (_cache[1] = ($event) => showSearchDialog.value = false)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_icon, null, {
                              default: withCtx(() => _cache[13] || (_cache[13] = [
                                createTextVNode("mdi-close")
                              ])),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_v_toolbar_title, null, {
                          default: withCtx(() => _cache[14] || (_cache[14] = [
                            createTextVNode("Search Companies")
                          ])),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_v_card_text, {
                      class: "pa-4",
                      style: { "padding-top": "0" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_text_field, {
                          modelValue: searchTerm.value,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => searchTerm.value = $event),
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
                            (openBlock(true), createElementBlock(Fragment, null, renderList(filteredSymbols.value, (item) => {
                              return openBlock(), createBlock(_component_v_list_item, {
                                key: item.symbol,
                                onClick: ($event) => goToProfile(item.symbol)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_list_item_title, null, {
                                    default: withCtx(() => [
                                      createBaseVNode("div", _hoisted_2$1, [
                                        createBaseVNode("span", null, toDisplayString(item.name), 1),
                                        createBaseVNode("span", _hoisted_3$1, "[" + toDisplayString(item.symbol) + "]", 1)
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
            }, 8, ["modelValue"])
          ]),
          _: 1
        })
      ], 64);
    };
  }
};
const _hoisted_1 = { class: "justify-content-center" };
const _hoisted_2 = ["href"];
const _hoisted_3 = { class: "justify-content-center" };
const _hoisted_4 = { class: "justify-content-center" };
const _sfc_main$1 = {
  __name: "Sidebar",
  props: {
    drawer: Boolean
    // Receives the drawer state from MainLayout.vue
  },
  emits: ["update:drawer"],
  setup(__props, { emit: __emit }) {
    const items = [
      { title: "Market Summary", link: "/", value: "bar" }
    ];
    const props = __props;
    const emit = __emit;
    const toggleDrawer = () => {
      emit("update:drawer", !props.drawer);
    };
    return (_ctx, _cache) => {
      const _component_v_list_subheader = resolveComponent("v-list-subheader");
      const _component_v_divider = resolveComponent("v-divider");
      const _component_v_list_item = resolveComponent("v-list-item");
      const _component_v_list = resolveComponent("v-list");
      const _component_v_navigation_drawer = resolveComponent("v-navigation-drawer");
      return openBlock(), createBlock(_component_v_navigation_drawer, {
        color: "primary",
        "model-value": __props.drawer,
        width: 250,
        "onUpdate:modelValue": toggleDrawer,
        class: "outlined-sidebar",
        style: { "border-right": "2px solid #17223f" }
      }, {
        default: withCtx(() => [
          createVNode(_component_v_list, { density: "compact" }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createVNode(_component_v_list_subheader, { style: { "color": "white", "background-color": "#17223f" } }, {
                  default: withCtx(() => _cache[0] || (_cache[0] = [
                    createTextVNode("Stocks")
                  ])),
                  _: 1
                })
              ]),
              createVNode(_component_v_divider),
              (openBlock(), createElementBlock(Fragment, null, renderList(items, (item, i) => {
                return createVNode(_component_v_list_item, {
                  key: i,
                  value: item,
                  color: "primary"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("a", {
                      href: item.link,
                      style: { "color": "white", "text-decoration": "none" }
                    }, toDisplayString(item.title), 9, _hoisted_2)
                  ]),
                  _: 2
                }, 1032, ["value"]);
              }), 64)),
              createVNode(_component_v_divider),
              createBaseVNode("div", _hoisted_3, [
                createVNode(_component_v_list_subheader, { style: { "color": "white", "background-color": "#17223f" } }, {
                  default: withCtx(() => _cache[1] || (_cache[1] = [
                    createTextVNode("Options")
                  ])),
                  _: 1
                })
              ]),
              createVNode(_component_v_divider),
              createVNode(_component_v_list_item, null, {
                default: withCtx(() => _cache[2] || (_cache[2] = [
                  createBaseVNode("a", {
                    href: "/optionsStrategyBuilder",
                    style: { "color": "white", "text-decoration": "none" }
                  }, "Option Strategy Builder", -1)
                ])),
                _: 1
              }),
              createVNode(_component_v_divider),
              createBaseVNode("div", _hoisted_4, [
                createVNode(_component_v_list_subheader, { style: { "color": "white", "background-color": "#17223f" } }, {
                  default: withCtx(() => _cache[3] || (_cache[3] = [
                    createTextVNode("Portfolio")
                  ])),
                  _: 1
                })
              ]),
              createVNode(_component_v_list_item, null, {
                default: withCtx(() => _cache[4] || (_cache[4] = [
                  createBaseVNode("a", {
                    href: "/portfolioOptimizerIndex",
                    style: { "color": "white", "text-decoration": "none" }
                  }, "Portfolio Optimizer", -1)
                ])),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model-value"]);
    };
  }
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_v_footer = resolveComponent("v-footer");
  const _component_v_alert = resolveComponent("v-alert");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_v_footer, {
      border: "",
      color: "primary"
    }, {
      default: withCtx(() => _cache[0] || (_cache[0] = [
        createTextVNode("* Data is delayed by at least 15 minutes")
      ])),
      _: 1
    }),
    _cache[2] || (_cache[2] = createBaseVNode("div", { style: { "background-color": "#1e293b", "padding": "16px", "border-radius": "8px", "color": "#f1f5f9", "font-family": "'Segoe UI', sans-serif", "text-align": "center" } }, [
      createBaseVNode("p", { style: { "margin": "0", "font-size": "16px" } }, [
        createTextVNode(" This is a portfolio project to highlight my technical abilities. I'm open to work and would love to connect — reach out here: "),
        createBaseVNode("a", {
          href: "https://www.linkedin.com/in/mario-landa/",
          target: "_blank",
          style: { "color": "#38bdf8", "text-decoration": "underline", "font-weight": "500" }
        }, " LinkedIn Profile ")
      ]),
      createBaseVNode("br"),
      createTextVNode("If you find this project helpful, feel free to give it a ⭐ on "),
      createBaseVNode("a", {
        href: "https://github.com/mlandacoding/stocks-dashboard",
        target: "_blank"
      }, "GitHub"),
      createTextVNode(" — it really helps! ")
    ], -1)),
    createBaseVNode("div", null, [
      createVNode(_component_v_alert, {
        type: "info",
        variant: "tonal",
        border: "start",
        icon: "mdi-shield-alert"
      }, {
        default: withCtx(() => _cache[1] || (_cache[1] = [
          createBaseVNode("strong", null, "Disclaimer:", -1),
          createTextVNode(" The information provided on this page is for informational purposes only and does not constitute financial, investment, or legal advice. We do not make any guarantees about the completeness, reliability, or accuracy of this data. Always consult with a qualified financial advisor before making any investment decisions. ")
        ])),
        _: 1
      })
    ])
  ], 64);
}
const FooterComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  FooterComponent as F,
  _export_sfc as _,
  _sfc_main$2 as a,
  _sfc_main$1 as b
};
