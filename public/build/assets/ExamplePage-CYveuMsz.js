import { c as createBlock, o as openBlock, w as withCtx, a as createVNode } from "./app-BjtgQjwX.js";
import { L as LiveStocksTable, M as MainLayout } from "./MainLayout-C3Lu4Zp2.js";
const _sfc_main = {
  __name: "ExamplePage",
  props: {
    message: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(MainLayout, null, {
        default: withCtx(() => [
          createVNode(LiveStocksTable)
        ]),
        _: 1
      });
    };
  }
};
export {
  _sfc_main as default
};
