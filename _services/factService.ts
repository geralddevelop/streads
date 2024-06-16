import { FACTS_TABLE, Row } from "@libs/supabase/supabase"
import { supabaseClient } from "@libs/supabase/supabase-client"

class FactService {
  async getAllFacts() {
    console.log("getAllFacts")

    const { data } = await supabaseClient
      .from(FACTS_TABLE)
      .select("*")
      .returns<Row<typeof FACTS_TABLE>[]>()
      .throwOnError()

    if (data === null) {
      throw new Error(`No facts exist.`)
    }

    return data
  }
}

const factService = new FactService()
export default factService
