const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv")
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = '"è consigliato comprare bitcoin ora? se vuoi ti do i valori del grafico così potresti fare una previsione "';

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
