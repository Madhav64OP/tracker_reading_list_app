// import { ServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

// let handler= ServiceWorkerMLCEngineHandler;

// self.addEventListener("activate", function (event) {
//   handler = new ServiceWorkerMLCEngineHandler();
//   console.log("Service Worker is ready");
// });
import { ExtensionServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

const handler = new ExtensionServiceWorkerMLCEngineHandler();

self.addEventListener("install", () =>
  console.log("✅ LLM Service Worker installed")
);

self.addEventListener("activate", () =>
  console.log("✅ LLM Service Worker activated")
);

self.addEventListener("message", (event) => {
  handler.onmessage(event);
});
