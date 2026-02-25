declare module "next/link" {
  import type { ComponentType, AnchorHTMLAttributes, ReactNode } from "react";
  interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    href: string | { pathname?: string; query?: Record<string, string> };
    as?: string;
    replace?: boolean;
    prefetch?: boolean;
    scroll?: boolean;
    children?: ReactNode;
  }
  const Link: ComponentType<LinkProps>;
  export default Link;
}

declare module "next/navigation" {
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
  export function useParams<T = Record<string, string | string[]>>(): T;
  export function useRouter(): {
    push(href: string, options?: { scroll?: boolean }): void;
    replace(href: string, options?: { scroll?: boolean }): void;
    back(): void;
    forward(): void;
    refresh(): void;
    prefetch(href: string): void;
  };
  export function redirect(url: string, type?: "replace" | "push"): never;
  export function permanentRedirect(url: string): never;
  export function notFound(): never;
}

declare module "next/headers" {
  export function headers(): Promise<Headers>;
  export function cookies(): Promise<any>;
  export function draftMode(): Promise<{ isEnabled: boolean }>;
}

declare module "next/server" {
  export class NextRequest extends Request {
    get nextUrl(): any;
    get cookies(): any;
    get ip(): string | undefined;
    get geo(): { city?: string; country?: string; region?: string; latitude?: string; longitude?: string } | undefined;
  }
  export class NextResponse<Body = unknown> extends Response {
    get cookies(): any;
    static json<T>(body: T, init?: ResponseInit): NextResponse<T>;
    static redirect(url: string | URL, init?: number | ResponseInit): NextResponse;
    static rewrite(destination: string | URL, init?: ResponseInit & { request?: { headers: Headers } }): NextResponse;
    static next(init?: ResponseInit & { request?: { headers: Headers } }): NextResponse;
  }
  export function userAgent(req: { headers: Headers }): any;
  export function userAgentFromString(ua: string | undefined): any;
  export function after<T>(task: Promise<T> | (() => T | Promise<T>)): void;
  export function connection(): Promise<void>;
  export const URLPattern: typeof globalThis.URLPattern;
  export type NextMiddleware = (request: NextRequest, event: any) => any;
}
