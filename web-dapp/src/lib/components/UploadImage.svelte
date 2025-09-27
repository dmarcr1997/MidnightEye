<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let fileInput: HTMLInputElement | null = null;
  let uploading = false;
  let ipfsHash: string | null = null;
  let selectedName: string | null = null;

  async function upload() {
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) return;
    const file = fileInput.files[0];
    uploading = true;
    ipfsHash = null;

    try {
      const form = new FormData();
      form.append('file', file, file.name);
      const res = await fetch('/api/pinata', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || JSON.stringify(data));
      console.log("RETURNED", data)
      ipfsHash = data.IpfsHash || data.ipfs_hash || data.hash || data.cid || null;
      dispatch('uploaded', { ipfsHash, raw: data });
    } catch (e:any) {
      alert('Upload failed: ' + (e?.message || e));
      console.error(e);
    } finally {
      uploading = false;
    }
  }

  function onFileChange() {
    selectedName = fileInput?.files && fileInput.files.length > 0 ? fileInput.files[0].name : null;
  }
</script>

<style>
  .uploader { display:flex; gap:0.5rem; align-items:center; }
  .file-input { display: none; }
  .file-btn {
    padding: 0.4rem 0.8rem;
    background-color: #111827; /* dark */
    color: #fff;
    border-radius: 6px;
    cursor: pointer;
    border: none;
    font-size: 0.95rem;
  }
  .selected-name { font-size: 0.9rem; color: #374151 }
  img.preview { max-width:200px; margin-top:0.5rem; border-radius:8px }
</style>


<div class="uploader">
  <input id="fileInput" class="file-input" bind:this={fileInput} type="file" accept="image/*" on:change={onFileChange} />
  <label for="fileInput" class="file-btn">Choose file</label>
  {#if selectedName}
    <div class="selected-name">{selectedName}</div>
  {/if}
  <button class="file-btn"on:click={upload} disabled={uploading}> {uploading ? 'Uploading…' : 'Upload to IPFS'} </button>
</div>

{#if ipfsHash}
  <div style="margin-top:0.5rem">
    Uploaded: <a target="_blank" rel="noreferrer" href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}>{ipfsHash}</a>
    <div>
      <img class="preview" src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} alt="uploaded" />
    </div>
  </div>
{/if}
