import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { Readable } from 'stream';
import { PinataSDK } from 'pinata';

const pinata = new PinataSDK({
	pinataJwt: env.PINATA_JWT!,
	pinataGateway: 'crimson-quick-mouse-118.mypinata.cloud'
});

async function main() {
	try {
		const file = new File(['hello world!'], 'hello.txt', { type: 'text/plain' });
		const upload = await pinata.upload.public.file(file);
		console.log(upload);
	} catch (error) {
		console.log(error);
	}
}

await main();

export const POST: RequestHandler = async ({ request }) => {
	try {
		const form = await request.formData();
		const file = form.get('file') as File | null;
		console.log('Received file for upload:', file);
		if (!file) {
			return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
		}

		const upload = await pinata.upload.public.file(file);
		console.log(upload);

		return new Response(JSON.stringify(upload), { status: 200 });
	} catch (err: any) {
		console.error('Pinata upload failed', err);
		return new Response(JSON.stringify({ error: err?.message || String(err) }), { status: 500 });
	}
};
