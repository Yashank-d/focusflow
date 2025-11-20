import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  const userId = session.user.id;

  try {
    const { clientId, name, email } = await request.json();

    if (!clientId) {
      return NextResponse.json(
        { ok: false, message: 'Client ID is required' },
        { status: 400 }
      );
    }

    // --- SECURITY CHECK ---
    // Ensure this client belongs to the logged-in user before updating
    const existingClient = await prisma.client.findFirst({
      where: {
        id: clientId,
        userId: userId,
      },
    });

    if (!existingClient) {
      return NextResponse.json(
        { ok: false, message: 'Client not found or you do not have permission.' },
        { status: 404 }
      );
    }
    // --- END SECURITY CHECK ---

    const updatedClient = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        name: name,
        email: email,
      },
    });

    return NextResponse.json(updatedClient);
  } catch (error) {
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      errorMessage = 'A client with this email already exists.';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json(
      { ok: false, message: 'Failed to update client.', error: errorMessage },
      { status: 500 }
    );
  }
}