import { createClient } from "@/lib/supabase/server";

export async function selectTicketByQr(qrPayload: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("qr_payload", qrPayload)
    .single();

  if (error) throw error;
  return data;
}

export async function markTicketUsed(ticketId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tickets")
    .update({ status: "used", used_at: new Date().toISOString() })
    .eq("id", ticketId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
