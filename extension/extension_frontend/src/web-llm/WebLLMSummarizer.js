import { useEffect, useState } from 'react'
import * as webllm from "@mlc-ai/web-llm";

export default function useWebLLMSummarizer(data) {

    const [engine, setEngine] = useState(null);
    const [output, setOutput] = useState("")

    const selectedModel = "gemma-2-2b-it-q4f16_1-MLC";

    useEffect(() => {
        webllm.CreateMLCEngine(selectedModel, {
            initProgressCallback: (initProgress) => {
                console.log(initProgress);
            }
        }).then(engine => {
            setEngine(engine)
        })
    }, [])

    
    const generate = async (data) => {
        if (!data || !engine) return;
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
Title: ${data.title}
`
        const reply = await engine.chat.completions.create({
            messages: [{ role: "user", content: engineeredPromt }],
            stream: false,
        });
        // setOutput(reply)
        console.log(reply);
        return reply.choices[0]?.message?.content || null;
    }

    // useEffect(() => {



    // }, [engine, data]);




    return generate;
}
