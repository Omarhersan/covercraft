import { JSONSchema, JSONSchemaObject } from "openai/lib/jsonschema.mjs";
import openai from "../services/openai.services";
import { Router } from "express";
import exp from "constants";



const completition = async (name: string, desciption: string, songs: Array<Object>)=>{
    await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'system', content: 'Given the following JSON object that represents a playlist,\
                 create a prompt for dalle-3 that generates a cover image for the playlist'
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
    });
}

const imageGeneration = async (requestObject: any) => {
    const { prompt, model } = requestObject;
    const response = await openai.images.generate({
        model: `${model}`,
        prompt: `${prompt}`,
        quality: "hd",
        size: "256x256"
    });
    return response;

};

const router = Router();



router.get('', (req, res) => {
    // Aqui debe estar el middleware que extraiga el json de la playlist de spotify

    // Mock de un JSON de una playlist
    let playlist = {
        name: 'My Playlist',
        description: 'This is a playlist of my favorite songs',
        songs: [
            {
                name: 'Song 1',
                artist: 'Artist 1'
            },
            {
                name: 'Song 2',
                artist: 'Artist 2'
            },
            {
                name: 'Song 3',
                artist: 'Artist 3'
            }
        ]
    }
    imageGeneration(completition(playlist.name, playlist.description, playlist.songs)).then((response) => {
        res.send(response.data[0].url);
    });
});

export default router;















