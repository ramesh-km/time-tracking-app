import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTimeEntry } from "../lib/api/time-entries";
import { mutationKeys, queryKeys } from "../lib/react-query-keys";

function useUpdateTimeEntry() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: [mutationKeys.updateTimeEntry],
    mutationFn: updateTimeEntry,
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKeys.allCurrentWeekEntries]);
      queryClient.invalidateQueries([queryKeys.getTimeEntriesReport]);
      queryClient.invalidateQueries([queryKeys.getTimeEntry, data.id]);
    },
  });

  return mutation;
}

export default useUpdateTimeEntry;
