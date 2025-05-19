import { d as defineComponent, C, c as createBlock, o as openBlock, w as withCtx, a as createVNode, e as createBaseVNode, m as unref, D as me, E as withModifiers, j as createTextVNode, b as createCommentVNode } from "./app-LTFrDTJ3.js";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3 } from "./Label.vue_vue_type_script_setup_true_lang-Do2wQM-E.js";
import { _ as _sfc_main$5 } from "./TextLink.vue_vue_type_script_setup_true_lang-DCyheQbO.js";
import { _ as _sfc_main$4, L as LoaderCircle, a as _sfc_main$6 } from "./loader-circle-DiuIskIf.js";
const _hoisted_1 = { class: "grid gap-6" };
const _hoisted_2 = { class: "grid gap-2" };
const _hoisted_3 = { class: "grid gap-2" };
const _hoisted_4 = { class: "grid gap-2" };
const _hoisted_5 = { class: "grid gap-2" };
const _hoisted_6 = { class: "text-center text-sm text-muted-foreground" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Register",
  setup(__props) {
    const form = C({
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$6, {
        title: "Create an account",
        description: "Enter your details below to create your account"
      }, {
        default: withCtx(() => [
          createVNode(unref(me), { title: "Register" }),
          createBaseVNode("form", {
            onSubmit: withModifiers(submit, ["prevent"]),
            class: "flex flex-col gap-6"
          }, [
            createBaseVNode("div", _hoisted_1, [
              createBaseVNode("div", _hoisted_2, [
                createVNode(unref(_sfc_main$1), { for: "name" }, {
                  default: withCtx(() => _cache[4] || (_cache[4] = [
                    createTextVNode("Name")
                  ])),
                  _: 1
                }),
                createVNode(unref(_sfc_main$2), {
                  id: "name",
                  type: "text",
                  required: "",
                  autofocus: "",
                  tabindex: 1,
                  autocomplete: "name",
                  modelValue: unref(form).name,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(form).name = $event),
                  placeholder: "Full name"
                }, null, 8, ["modelValue"]),
                createVNode(_sfc_main$3, {
                  message: unref(form).errors.name
                }, null, 8, ["message"])
              ]),
              createBaseVNode("div", _hoisted_3, [
                createVNode(unref(_sfc_main$1), { for: "email" }, {
                  default: withCtx(() => _cache[5] || (_cache[5] = [
                    createTextVNode("Email address")
                  ])),
                  _: 1
                }),
                createVNode(unref(_sfc_main$2), {
                  id: "email",
                  type: "email",
                  required: "",
                  tabindex: 2,
                  autocomplete: "email",
                  modelValue: unref(form).email,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(form).email = $event),
                  placeholder: "email@example.com"
                }, null, 8, ["modelValue"]),
                createVNode(_sfc_main$3, {
                  message: unref(form).errors.email
                }, null, 8, ["message"])
              ]),
              createBaseVNode("div", _hoisted_4, [
                createVNode(unref(_sfc_main$1), { for: "password" }, {
                  default: withCtx(() => _cache[6] || (_cache[6] = [
                    createTextVNode("Password")
                  ])),
                  _: 1
                }),
                createVNode(unref(_sfc_main$2), {
                  id: "password",
                  type: "password",
                  required: "",
                  tabindex: 3,
                  autocomplete: "new-password",
                  modelValue: unref(form).password,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(form).password = $event),
                  placeholder: "Password"
                }, null, 8, ["modelValue"]),
                createVNode(_sfc_main$3, {
                  message: unref(form).errors.password
                }, null, 8, ["message"])
              ]),
              createBaseVNode("div", _hoisted_5, [
                createVNode(unref(_sfc_main$1), { for: "password_confirmation" }, {
                  default: withCtx(() => _cache[7] || (_cache[7] = [
                    createTextVNode("Confirm password")
                  ])),
                  _: 1
                }),
                createVNode(unref(_sfc_main$2), {
                  id: "password_confirmation",
                  type: "password",
                  required: "",
                  tabindex: 4,
                  autocomplete: "new-password",
                  modelValue: unref(form).password_confirmation,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(form).password_confirmation = $event),
                  placeholder: "Confirm password"
                }, null, 8, ["modelValue"]),
                createVNode(_sfc_main$3, {
                  message: unref(form).errors.password_confirmation
                }, null, 8, ["message"])
              ]),
              createVNode(unref(_sfc_main$4), {
                type: "submit",
                class: "mt-2 w-full",
                tabindex: "5",
                disabled: unref(form).processing
              }, {
                default: withCtx(() => [
                  unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                    key: 0,
                    class: "h-4 w-4 animate-spin"
                  })) : createCommentVNode("", true),
                  _cache[8] || (_cache[8] = createTextVNode(" Create account "))
                ]),
                _: 1
              }, 8, ["disabled"])
            ]),
            createBaseVNode("div", _hoisted_6, [
              _cache[10] || (_cache[10] = createTextVNode(" Already have an account? ")),
              createVNode(_sfc_main$5, {
                href: _ctx.route("login"),
                class: "underline underline-offset-4",
                tabindex: 6
              }, {
                default: withCtx(() => _cache[9] || (_cache[9] = [
                  createTextVNode("Log in")
                ])),
                _: 1
              }, 8, ["href"])
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
