import OpenAI from "openai";
import { config } from "dotenv";

config();

const openai = new OpenAI({
    organization: process.env.OPENAI_ORGANIZATION_COVERCRAFT,
    project: process.env.OPENAI_PROJECT_COVERCRAFT,
    apiKey: process.env.OPENAI_API_KEY_COVERCRAFT
});

export default openai;