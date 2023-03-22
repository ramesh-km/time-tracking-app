import { useMutation } from "@tanstack/react-query";
import { deleteTimeEntry } from "../lib/api/time-entries";
import { mutationKeys } from "../lib/react-query-keys";

function useDeleteTimeEntry(options?: Parameters<typeof useMutation>[0]) {
  const mutation = useMutation({
    mutationKey: [mutationKeys.deleteTimeEntry],
    mutationFn: deleteTimeEntry,
    ...options,
  });

  return mutation;
}

export default useDeleteTimeEntry;
