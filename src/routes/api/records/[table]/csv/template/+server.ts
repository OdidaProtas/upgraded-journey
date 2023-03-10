//@ts-nocheck
import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';
import type { RequestEvent } from '../$types';

export async function GET(event: RequestEvent) {
	const { params, url, request } = event;
	const tableName = params.table;

	const take = url.searchParams.get('take');
	const skip = url.searchParams.get('skip');

	const excludeFields = url.searchParams.get('exclude-fields');
	const apiKey = request.headers.get('x-api-key');
	const authorization = request.headers.get('authorization');

	if (!apiKey) throw error(403, 'Api key / authorization token required');

	const token = new Token();

	// @ts-ignore
	const space = locals.space;

	let table;
	if (take && skip)
		table = await prisma.spaceTable.findFirst({
			where: {
				name: tableName,
				spaceId: space?.id
			},
			include: {
				columns: true
			}
		});
	else
		table = await prisma.spaceTable.findFirst({
			where: {
				name: tableName,
				spaceId: space?.id
			},
			include: {
				columns: true
			}
		});

	const excluded: string[] = JSON.parse(excludeFields ?? '[]');

	const headerArray =
		table?.columns.filter((col) => !excluded.includes(col.fieldName)).map((col) => col.fieldName) ??
		[];
	const headers = headerArray.reduce((prev, curr, index) => {
		if (index === headerArray.length) {
			return (
				prev +
				`${curr}
			`
			);
		}
		return prev + `${curr},`;
	}, '');

	const csv = headers;

	return new Response(JSON.stringify(csv));
}
