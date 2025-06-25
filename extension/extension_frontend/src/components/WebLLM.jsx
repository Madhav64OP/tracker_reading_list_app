import React, { useEffect, useState } from 'react'
import * as webllm from "@mlc-ai/web-llm";

function WebLLM() {
    const [engine, setEngine] = useState(null)

    const selectedModel = "gemma-3-1b-it-q0f16-MLC";

    const engineeredPromt = `You're an intelligent summarizer for a productivity and learning platform.

Given only the title of a video or article, generate:
- a self-created short **label or title** that reflects the main theme of the content (but is not a copy of the original)
- a one-line **insight** that reflects the user’s interest or takeaway
- relevant **tags**

Return in JSON:

{
  "generatedTitle": "<short headline, 3–6 words>",
  "insight": "<reflective line about interest or takeaway>",
  "tags": ["...", "..."]
}

If the input is vague like just "YouTube", return { "skip": true }

Input:
Title: ${null}
`

    useEffect(() => {
        webllm.CreateMLCEngine(selectedModel, {
            initProgressCallback: (initProgress) => {
                console.log(initProgress);
            }
        }).then(engine => {
            setEngine(engine)
        })
    }, [])


    return (
        <div>WebLLM</div>
    )
}

export default WebLLM