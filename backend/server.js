// 1. Load environment variables first
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const Groq = require("groq-sdk");
const { createClient } = require('@supabase/supabase-js');

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// 3. Clean and Validate Keys
const sbUrl = process.env.SUPABASE_URL?.trim();
const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const groqKey = process.env.GROQ_API_KEY?.trim();

console.log("\n--- STARTUP STATUS ---");
console.log(`📡 Supabase URL: ${sbUrl ? "✅ Found" : "❌ MISSING"}`);
console.log(`🔑 Supabase Key: ${sbKey ? `✅ Found (Len: ${sbKey.length})` : "❌ MISSING"}`);
console.log(`🤖 Groq Key:     ${groqKey ? "✅ Found" : "❌ MISSING"}`);
console.log("----------------------\n");

// 4. Initialize Clients (ONLY ONCE)
const groq = new Groq({ apiKey: groqKey });
const supabase = createClient(sbUrl, sbKey);

// 5. AI Logic
async function extractTaskInfo(userMessage) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a student assistant. Extract task and deadline. Return ONLY JSON: {\"task_name\": \"string\", \"deadline\": \"ISO-8601\"}. If no task found, set task_name to 'none'."
            },
            { role: "user", content: userMessage }
        ],
        model: "llama-3.3-70b-versatile",
        response_format: { type: "json_object" }
    });
    return JSON.parse(chatCompletion.choices[0].message.content);
}

// 6. The Webhook Route
app.post('/webhook', async (req, res) => {
    const message = req.body.Body || req.body.message;
    const sender = req.body.From || req.body.sender;

    if (!message) return res.status(400).send("No message found");

    console.log(`📩 Incoming: "${message}" from ${sender}`);

    try {
        const aiData = await extractTaskInfo(message);
        console.log("🤖 AI Extracted:", aiData);

        if (aiData.task_name === 'none') {
            res.set('Content-Type', 'text/xml');
            return res.send(`<Response><Message>Hi! Try saying: "Remind me to submit the lab record tomorrow at 2pm."</Message></Response>`);
        }

        // Save to Database
        const { error } = await supabase
            .from('student_tasks')
            .insert([{ 
                task_name: aiData.task_name, 
                deadline: aiData.deadline, 
                user_phone: sender 
            }]);

        if (error) {
            console.error("❌ Supabase Insert Error:", error.message);
            throw error;
        }

        const responseDate = new Date(aiData.deadline).toLocaleString();
        const replyText = `✅ Task Saved!\n\n📝: ${aiData.task_name}\n📅: ${responseDate}`;

        res.set('Content-Type', 'text/xml');
        res.send(`<Response><Message>${replyText}</Message></Response>`);

    } catch (err) {
        console.error("❌ Processing Error:", err.message);
        res.status(500).send("Error processing request");
    }
});

app.listen(PORT, () => {
    console.log(`🚀 STUDENT BRAIN ACTIVE ON PORT ${PORT}\n`);
});
console.log("Supabase URL:", sbUrl);