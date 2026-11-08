/** Convex function references from the local modules. Regenerate with Convex codegen. */
import { anyApi } from "convex/server";
import type { ApiFromModules, FilterApi, FunctionReference } from "convex/server";
import type * as leads from "../leads";
import type * as organizations from "../organizations";
const fullApi: ApiFromModules<{ leads: typeof leads; organizations: typeof organizations }> = anyApi as never;
export const api: FilterApi<typeof fullApi, FunctionReference<any, "public">> = anyApi as never;
export const internal: FilterApi<typeof fullApi, FunctionReference<any, "internal">> = anyApi as never;
