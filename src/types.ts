type VCardData = Array<JSONData>

interface JSONData {
    [key: string]: string | number | boolean | null
}

export type {
    VCardData,
    JSONData
}