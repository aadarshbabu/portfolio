import { NextResponse } from 'next/server';

export async function POST(request) {
	try {
		const body = await request.json();

		if (!body.prefix || !body.icon) {
			return NextResponse.json(
				{ data: 'Please fill out both fields' },
				{ status: 400 }
			);
		}

		return NextResponse.json({
			prefix: body.prefix,
			icon: body.icon,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: 'Invalid request body' },
			{ status: 400 }
		);
	}
}
