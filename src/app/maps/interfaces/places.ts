export interface PlacesResponse {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:         string;
    type:       string;
    place_type: string[];
    relevance:  number;
    properties: Properties;
    text:       string;
    place_name: string;
    center:     number[];
    geometry:   Geometry;
    address?:   string;
    context:    Context[];
    bbox?:      number[];
}

export interface Context {
    id:          string;
    text:        string;
    wikidata?:   string;
    short_code?: ShortCode;
}

export enum ShortCode {
    Es = "es",
    EsCS = "ES-CS",
    EsV = "ES-V",
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    accuracy?: string;
    wikidata?: string;
}
