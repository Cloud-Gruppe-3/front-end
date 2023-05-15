<script lang="ts">
	import axios from 'axios';
    import { JSONToVCard, VCardToJSON } from '../utils/vcardparser'
    import type {JSONData} from '../types'

    let fileContents: string = ''

    const handleFileChange = (event: any) => {
        const target = event.target as HTMLInputElement
        const file = target.files && target.files[0]
        
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const contents = event.target?.result as string
            fileContents = contents
        }

        reader.readAsText(file)
    }

    const handleSubmit = async () => {

        // Get json data from vcard files passed in form
        const filedata = await VCardToJSON(fileContents)

        // TODO: Need to send request with filedata insted
        console.log(filedata)
    }

    const downloadVcard = async () => {

        // TODO: Need to get the proper link to get all vCards
        const json: JSONData = await axios.get('api link')

        // 
        await JSONToVCard(json, 'test')
    }
</script>


<section>
    <h1>Accepting v-cards 😉</h1>
    <form on:submit|preventDefault={handleSubmit}>
        <input 
            on:change={handleFileChange}
            type="file" 
            name="file" 
            id="fileInput" 
            accept=".vcf"
            >

        <input type="submit" id="submitButton" value="Send File">
    </form>

    <form action="/api/contacts/zip" method="POST">
        <label for="downloadButton">Download all vCards in zip archive</label>
        <input 
            on:click={downloadVcard}
            type="submit" 
            value="Download" 
            name="downloadButton">
    </form>

    <!-- <form action="/api/contacts/vcard" method="POST">
        <label for="downloadButton">Download all vCards as single .vcf file</label>
        <input type="submit" value="Download" name="downloadButton">
    </form> -->
</section>