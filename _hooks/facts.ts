import { ExtractFnReturnType } from "@libs/react-query/react-query"
import { FACTS_TABLE } from "@libs/supabase/supabase"
import factService from "@services/factService"
import { useQuery } from "react-query"

export const useGetAllFacts = () =>
  useQuery<ExtractFnReturnType<typeof factService.getAllFacts>>({
    queryKey: [FACTS_TABLE],
    queryFn: () => factService.getAllFacts()
  })
