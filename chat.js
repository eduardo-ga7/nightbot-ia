import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { msg } = req.query;

  if (!msg) {
    return res.status(400).send("Falta el mensaje (?msg=...)");
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Eres un asistente simpático para Twitch." },
        { role: "user", content: msg },
      ],
    });

    const respuesta = completion.choices[0].message.content;
    res.status(200).send(respuesta);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en el servidor o en la API.");
  }
}
