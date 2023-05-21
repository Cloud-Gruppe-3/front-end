<script lang="ts">
	import axios from 'axios';
    import { JSONToVCard, VCardToJSON } from '../utils/vcardparser'
    import { BarLoader } from 'svelte-loading-spinners';
    import type {JSONData} from '../types'

    let fileContents: string = ''
    let isLoading: boolean = false

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

        try {
            const data = await axios.post('https://cache-server-production.up.railway.app/api/contacts', {filedata})
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    const downloadVcard = async () => {
        try {
            isLoading = true
            console.log('download vcard')
            
            // TODO: Need to get the proper link to get all vCards
            const json: JSONData = await axios.get('https://cache-server-production.up.railway.app/api/contacts')
            
            // 
            await JSONToVCard(json, 'contacts')
        } catch (error) {
            console.log(error)
        } finally {
            isLoading = false
        }   
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

    <form on:submit|preventDefault={downloadVcard}>
        <label for="downloadButton">Download all vCards in zip archive</label>
        <input 
            type="submit" 
            value="Download" 
            name="downloadButton"
            disabled={isLoading}>
        {#if isLoading}
            <BarLoader size="240" color="#3170A8"/>
        {/if}
    </form>

    <!-- <form action="/api/contacts/vcard" method="POST">
        <label for="downloadButton">Download all vCards as single .vcf file</label>
        <input type="submit" value="Download" name="downloadButton">
    </form> -->
</section>