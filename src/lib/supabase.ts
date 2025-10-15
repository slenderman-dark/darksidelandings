import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o formulário
export interface FormSubmission {
  id?: string
  nome_completo: string
  email: string
  cpf: string
  endereco: string
  bairro: string
  cep: string
  cidade: string
  estado: string
  celular: string
  turma: string
  autoriza_emails: boolean
  created_at?: string
}