<script lang="ts">
  import { onMount } from 'svelte';
  import { wallet, walletInfo, connectWallet, disconnectWallet } from '$lib/stores/wallet';
  import { get } from 'svelte/store';

  let connected = false;
  let info = null;

  const unsubscribe = wallet.subscribe((w) => {
    connected = !!w;
  });
  const unsubscribeInfo = walletInfo.subscribe((i) => (info = i));

  onMount(() => {
    return () => {
      unsubscribe();
      unsubscribeInfo();
    };
  });

  async function handleConnect() {
    try {
      await connectWallet();
    } catch (e) {
      console.error('Failed to connect wallet', e);
      alert('Failed to connect wallet: ' + (e?.message || e));
    }
  }

  function handleDisconnect() {
    disconnectWallet();
  }
</script>

<style>
  .wallet-btn { padding: 0.4rem 0.8rem; border-radius: 6px; background: #1f2937; color: white; }
  .wallet-info { margin-left: 0.5rem; font-size: 0.9rem; }
</style>

{#if connected}
  <div style="display:flex;align-items:center">
    <button class="wallet-btn" on:click={handleDisconnect}>Disconnect</button>
    <div class="wallet-info">
      {#if info?.address}
        <div>{info.address}</div>
      {/if}
      {#if info?.coinPublicKey}
        <div style="font-size:0.8rem;color:#9CA3AF">coinPub: {info.coinPublicKey.slice(0,8)}…</div>
      {/if}
    </div>
  </div>
{:else}
  <button class="wallet-btn" on:click={handleConnect}>Connect Wallet</button>
{/if}
