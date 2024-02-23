/// <reference types="vite/client"/>

interface importMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_CHAT_URL: string
}

interface ImportData{
    readonly env: importMetaEnv
}