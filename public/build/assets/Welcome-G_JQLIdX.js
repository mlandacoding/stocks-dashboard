import { f as createElementBlock, o as openBlock, e as createBaseVNode, a as createVNode, F as Fragment } from "./app-DIVAU1yG.js";
import { M as MainLayout } from "./MainLayout-DAANnMtp.js";
import "./FooterComponent-CJDXMBzI.js";
import "./useStockStream-B2e18YaT.js";
import "./IntradayGraph-C3fMrfI3.js";
import "./vue3-apexcharts-CzGknkqO.js";
import "./LiveSingleStockComponent-kSs3MxRz.js";
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
          createBaseVNode("title", null, "All Global Data"),
          createBaseVNode("meta", {
            name: "description",
            content: "All Global Data is a financial platform providing real-time stock updates, options strategy tools,\n        for public companies, ETFs, and indices."
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
