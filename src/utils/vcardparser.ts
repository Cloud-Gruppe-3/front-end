import type { JSONData, VCardData} from '../types'

/* 
    Function to parse vcard files into json format
    Will loop over all lines and then split the lines on a semicolon,
    ignoring all lines starting or ending a vcard
    Will set the key and value of each object to the content of the vcard
*/
const VCardToJSON = async (vcard: string): Promise<VCardData> => {
    try {
        // Splits vcard on each new line
        const lines = vcard.split('\n') 

        // Intializing the data variable to be an empty array of vcard json objects
        const data: VCardData = [] 

        // Initializing the temp object to an empty object, where both key and value are strings
        let tempObject:JSONData = {}

        // Looping over all lines in the file
        for (const line of lines) {

            // Removing all whitespace from lines
            const trimmedLine = line.trim() 

            // Checks if it is the end of the file
            if(trimmedLine.startsWith(' ')) break

            // Skips over lines that starts a vcard
            if (trimmedLine.startsWith('BEGIN:VCARD')) continue 

            // If it is the end of the vcard, push the temp object to the data array
            // and clear the value of the temp object
            if(trimmedLine.startsWith('END:VCARD')) {
                data.push(tempObject)
                tempObject = {}

                // Continues to loop, if the next line is empty it will break
                continue
            }

            // Setting the key and value variables to the contents of the line, split on a semicolon
            const [key, value] = trimmedLine.split(':', 2) 

            if(!key || !value) 
                throw new Error('Incorrect string format')

            // Setting the tempobjects key and value to the values of the line content
            tempObject[key] = value 
        }

        // Returns the array of json vcard objects 
        return data 
    } catch (error) {
        throw error 
    }
}


const JSONToVCard = async (jsonObj: JSONData, file: string): Promise<void> => {
    try {
        const vcard = `BEGIN:VCARD\n${Object.entries(jsonObj)
            .filter(([key]) => key !== '_id')
            .map(([key, value]) => `${key}:${value}`)
            .join('\n')}\nEND:VCARD` 

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(vcard));
        element.setAttribute('download', file);
        
        element.style.display = 'none';
        document.body.appendChild(element);
        
        element.click();
        
        document.body.removeChild(element);
    } catch (error) {
        throw error
    }
}

export {
    VCardToJSON,
    JSONToVCard
}