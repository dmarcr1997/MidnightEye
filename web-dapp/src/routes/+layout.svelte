<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import WalletButton from '$lib/components/WalletButton.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<header style="display:flex;justify-content:space-between;align-items:center;padding:0.5rem 1rem;background:#111827;color:white">
  <div>MidnightEye</div>
  <div>
    <WalletButton />
  </div>
</header>

<main style="padding:1rem">
  {@render children?.()}
</main>
