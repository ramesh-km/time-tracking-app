import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTimeEntry } from "../lib/api/time-entries";
import { mutationKeys, queryKeys } from "../lib/react-query-keys";

function useDeleteTimeEntry(options?: Parameters<typeof useMutation>[0]) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: [mutationKeys.deleteTimeEntry],
    mutationFn: deleteTimeEntry,
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.allCurrentWeekEntries]);
      queryClient.invalidateQueries([queryKeys.getTimeEntriesReport]);
    },
  });

  return mutation;
}

export default useDeleteTimeEntry;
