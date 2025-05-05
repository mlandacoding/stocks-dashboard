import { p as defineComponent, C, c as createBlock, o as openBlock, w as withCtx, a as createVNode, d as createBaseVNode, B as unref, D as me, E as withModifiers, g as createTextVNode, f as createCommentVNode } from "./app-B3XQ-6Qn.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3 } from "./Label.vue_vue_type_script_setup_true_lang-n8_22XrJ.js";
import { _ as _sfc_main$4, L as LoaderCircle, a as _sfc_main$5 } from "./loader-circle-tYQAcPMk.js";
const _hoisted_1 = { class: "grid gap-6" };
const _hoisted_2 = { class: "grid gap-2" };
const _hoisted_3 = { class: "grid gap-2" };
const _hoisted_4 = { class: "grid gap-2" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ResetPassword",
  props: {
    token: {},
    email: {}
  },
  setup(__props) {
    const props = __props;
    const form = C({
      token: props.token,
      email: props.email,
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("password.store"), {
        onFinish: () => {
          form.reset("password", "password_confirmation");
        }
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$5, {
        title: "Reset password",
        description: "Please enter your new password below"
      }, {
        default: withCtx(() => [
          createVNode(unref(me), { title: "Reset password" }),
          createBaseVNode("form", {
            onSubmit: withModifiers(submit, ["prevent"])
          }, [
            createBaseVNode("div", _hoisted_1, [
              createBaseVNode("div", _hoisted_2, [
                createVNode(unref(_sfc_main$1), { for: "email" }, {
                  default: withCtx(() => _cache[3] || (_cache[3] = [
                    createTextVNode("Email")
                  ])),
                  _: 1
                }),
                createVNode(unref(_sfc_main$2), {
                  id: "email",
                  type: "email",
                  name: "email",
                  autocomplete: "email",
                  modelValue: unref(form).email,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(form).email = $event),
                  class: "mt-1 block w-full",
                  readonly: ""
                }, null, 8, ["modelValue"]),
                createVNode(_sfc_main$3, {
                  message: unref(form).errors.email,
                  class: "mt-2"
                }, null, 8, ["message"])
              ]),
              createBaseVNode("div", _hoisted_3, [
                createVNode(unref(_sfc_main$1), { for: "password" }, {
                  default: withCtx(() => _cache[4] || (_cache[4] = [
                    createTextVNode("Password")
                  ])),
                  _: 1
                }),
                createVNode(unref(_sfc_main$2), {
                  id: "password",
                  type: "password",
                  name: "password",
                  autocomplete: "new-password",
                  modelValue: unref(form).password,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(form).password = $event),
                  class: "mt-1 block w-full",
                  autofocus: "",
                  placeholder: "Password"
                }, null, 8, ["modelValue"]),
                createVNode(_sfc_main$3, {
                  message: unref(form).errors.password
                }, null, 8, ["message"])
              ]),
              createBaseVNode("div", _hoisted_4, [
                createVNode(unref(_sfc_main$1), { for: "password_confirmation" }, {
                  default: withCtx(() => _cache[5] || (_cache[5] = [
                    createTextVNode(" Confirm Password ")
                  ])),
                  _: 1
                }),
                createVNode(unref(_sfc_main$2), {
                  id: "password_confirmation",
                  type: "password",
                  name: "password_confirmation",
                  autocomplete: "new-password",
                  modelValue: unref(form).password_confirmation,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(form).password_confirmation = $event),
                  class: "mt-1 block w-full",
                  placeholder: "Confirm password"
                }, null, 8, ["modelValue"]),
                createVNode(_sfc_main$3, {
                  message: unref(form).errors.password_confirmation
                }, null, 8, ["message"])
              ]),
              createVNode(unref(_sfc_main$4), {
                type: "submit",
                class: "mt-4 w-full",
                disabled: unref(form).processing
              }, {
                default: withCtx(() => [
                  unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                    key: 0,
                    class: "h-4 w-4 animate-spin"
                  })) : createCommentVNode("", true),
                  _cache[6] || (_cache[6] = createTextVNode(" Reset password "))
                ]),
                _: 1
              }, 8, ["disabled"])
            ])
          ], 32)
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
