import type { AIParamter } from "../models/AI"

const baidu = "Baidu"
const gemini = "Gemini"
const openai = "OpenAI"

const baiduParameters:AIParamter[] = [
    {
        title:"baidu api key",
        param:"baidu_api_key"
    },{
        title:"baidu api secret",
        param:"baidu_api_secret"
    }
]
const geminiParameters:AIParamter[] = [
    {
        title:"gemini api key",
        param:"gemini_api_key"
    }
]
const openAIParameters:AIParamter[] = [
    {
        title:"openAI base URL",
        param:"openai_base_url"
    },{
        title:"openAI model",
        param:"openai_model"
    },{
        title:"openAI api key",
        param:"openai_api_key"
    }
]

const AIProviders = [baidu,gemini,openai]

const defaultProvider = baidu
const defaultParameter = baiduParameters

export {
    baidu,
    gemini,
    openai,
    defaultProvider,
    AIProviders,
    baiduParameters,
    geminiParameters,
    openAIParameters,
    defaultParameter
}