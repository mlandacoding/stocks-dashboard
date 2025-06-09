import { d as defineComponent, C, c as createBlock, o as openBlock, w as withCtx, a as createVNode, f as createElementBlock, b as createCommentVNode, e as createBaseVNode, m as unref, D as me, E as withModifiers, j as createTextVNode } from "./app-CARG_xon.js";
import { _ as _sfc_main$2 } from "./TextLink.vue_vue_type_script_setup_true_lang-4pPnoyn0.js";
import { _ as _sfc_main$1, L as LoaderCircle, a as _sfc_main$3 } from "./loader-circle-r8YJwNm-.js";
const _hoisted_1 = {
  key: 0,
  class: "mb-4 text-center text-sm font-medium text-green-600"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VerifyEmail",
  props: {
    status: {}
  },
  setup(__props) {
    const form = C({});
    const submit = () => {
      form.post(route("verification.send"));
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$3, {
        title: "Verify email",
        description: "Please verify your email address by clicking on the link we just emailed to you."
      }, {
        default: withCtx(() => [
          createVNode(unref(me), { title: "Email verification" }),
          _ctx.status === "verification-link-sent" ? (openBlock(), createElementBlock("div", _hoisted_1, " A new verification link has been sent to the email address you provided during registration. ")) : createCommentVNode("", true),
          createBaseVNode("form", {
            onSubmit: withModifiers(submit, ["prevent"]),
            class: "space-y-6 text-center"
          }, [
            createVNode(unref(_sfc_main$1), {
              disabled: unref(form).processing,
              variant: "secondary"
            }, {
              default: withCtx(() => [
                unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                  key: 0,
                  class: "h-4 w-4 animate-spin"
                })) : createCommentVNode("", true),
                _cache[0] || (_cache[0] = createTextVNode(" Resend verification email "))
              ]),
              _: 1
            }, 8, ["disabled"]),
            createVNode(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "mx-auto block text-sm"
            }, {
              default: withCtx(() => _cache[1] || (_cache[1] = [
                createTextVNode(" Log out ")
              ])),
              _: 1
            }, 8, ["href"])
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
