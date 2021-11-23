export enum Verbs {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export class FetchService {
    private static _instance: FetchService;

    private get headers(): HeadersInit {
        return {
            'Content-type': 'application-json'
        }
    }

    public static getInstance(): FetchService {
        if (!this._instance) {
            this._instance = new FetchService();
        }
        return this._instance;
    }

    private fetch(method: Verbs, url: string, body?: string): Promise<Response> {
        return fetch(url, {method, body, headers: this.headers})
    }

    public get(url: string): Promise<Response> {
        return this.fetch(Verbs.GET, url);
    }
    
    public post(url: string, body: string): Promise<Response> {
        return this.fetch(Verbs.POST, url, body);
    }

    public put(url: string, body: string): Promise<Response> {
        return this.fetch(Verbs.PUT, url, body);
    }

    public delete(url: string, body: string): Promise<Response> {
        return this.fetch(Verbs.DELETE, url, body);
    }
}