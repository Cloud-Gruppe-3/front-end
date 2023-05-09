<script lang="ts">
    import { VCardToJSON } from '../utils/vcardparser'

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
        console.log('handlesubmit')

        console.log(fileContents)

        const filedata = await VCardToJSON(fileContents)
        console.log(filedata)
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
        <input type="submit" value="Download" name="downloadButton">
    </form>

    <form action="/api/contacts/vcard" method="POST">
        <label for="downloadButton">Download all vCards as single .vcf file</label>
        <input type="submit" value="Download" name="downloadButton">
    </form>
</section>