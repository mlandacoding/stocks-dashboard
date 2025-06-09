import { d as defineComponent, C, c as createBlock, o as openBlock, w as withCtx, a as createVNode, e as createBaseVNode, m as unref, D as me, E as withModifiers, j as createTextVNode, b as createCommentVNode } from "./app-CARG_xon.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3 } from "./Label.vue_vue_type_script_setup_true_lang-DZGyimDH.js";
import { _ as _sfc_main$4, L as LoaderCircle, a as _sfc_main$5 } from "./loader-circle-r8YJwNm-.js";
const _hoisted_1 = { class: "space-y-6" };
const _hoisted_2 = { class: "grid gap-2" };
const _hoisted_3 = { class: "flex items-center" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ConfirmPassword",
  setup(__props) {
    const form = C({
      password: ""
    });
    const submit = () => {
      form.post(route("password.confirm"), {
        onFinish: () => {
          form.reset();
        }
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$5, {
        title: "Confirm your password",
        description: "This is a secure area of the application. Please confirm your password before continuing."
      }, {
        default: withCtx(() => [
          createVNode(unref(me), { title: "Confirm password" }),
          createBaseVNode("form", {
            onSubmit: withModifiers(submit, ["prevent"])
          }, [
            createBaseVNode("div", _hoisted_1, [
              createBaseVNode("div", _hoisted_2, [
                createVNode(unref(_sfc_main$1), { htmlFor: "password" }, {
                  default: withCtx(() => _cache[1] || (_cache[1] = [
                    createTextVNode("Password")
                  ])),
                  _: 1
                }),
                createVNode(unref(_sfc_main$2), {
                  id: "password",
                  type: "password",
                  class: "mt-1 block w-full",
                  modelValue: unref(form).password,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(form).password = $event),
                  required: "",
                  autocomplete: "current-password",
                  autofocus: ""
                }, null, 8, ["modelValue"]),
                createVNode(_sfc_main$3, {
                  message: unref(form).errors.password
                }, null, 8, ["message"])
              ]),
              createBaseVNode("div", _hoisted_3, [
                createVNode(unref(_sfc_main$4), {
                  class: "w-full",
                  disabled: unref(form).processing
                }, {
                  default: withCtx(() => [
                    unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                      key: 0,
                      class: "h-4 w-4 animate-spin"
                    })) : createCommentVNode("", true),
                    _cache[2] || (_cache[2] = createTextVNode(" Confirm Password "))
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ])
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
