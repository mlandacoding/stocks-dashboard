import { d as defineComponent, C, c as createBlock, o as openBlock, w as withCtx, a as createVNode, f as createElementBlock, b as createCommentVNode, e as createBaseVNode, m as unref, D as me, t as toDisplayString, E as withModifiers, j as createTextVNode } from "./app-LTFrDTJ3.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3 } from "./Label.vue_vue_type_script_setup_true_lang-Do2wQM-E.js";
import { _ as _sfc_main$5 } from "./TextLink.vue_vue_type_script_setup_true_lang-DCyheQbO.js";
import { _ as _sfc_main$4, L as LoaderCircle, a as _sfc_main$6 } from "./loader-circle-DiuIskIf.js";
const _hoisted_1 = {
  key: 0,
  class: "mb-4 text-center text-sm font-medium text-green-600"
};
const _hoisted_2 = { class: "space-y-6" };
const _hoisted_3 = { class: "grid gap-2" };
const _hoisted_4 = { class: "my-6 flex items-center justify-start" };
const _hoisted_5 = { class: "space-x-1 text-center text-sm text-muted-foreground" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ForgotPassword",
  props: {
    status: {}
  },
  setup(__props) {
    const form = C({
      email: ""
    });
    const submit = () => {
      form.post(route("password.email"));
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$6, {
        title: "Forgot password",
        description: "Enter your email to receive a password reset link"
      }, {
        default: withCtx(() => [
          createVNode(unref(me), { title: "Forgot password" }),
          _ctx.status ? (openBlock(), createElementBlock("div", _hoisted_1, toDisplayString(_ctx.status), 1)) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_2, [
            createBaseVNode("form", {
              onSubmit: withModifiers(submit, ["prevent"])
            }, [
              createBaseVNode("div", _hoisted_3, [
                createVNode(unref(_sfc_main$1), { for: "email" }, {
                  default: withCtx(() => _cache[1] || (_cache[1] = [
                    createTextVNode("Email address")
                  ])),
                  _: 1
                }),
                createVNode(unref(_sfc_main$2), {
                  id: "email",
                  type: "email",
                  name: "email",
                  autocomplete: "off",
                  modelValue: unref(form).email,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(form).email = $event),
                  autofocus: "",
                  placeholder: "email@example.com"
                }, null, 8, ["modelValue"]),
                createVNode(_sfc_main$3, {
                  message: unref(form).errors.email
                }, null, 8, ["message"])
              ]),
              createBaseVNode("div", _hoisted_4, [
                createVNode(unref(_sfc_main$4), {
                  class: "w-full",
                  disabled: unref(form).processing
                }, {
                  default: withCtx(() => [
                    unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                      key: 0,
                      class: "h-4 w-4 animate-spin"
                    })) : createCommentVNode("", true),
                    _cache[2] || (_cache[2] = createTextVNode(" Email password reset link "))
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
            ], 32),
            createBaseVNode("div", _hoisted_5, [
              _cache[4] || (_cache[4] = createBaseVNode("span", null, "Or, return to", -1)),
              createVNode(_sfc_main$5, {
                href: _ctx.route("login")
              }, {
                default: withCtx(() => _cache[3] || (_cache[3] = [
                  createTextVNode("log in")
                ])),
                _: 1
              }, 8, ["href"])
            ])
          ])
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
