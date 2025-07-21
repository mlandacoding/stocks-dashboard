import { g as ref, h as onMounted, r as resolveComponent, f as createElementBlock, o as openBlock, c as createBlock, b as createCommentVNode, w as withCtx, j as createTextVNode, e as createBaseVNode, t as toDisplayString, a as createVNode, F as Fragment } from "./app-B8Z1Fyv-.js";
import { _ as _export_sfc } from "./FooterComponent-D7VV_RBj.js";
const _hoisted_1 = { class: "content-wrapper" };
const _hoisted_2 = {
  key: 0,
  class: "after-hours-text"
};
const _hoisted_3 = {
  key: 1,
  class: "after-hours-text"
};
const _sfc_main = {
  __name: "MarketStatus",
  setup(__props) {
    const holiday = ref("");
    ref("");
    const marketStatus = ref("");
    const closeTime = ref("");
    const afterHours = ref(false);
    const marketsAreOpen = ref(false);
    onMounted(async () => {
      const response = await axios.get(`/isHoliday`);
      if (response) {
        holiday.value = response.data.name;
        marketStatus.value = response.data.status;
        if (marketStatus.value == "early-close") {
          var date = new Date(response.data.close);
          closeTime.value = date.toTimeString().split(" ")[0];
        }
      } else {
        holiday.value = false;
      }
      const apiMarketStatus = await axios.get("/market-status");
      if (apiMarketStatus) {
        afterHours.value = apiMarketStatus.data.afterHours;
        marketsAreOpen.value = apiMarketStatus.data.market === "open";
      }
    });
    return (_ctx, _cache) => {
      const _component_v_alert = resolveComponent("v-alert");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_row = resolveComponent("v-row");
      return openBlock(), createElementBlock(Fragment, null, [
        holiday.value ? (openBlock(), createBlock(_component_v_container, { key: 0 }, {
          default: withCtx(() => [
            marketStatus.value == "closed" ? (openBlock(), createBlock(_component_v_alert, {
              key: 0,
              color: "#C51162",
              icon: "mdi-cancel",
              theme: "dark",
              density: "compact",
              border: ""
            }, {
              default: withCtx(() => [
                _cache[0] || (_cache[0] = createTextVNode(" Markets are closed in observance of ")),
                createBaseVNode("b", null, toDisplayString(holiday.value), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true),
            marketStatus.value == "early-close" ? (openBlock(), createBlock(_component_v_alert, {
              key: 1,
              color: "#C51162",
              icon: "mdi-cancel",
              theme: "dark",
              density: "compact",
              border: ""
            }, {
              default: withCtx(() => [
                _cache[1] || (_cache[1] = createTextVNode(" Markets are closing early ")),
                createBaseVNode("b", null, " [" + toDisplayString(closeTime.value) + " UTC]", 1),
                _cache[2] || (_cache[2] = createTextVNode(" in observance of ")),
                createBaseVNode("b", null, toDisplayString(holiday.value), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ]),
          _: 1
        })) : createCommentVNode("", true),
        afterHours.value || marketsAreOpen.value ? (openBlock(), createBlock(_component_v_container, { key: 1 }, {
          default: withCtx(() => [
            createVNode(_component_v_row, { justify: "end" }, {
              default: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(_component_v_btn, {
                    class: "after-hours-btn",
                    variant: "outlined",
                    color: "green",
                    density: "comfortable",
                    rounded: "lg",
                    ripple: false,
                    style: { "pointer-events": "none" }
                  }, {
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_1, [
                        afterHours.value ? (openBlock(), createElementBlock("span", _hoisted_2, "After Hours")) : createCommentVNode("", true),
                        marketsAreOpen.value && !afterHours.value ? (openBlock(), createElementBlock("span", _hoisted_3, "Markets Are Open")) : createCommentVNode("", true),
                        _cache[3] || (_cache[3] = createBaseVNode("span", { class: "dot" }, null, -1))
                      ])
                    ]),
                    _: 1
                  })
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        })) : (openBlock(), createBlock(_component_v_container, { key: 2 }, {
          default: withCtx(() => [
            createVNode(_component_v_row, { justify: "end" }, {
              default: withCtx(() => [
                createBaseVNode("div", null, [
                  createVNode(_component_v_btn, {
                    class: "closed-hours-btn",
                    variant: "outlined",
                    color: "red",
                    density: "comfortable",
                    rounded: "lg",
                    ripple: false,
                    style: { "pointer-events": "none" }
                  }, {
                    default: withCtx(() => _cache[4] || (_cache[4] = [
                      createBaseVNode("div", { class: "content-wrapper" }, [
                        createBaseVNode("span", { class: "after-hours-text" }, "Markets Are Closed"),
                        createBaseVNode("span", { class: "closed-dot" })
                      ], -1)
                    ])),
                    _: 1
                  })
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        }))
      ], 64);
    };
  }
};
const MarketStatus = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c5f99dfa"]]);
export {
  MarketStatus as M
};
