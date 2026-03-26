import { createClient } from "@/lib/supabase/server";

export async function insertTicket(ticket: {
  event_id: string;
  qr_payload: string;
  holder_email: string;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tickets")
    .insert(ticket)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function selectTicketsByEvent(eventId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("event_id", eventId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function selectTicketById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}
