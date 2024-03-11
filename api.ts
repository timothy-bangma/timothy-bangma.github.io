// simple reflect data call

// responds with the data sent in the request.
Deno.serve(async (req: Request) => {
    if (req.body === null) return CorsResponse()
    const [b1, b2] = req.body.tee()
    console.log(`Received Data from ${req.headers.get("origin")}: ${await decodeBody(b1)}`)
    return CorsResponse(b2)
})

// parses the body stream and returns a string value.
async function decodeBody(body: ReadableStream<Uint8Array>): Promise<String> {
    if (body === null) return ""
    const { value } = await body.getReader().read()
    return new TextDecoder().decode(value)
}

// sets the appropriate headers for the browser to be able to fetch
function CorsResponse(body: BodyInit|null = null): Response {
    const resp = new Response(body)
    resp.headers.set("Access-Control-Allow-Origin", "*")
    resp.headers.set("Access-Control-Allow-Methods", "*")
    resp.headers.set("Access-Control-Allow-Headers", "*")
    return resp
}