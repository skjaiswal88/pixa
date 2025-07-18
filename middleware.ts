import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/clerk",
  "/api/webhooks/stripe",
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return;

  return auth().then((authResult) => {
    if (!authResult.userId) {
      // ✅ FIX: use clone() on the Response to avoid the "immutable" error
      const signInUrl = new URL("/sign-in", req.url);
      return Response.redirect(signInUrl).clone();
    }
  });
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
