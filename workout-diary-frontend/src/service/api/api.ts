import {TrainingProgramRequest} from "@component/types/workoutTypes";

interface Api {
    baseUrl: string,
    headers: HeadersInit
}

class Api {

    constructor(baseUrl: string, headers: HeadersInit) {
        this.baseUrl = baseUrl;
        this.headers = headers
    }

    async get(url: string) {
        return await fetch(this.baseUrl + url, {
            method: "GET",
            headers: this.headers
        }).then(res => res.json())
    }

    async post(url: string, body: object) {
        return await fetch(this.baseUrl + url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    }

    async patch(url: string, body: object) {
        return await fetch(this.baseUrl + url, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(body)
        }).then(res => res.json())
    }
}

const $api = new Api('http://localhost:3001',
    {
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': '*'
    }
)

export default $api;