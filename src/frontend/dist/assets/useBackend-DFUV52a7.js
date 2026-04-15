import { u as useActor, c as createActor } from "./backend-DR4VLygV.js";
import "./index-icaUxuqU.js";
function useBackend() {
  const { actor, isFetching } = useActor(createActor);
  return { actor, isLoading: isFetching };
}
export {
  useBackend as u
};
