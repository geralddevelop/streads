import { ExtractFnReturnType } from "@libs/react-query/react-query"
import { ALTERNATIVES_TABLE } from "@libs/supabase/supabase"
import alternativeService from "@services/alternativeService"
import { useQuery } from "react-query"

export const useGetAllAlternatives = () =>
  useQuery<ExtractFnReturnType<typeof alternativeService.getAllAlternatives>>({
    queryKey: [ALTERNATIVES_TABLE],
    queryFn: () => alternativeService.getAllAlternatives()
  })
