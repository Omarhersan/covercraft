import OpenAI from "openai";
import { config } from "dotenv";

config();

const openai = new OpenAI({
    organization: process.env.ORIGANIZATION_ID_COVERCRAFT,
    project: process.env.OPENAI_PROJECT_COVERCRAFT,
    apiKey: process.env.OPENAI_KEY_COVERCRAFT
});



export default openai;