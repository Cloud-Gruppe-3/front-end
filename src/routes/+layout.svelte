<script>
    import '@picocss/pico'
</script>

<main>    
    <slot />
</main>

<style>
    main {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>