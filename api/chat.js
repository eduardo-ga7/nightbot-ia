const OpenAI = require("openai");

module.exports = async (req, res) => {
  console.log("📩 Nueva petición recibida");
  console.log("🧠 Clave API presente:", !!process.env.OPENAI_API_KEY);

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).send("Falta OPENAI_API_KEY en el servidor");
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const { msg } = req.query;
    console.log("🗨️ Mensaje recibido:", msg);

    if (!msg) {
      return res.status(400).send("Falta parámetro msg");
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // usa este modelo por compatibilidad
      messages: [
        { role: "system", content: "Eres un bot simpático para Twitch. Responde corto y directo." },
        { role: "user", content: msg },
      ],
    });

    console.log("✅ Respuesta generada correctamente");
    const respuesta = completion.choices[0].message.content;
    res.status(200).send(respuesta);
  } catch (error) {
    console.error("🔥 Error detectado:", error);
    res.status(500).send(`Error interno: ${error.message}`);
  }
};

