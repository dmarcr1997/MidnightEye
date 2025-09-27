import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';

// Helper to create wallet and midnight provider
export const createWalletAndMidnightProvider = async (wallet) => {
	const state = await Rx.firstValueFrom(wallet.state());
	return {
		coinPublicKey: state.coinPublicKey,
		encryptionPublicKey: state.encryptionPublicKey,
		balanceTx(tx, newCoins) {
			// Implementation for balancing transactions
		},
		submitTx(tx) {
			// Implementation for submitting transactions
		}
	};
};

// Main configureProviders function
export const configureProviders = async (wallet, config) => {
	const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);

	// Create zkConfigProvider only on the server to avoid bundling Node built-ins
	let zkConfigProvider = undefined;
	if (
		typeof import.meta !== 'undefined' &&
		(import.meta as any).env &&
		(import.meta as any).env.SSR
	) {
		// Use a dynamic import and hint Vite not to pre-bundle browser chunks for this.
		const mod = await import(
			/* @vite-ignore */ '@midnight-ntwrk/midnight-js-node-zk-config-provider'
		);
		const NodeZkConfigProvider = mod && (mod.NodeZkConfigProvider || mod.default);
		zkConfigProvider = new NodeZkConfigProvider(config.contract.zkConfigPath);
	}

	return {
		privateStateProvider: levelPrivateStateProvider({
			privateStateStoreName: config.contract.privateStateStoreName
		}),
		publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
		zkConfigProvider,
		proofProvider: httpClientProofProvider(config.proofServer),
		walletProvider: walletAndMidnightProvider,
		midnightProvider: walletAndMidnightProvider
	};
};
