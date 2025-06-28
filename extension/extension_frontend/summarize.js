import { ServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

const handler = new ServiceWorkerMLCEngineHandler();

self.addEventListener("install", () => {
  console.log("✅ LLM Service Worker installed");
});

self.addEventListener("activate", () => {
  console.log("✅ LLM Service Worker activated");
});

self.addEventListener("message", (event) => {
  console.log("📨 LLM SW got message", event.data);
  handler.onmessage(event);  // required to delegate control
});
