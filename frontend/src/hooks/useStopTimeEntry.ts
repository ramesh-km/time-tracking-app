import { useMutation, useQueryClient } from "@tanstack/react-query";
import { stopTimeEntry } from "../lib/api/time-entries";
import { mutationKeys, queryKeys } from "../lib/react-query-keys";

function useStopTimeEntry() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: [mutationKeys.stopTimeEntry],
    mutationFn: stopTimeEntry,
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.allCurrentWeekEntries]);
      queryClient.invalidateQueries([queryKeys.getTimeEntriesReport]);
    },
  });

  return mutation;
}

export default useStopTimeEntry;
