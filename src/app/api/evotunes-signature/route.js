import { NextResponse } from 'next/server';

export async function POST(request) {
	try {
		const body = await request.json();

		if (
			!body.signOff ||
			!body.fullName ||
			!body.positionTitle ||
			!body.phoneNumber ||
			!body.companyName ||
			!body.websiteUrl
		) {
			return NextResponse.json(
				{ data: 'Please fill out all fields' },
				{ status: 400 }
			);
		}

		return NextResponse.json({
			signOff: body.signOff,
			fullName: body.fullName,
			positionTitle: body.positionTitle,
			phoneNumber: body.phoneNumber,
			companyName: body.companyName,
			websiteUrl: body.websiteUrl,
		});
	} catch (error) {
		return NextResponse.json(
			{ error: 'Invalid request body' },
			{ status: 400 }
		);
	}
}
