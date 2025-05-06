import { c as createElementBlock, o as openBlock, f as createBaseVNode, d as createVNode, F as Fragment } from "./app-Cd52K4uN.js";
import { M as MainLayout } from "./MainLayout-CcV8cUea.js";
import "./IntradayGraph-wXBUz1KA.js";
const _sfc_main = {
  __name: "Welcome",
  props: {
    message: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _cache[0] || (_cache[0] = createBaseVNode("head", null, [
          createBaseVNode("meta", { charset: "UTF-8" }),
          createBaseVNode("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0"
          }),
          createBaseVNode("meta", {
            "http-equiv": "X-UA-Compatible",
            content: "ie=edge"
          }),
          createBaseVNode("title", null, "All Global Data"),
          createBaseVNode("meta", {
            name: "description",
            content: "We are a Financial Data repository with a focus on Public Companies and their Fundamental data."
          })
        ], -1)),
        createVNode(MainLayout)
      ], 64);
    };
  }
};
export {
  _sfc_main as default
};
