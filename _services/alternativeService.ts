import { ALTERNATIVES_TABLE, Row } from "@libs/supabase/supabase"
import { supabaseClient } from "@libs/supabase/supabase-client"

class AlternativeService {
  async getAllAlternatives() {
    console.log("getAllAlternatives")

    const { data } = await supabaseClient
      .from(ALTERNATIVES_TABLE)
      .select("*")
      .returns<Row<typeof ALTERNATIVES_TABLE>[]>()
      .throwOnError()

    if (data === null) {
      throw new Error(`No alternatives exist.`)
    }

    return data
  }
}

const alternativeService = new AlternativeService()
export default alternativeService
