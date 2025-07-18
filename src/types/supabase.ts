
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          details: Json | null
          id: number
          message: string
          timestamp: string | null
          type: string
        }
        Insert: {
          details?: Json | null
          id?: number
          message: string
          timestamp?: string | null
          type: string
        }
        Update: {
          details?: Json | null
          id?: number
          message?: string
          timestamp?: string | null
          type?: string
        }
        Relationships: []
      }
      admin_settings: {
        Row: {
          admin_password: string | null
          contact_email: string | null
          contact_phone: string | null
          default_price: number | null
          id: number
          max_participants: number | null
          whatsapp_link: string | null
        }
        Insert: {
          admin_password?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          default_price?: number | null
          id?: number
          max_participants?: number | null
          whatsapp_link?: string | null
        }
        Update: {
          admin_password?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          default_price?: number | null
          id?: number
          max_participants?: number | null
          whatsapp_link?: string | null
        }
        Relationships: []
      }
      newsletter_leads: {
        Row: {
          contacted_status: string | null
          date_added: string | null
          email: string
          id: number
          name: string | null
          notes: string | null
          phone: string | null
          source: string | null
        }
        Insert: {
          contacted_status?: string | null
          date_added?: string | null
          email: string
          id?: number
          name?: string | null
          notes?: string | null
          phone?: string | null
          source?: string | null
        }
        Update: {
          contacted_status?: string | null
          date_added?: string | null
          email?: string
          id?: number
          name?: string | null
          notes?: string | null
          phone?: string | null
          source?: string | null
        }
        Relationships: []
      }
      registrations: {
        Row: {
          amount: number | null
          email: string
          id: number
          name: string
          notes: string | null
          payment_status: string | null
          phone: string
          registration_date: string | null
          seminar_id: number | null
        }
        Insert: {
          amount?: number | null
          email: string
          id?: number
          name: string
          notes?: string | null
          payment_status?: string | null
          phone: string
          registration_date?: string | null
          seminar_id?: number | null
        }
        Update: {
          amount?: number | null
          email?: string
          id?: number
          name?: string
          notes?: string | null
          payment_status?: string | null
          phone?: string
          registration_date?: string | null
          seminar_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "registrations_seminar_id_fkey"
            columns: ["seminar_id"]
            isOneToOne: false
            referencedRelation: "seminars"
            referencedColumns: ["id"]
          },
        ]
      }
      seminars: {
        Row: {
          city: string
          created_at: string | null
          current_participants: number | null
          date: string
          id: number
          max_participants: number | null
          price: number
          special_notes: string | null
          status: string | null
          time_end: string
          time_start: string
          title: string | null
          venue_address: string | null
          venue_name: string
        }
        Insert: {
          city: string
          created_at?: string | null
          current_participants?: number | null
          date: string
          id?: number
          max_participants?: number | null
          price: number
          special_notes?: string | null
          status?: string | null
          time_end: string
          time_start: string
          title?: string | null
          venue_address?: string | null
          venue_name: string
        }
        Update: {
          city?: string
          created_at?: string | null
          current_participants?: number | null
          date?: string
          id?: number
          max_participants?: number | null
          price?: number
          special_notes?: string | null
          status?: string | null
          time_end?: string
          time_start?: string
          title?: string | null
          venue_address?: string | null
          venue_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
