import { VCardToJSON, JSONToVCard } from "../utils/vcardparser";

test('Check that vcards converts to json', async () => {
    
    let result = await VCardToJSON(`BEGIN:VCARD
    VERSION:3.0
    N:LastName1;FirstName1;;;
    FN:FirstName1 LastName1
    TEL;TYPE=CELL:555-123-4567
    EMAIL:john.doe@example.com
    END:VCARD`)

    expect(result).toEqual([
        {
            "EMAIL": 'john.doe@example.com',
            "FN": 'FirstName1 LastName1',
            "N": 'LastName1;FirstName1;;;',
            "TEL;TYPE=CELL": '555-123-4567',
            "VERSION": '3.0',
        },
    ])
    
    await expect(async () => {
        await VCardToJSON('random test string');
    }).rejects.toThrowError();
})