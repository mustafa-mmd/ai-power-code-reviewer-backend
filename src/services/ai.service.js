const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

if (!process.env.GOOGLE_GEMINI_KEY) {
  throw new Error("GOOGLE_GEMINI_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // ✅ Recommended: use available model
  systemInstruction: `
    You are an expert code reviewer with 7+ years of experience. Review the user's code for:
    - Code quality, bugs, performance, security, readability, and best practices.
    Respond with a markdown-formatted code review.
  `
});

async function generateContent(prompt) {
  try {
    console.log("📩 Sending prompt to Gemini:", prompt);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      console.error("❌ Gemini returned empty text.");
      throw new Error("Empty response from AI");
    }

    console.log("✅ Gemini response:", text);
    return text;

  } catch (err) {
    console.error("❌ Error in generateContent:", err.message);
    console.error(err); // log full stack
    throw new Error("Something went wrong while processing the review");
  }
}

module.exports = generateContent;
