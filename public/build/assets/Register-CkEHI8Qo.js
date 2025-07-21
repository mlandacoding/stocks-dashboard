import { d as defineComponent, C, g as ref, r as resolveComponent, f as createElementBlock, o as openBlock, e as createBaseVNode, a as createVNode, w as withCtx, n as normalizeClass, m as unref, D as me, j as createTextVNode, E as withModifiers, c as createBlock, b as createCommentVNode, F as Fragment } from "./app-B8Z1Fyv-.js";
import { _ as _sfc_main$3 } from "./TextLink.vue_vue_type_script_setup_true_lang-DJ5JQzMw.js";
import { a as _sfc_main$1, b as _sfc_main$2, F as FooterComponent, _ as _export_sfc } from "./FooterComponent-D7VV_RBj.js";
import { L as LoaderCircle } from "./loader-circle-B3CJX7vV.js";
const _hoisted_1 = { class: "text-center text-sm mt-4" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Register",
  setup(__props) {
    const form = C({
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
    const drawer = ref(false);
    const handleDrawerToggle = () => {
      drawer.value = !drawer.value;
    };
    const submit = () => {
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _cache) => {
      const _component_v_card_title = resolveComponent("v-card-title");
      const _component_v_text_field = resolveComponent("v-text-field");
      const _component_v_btn = resolveComponent("v-btn");
      const _component_v_form = resolveComponent("v-form");
      const _component_v_card = resolveComponent("v-card");
      const _component_v_col = resolveComponent("v-col");
      const _component_v_row = resolveComponent("v-row");
      const _component_v_container = resolveComponent("v-container");
      const _component_v_main = resolveComponent("v-main");
      const _component_v_layout = resolveComponent("v-layout");
      const _component_v_sheet = resolveComponent("v-sheet");
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[8] || (_cache[8] = createBaseVNode("link", {
          href: "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css",
          rel: "stylesheet"
        }, null, -1)),
        createVNode(_component_v_sheet, { class: "custom-width-wrapper" }, {
          default: withCtx(() => [
            createVNode(_component_v_layout, { style: { "background": "#0c1427", "min-height": "100vh" } }, {
              default: withCtx(() => [
                createVNode(_sfc_main$1, { onToggleDrawer: handleDrawerToggle }),
                createVNode(_sfc_main$2, {
                  drawer: drawer.value,
                  "onUpdate:drawer": handleDrawerToggle
                }, null, 8, ["drawer"]),
                createVNode(_component_v_main, {
                  class: normalizeClass({ "content-expanded": !drawer.value, "content-shrinked": drawer.value })
                }, {
                  default: withCtx(() => [
                    createVNode(_component_v_container, {
                      fluid: "",
                      class: "pa-0 d-flex align-center justify-center",
                      style: { "min-height": "80vh" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_row, {
                          justify: "center",
                          align: "center",
                          class: "w-100"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_v_col, {
                              cols: "12",
                              sm: "6",
                              md: "4"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(me), { title: "Register" }),
                                createVNode(_component_v_card, {
                                  style: { "background": "#0c1427", "color": "#fff", "border": "2px solid #fff" },
                                  class: "pa-6 rounded-lg shadow"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_card_title, { class: "text-center text-h5 mb-4" }, {
                                      default: withCtx(() => _cache[4] || (_cache[4] = [
                                        createTextVNode("Create an account")
                                      ])),
                                      _: 1
                                    }),
                                    createVNode(_component_v_form, {
                                      onSubmit: withModifiers(submit, ["prevent"]),
                                      class: "d-flex flex-column gap-4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_text_field, {
                                          modelValue: unref(form).name,
                                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(form).name = $event),
                                          label: "Name",
                                          type: "text",
                                          required: "",
                                          autofocus: "",
                                          tabindex: 1,
                                          autocomplete: "name",
                                          "error-messages": unref(form).errors.name,
                                          color: "primary",
                                          variant: "underlined",
                                          class: "white--text",
                                          style: { "color": "#fff" }
                                        }, null, 8, ["modelValue", "error-messages"]),
                                        createVNode(_component_v_text_field, {
                                          modelValue: unref(form).email,
                                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(form).email = $event),
                                          label: "Email address",
                                          type: "email",
                                          required: "",
                                          tabindex: 2,
                                          autocomplete: "email",
                                          "error-messages": unref(form).errors.email,
                                          color: "primary",
                                          variant: "underlined",
                                          class: "white--text",
                                          style: { "color": "#fff" }
                                        }, null, 8, ["modelValue", "error-messages"]),
                                        createVNode(_component_v_text_field, {
                                          modelValue: unref(form).password,
                                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(form).password = $event),
                                          label: "Password",
                                          type: "password",
                                          required: "",
                                          tabindex: 3,
                                          autocomplete: "new-password",
                                          "error-messages": unref(form).errors.password,
                                          color: "primary",
                                          variant: "underlined",
                                          class: "white--text",
                                          style: { "color": "#fff" }
                                        }, null, 8, ["modelValue", "error-messages"]),
                                        createVNode(_component_v_text_field, {
                                          modelValue: unref(form).password_confirmation,
                                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(form).password_confirmation = $event),
                                          label: "Confirm password",
                                          type: "password",
                                          required: "",
                                          tabindex: 4,
                                          autocomplete: "new-password",
                                          "error-messages": unref(form).errors.password_confirmation,
                                          color: "primary",
                                          variant: "underlined",
                                          class: "white--text",
                                          style: { "color": "#fff" }
                                        }, null, 8, ["modelValue", "error-messages"]),
                                        createVNode(_component_v_btn, {
                                          type: "submit",
                                          color: "primary",
                                          class: "mt-2 w-full",
                                          tabindex: "5",
                                          loading: unref(form).processing,
                                          block: ""
                                        }, {
                                          default: withCtx(() => [
                                            unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                                              key: 0,
                                              class: "h-4 w-4 animate-spin mr-2"
                                            })) : createCommentVNode("", true),
                                            _cache[5] || (_cache[5] = createTextVNode(" Create account "))
                                          ]),
                                          _: 1
                                        }, 8, ["loading"])
                                      ]),
                                      _: 1
                                    }),
                                    createBaseVNode("div", _hoisted_1, [
                                      _cache[7] || (_cache[7] = createBaseVNode("span", { class: "text-muted-foreground" }, "Already have an account?", -1)),
                                      createVNode(_sfc_main$3, {
                                        href: _ctx.route("login"),
                                        class: "text-blue-300 ml-1",
                                        tabindex: 6
                                      }, {
                                        default: withCtx(() => _cache[6] || (_cache[6] = [
                                          createTextVNode("Log in")
                                        ])),
                                        _: 1
                                      }, 8, ["href"])
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
});
const Register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f22ae6ad"]]);
export {
  Register as default
};
