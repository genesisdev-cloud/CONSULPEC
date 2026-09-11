import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const canonicalHost = 'consulpec.com.py';

export function proxy(request: NextRequest) {
  if (request.nextUrl.hostname !== `www.${canonicalHost}`) {
    return NextResponse.next();
  }

  const canonicalUrl = request.nextUrl.clone();
  canonicalUrl.protocol = 'https';
  canonicalUrl.hostname = canonicalHost;

  return NextResponse.redirect(canonicalUrl, 308);
}
