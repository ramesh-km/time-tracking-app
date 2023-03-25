import { useQuery } from "@tanstack/react-query";
import { getTimeEntry } from "../lib/api/time-entries";
import { queryKeys } from "../lib/react-query-keys";

function useGetTimeEntry(id: number) {
  const query = useQuery({
    queryKey: [queryKeys.getTimeEntry, id],
    queryFn: () => getTimeEntry(id),
    suspense: true,
  });

  return query;
}

export default useGetTimeEntry;
