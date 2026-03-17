// 1. Load the environment tool
const dotenv = require('dotenv');
const path = require('path');

// 2. Manually point to the .env file in the current folder
const result = dotenv.config({ path: path.join(__dirname, '.env') });

if (result.error) {
    console.error("❌ ERROR: Could not find .env file! Make sure it is inside the 'backend' folder.");
    process.exit(1);
}

// 3. Imports
const express = require('express');
const cors = require('cors');
const Groq = require("groq-sdk");
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 4. Initialize Clients ONLY after we confirmed .env is loaded
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// 5. AI Extraction Function
async function extractTaskInfo(userMessage) {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a student assistant. Extract task and deadline. Return ONLY JSON: {\"task_name\": \"string\", \"deadline\": \"ISO-8601\"}"
            },
            { role: "user", content: userMessage }
        ],
        model: "llama3-8b-8192",
        response_format: { type: "json_object" }
    });
    return JSON.parse(chatCompletion.choices[0].message.content);
}

// 6. Webhook Route
app.post('/webhook', async (req, res) => {
    const { message, sender } = req.body;
    console.log(`📩 Message: ${message}`);
    try {
        const aiData = await extractTaskInfo(message);
        const { error } = await supabase.from('student_tasks').insert([
            { task_name: aiData.task_name, deadline: aiData.deadline, user_phone: sender }
        ]);
        if (error) throw error;
        res.status(200).json({ status: "success", reply: `Scheduled: ${aiData.task_name}` });
    } catch (err) {
        console.error("❌ Error:", err.message);
        res.status(500).json({ status: "error" });
    }
});

app.listen(PORT, () => {
    console.log(`\n🚀 SERVER RUNNING ON PORT ${PORT}`);
    console.log(`✅ GROQ KEY LOADED: ${process.env.GROQ_API_KEY ? "YES" : "NO"}`);
});