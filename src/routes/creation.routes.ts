import { JSONSchema, JSONSchemaObject } from "openai/lib/jsonschema.mjs";
import openai from "../services/openai.services";
import { Router } from "express";



const completition = async (name: string, desciption: string, songs: Array<Object>)=>{
    const prompt = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'system', content: 'Given the following JSON object that represents a playlist,\
                 create a prompt for dalle-3 that generates a cover image for the playlist.\
                  Include styles, colors, and other relevant information, that might be available in the song list.\
                  Use prompting techniques to guide the model to generate a cover image that is visually appealing.'
            },
            {
                role: 'user',
                content: JSON.stringify({
                    name: name,
                    description: desciption,
                    songs: songs
                })
            }

            
        ],
        response_format:{
            type: 'json_schema',
            json_schema: {
                name: 'prompt-schema',
                schema: {
                    type: 'object',
                    properties: {
                        prompt: {
                            desciption: 'The prompt for dalle-3 to generate the cover image',
                            type: 'string'
                        },
                        model:{
                            description: 'The model to use for generating the cover image',
                            type: 'string'
                        },
                        quality:{
                            description: 'The quality of the generated cover image',
                            type: 'string',
                            default: 'hd'
                        },
                        size:{
                            description: 'The size of the generated cover image',
                            type: 'string',
                            default: '256x256'
                        }
                    },
                    additionalProperties: false
                }
            }
        }
    }).then((response) => {
        imageGeneration(response.choices[0]);
    }
    );
}

const imageGeneration = async (prompt: any) => {
    const response = await openai.images.generate({
        prompt: `${prompt}`,
        quality: "hd",
        size: "256x256"
    });
    return response;

};

const router = Router();



router.get('', (req, res) => {
    // Aqui debe estar el middleware que extraiga el json de la playlist de spotify

    const playlist = req.body.playlist;
    try{
        imageGeneration(completition(playlist.name, playlist.description, playlist.songs)).then((response) => {
            res.status(200).send(response.data[0].url);
        }
    )} catch(error){
        res.status(500).send(error);
    }
});

export default router;















