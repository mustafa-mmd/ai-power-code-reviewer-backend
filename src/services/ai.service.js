const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// ✅ 1. Check API key
if (!process.env.GOOGLE_GEMINI_KEY) {
  throw new Error("GOOGLE_GEMINI_KEY is not defined in environment variables.");
}

// ✅ 2. Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

// ✅ 3. Use the correct model name and syntax
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  systemInstruction: `
    You are an expert code reviewer with 7+ years of experience.
    Review the user's code for:
    - Code quality, potential bugs, performance, readability, and best practices.
    Respond with clear markdown-formatted feedback.
  `
});

// ✅ 4. Fixed function
async function generateContent(prompt) {
  try {
    console.log("📩 Sending prompt to Gemini:", prompt);

    // Correct call syntax for newer SDK versions
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    });

    const text = result.response.text();

    if (!text) {
      console.error("❌ Gemini returned empty text.");
      throw new Error("Empty response from Gemini API");
    }

    console.log("✅ Gemini response received successfully.");
    return text;

  } catch (err) {
    console.error("❌ Gemini API error:", err.response?.data || err.message);
    console.error(err); // log full details for Render logs
    throw new Error("Something went wrong while processing the review");
  }
}

module.exports = generateContent;

