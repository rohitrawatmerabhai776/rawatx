import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";

/**
 * Core backend hook — returns the actor instance and loading state.
 * Use this for raw access when no specialized hook exists.
 */
export function useBackend() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, isLoading: isFetching };
}

/**
 * Hook to check if the backend actor is ready to accept calls.
 */
export function useBackendReady() {
  const { actor, isFetching } = useActor(createActor);
  return { ready: !!actor && !isFetching };
}
