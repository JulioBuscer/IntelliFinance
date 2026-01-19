'use server'
import { cookies } from "next/headers";
import { createClient } from "../lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "../components/ui/button";

const page = async () => {
  const cookieStore = await cookies();
  console.log(cookieStore)
  const supabase = await createClient();
  const { data: {user} } = await supabase.auth.getUser();
  console.log(user)
  return (
    <div>Hola {user?.email}</div>
  )
}

export default page