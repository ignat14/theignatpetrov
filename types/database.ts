export interface Database {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          company: string | null
          subject: string
          message: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          company?: string | null
          subject: string
          message: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          company?: string | null
          subject?: string
          message?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}