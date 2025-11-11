import express from "express";
import OpenAI from "openai";

const app = express();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", async (req, res) => {
  const text = req.query.text;
  if (!text) return res.send("Escribe algo después del comando, bro 😎");

  try {
    const completion = await client.responses.create({
      model: "gpt-4o-mini",
      input: `Responde de forma breve, natural y divertida como si fueras un streamer de Twitch: ${text}`,
    });

    const respuesta = completion.output[0].content[0].text;
    res.send(respuesta.slice(0, 400)); // Nightbot permite hasta 400 caracteres
  } catch (error) {
    console.error(error);
    res.send("Hubo un error con la IA 😅");
  }
});

app.listen(3000, () => console.log("✅ Servidor de IA listo"));
