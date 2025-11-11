const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  try {

    console.log("🔑 API Key detectada:", process.env.OPENAI_API_KEY ? "Sí" : "No");
    const { msg } = req.query;

    if (!msg) {
      return res.status(400).send("Falta el parámetro 'msg'.");
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ Falta la API key en las variables de entorno");
      return res.status(500).send("Error: falta configuración del servidor.");
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Eres un bot simpático de Twitch, responde corto y directo." },
        { role: "user", content: msg },
      ],
    });

    const respuesta = completion.choices[0]?.message?.content || "No entendí eso 😅";
    res.status(200).send(respuesta);
  } catch (err) {
    console.error("🔥 Error en el servidor:", err);
    res.status(500).send("Error interno del servidor.");
  }
};

