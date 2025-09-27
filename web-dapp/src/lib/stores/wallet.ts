import { writable, type Writable } from 'svelte/store';

export type WalletInfo = {
	address?: string;
	coinPublicKey?: string;
	encryptionPublicKey?: string;
	balance?: string;
};

export const wallet: Writable<any | null> = writable(null);
export const walletInfo: Writable<WalletInfo | null> = writable(null);

export async function connectWallet() {
	if (window.midnight && window.midnight.mnLace) {
		const mnLace = window.midnight.mnLace;
		const walletApi = await mnLace.enable();
		wallet.set(walletApi);
		const state = await walletApi.state();
		const config = await mnLace.serviceUriConfig();
		walletInfo.set(state);
	} else {
		alert('Please install the Lace wallet to connect to Midnight.');
	}
}

export function disconnectWallet() {
	wallet.set(null);
	walletInfo.set(null);
}
