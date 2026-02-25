import { NextRequest, NextResponse } from "next/server";

/**
 * App Router middleware that uses NextRequest-specific APIs.
 * This tests that the middleware receives a NextRequest (not a plain Request).
 */
export default function proxy(request: NextRequest) {
    // Test NextRequest.nextUrl - this would fail with TypeError if request is plain Request
    const { pathname } = request.nextUrl;

    // Test NextRequest.cookies - this would fail with TypeError if request is plain Request
    const sessionToken = request.cookies.get("session");

    const response = NextResponse.next();

    // Add headers to prove middleware ran and NextRequest APIs worked
    response.headers.set("x-mw-pathname", pathname);
    response.headers.set("x-mw-ran", "true");

    if (sessionToken) {
        response.headers.set("x-mw-has-session", "true");
    }

    // Redirect /middleware-redirect to /about (with cookie, like OpenNext)
    if (pathname === "/middleware-redirect") {
        return NextResponse.redirect(new URL("/about", request.url), {
            headers: { "set-cookie": "middleware-redirect=success; Path=/" },
        });
    }

    // Rewrite /middleware-rewrite to render / content (URL stays the same)
    if (pathname === "/middleware-rewrite") {
        return NextResponse.rewrite(new URL("/", request.url));
    }

    // Rewrite with custom status code
    if (pathname === "/middleware-rewrite-status") {
        return NextResponse.rewrite(new URL("/", request.url), {
            status: 403,
        });
    }

    // Block /middleware-blocked with custom response
    if (pathname === "/middleware-blocked") {
        return new Response("Blocked by middleware", { status: 403 });
    }

    // Throw an error to test that middleware errors return 500, not bypass auth
    if (pathname === "/middleware-throw") {
        throw new Error("middleware crash");
    }

    // Forward search params as a header for RSC testing
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(
        "x-search-params",
        `mw/${request.nextUrl.searchParams.get("searchParams") || ""}`,
    );
    const r = NextResponse.next({
        request: { headers: requestHeaders },
    });
    r.headers.set("x-mw-pathname", pathname);
    r.headers.set("x-mw-ran", "true");
    if (sessionToken) {
        r.headers.set("x-mw-has-session", "true");
    }
    return r;
}

export const config = {
    matcher: [
        "/about",
        "/middleware-redirect",
        "/middleware-rewrite",
        "/middleware-rewrite-status",
        "/middleware-blocked",
        "/middleware-throw",
        "/search-query",
        "/",
    ],
};
