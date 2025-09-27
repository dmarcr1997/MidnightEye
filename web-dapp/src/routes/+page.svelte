<script lang="ts">
	import UploadImage from '$lib/components/UploadImage.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<section style="margin-top:1rem">
	<h2>Upload an image to IPFS</h2>
	<UploadImage on:uploaded={(e) => console.log('uploaded', e.detail)} />
</section>
