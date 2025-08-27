export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      content: {
        Row: {
          code: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          last_modified_at: string | null
          page: string
          section: string
          title: string | null
          updated_at: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          last_modified_at?: string | null
          page: string
          section: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          last_modified_at?: string | null
          page?: string
          section?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      email_verification_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string
          id: string
          used: boolean
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          expires_at: string
          id?: string
          used?: boolean
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          used?: boolean
          user_id?: string
        }
        Relationships: []
      }
      file_history: {
        Row: {
          change_description: string | null
          content: string
          created_at: string | null
          file_id: string
          id: string
          size_bytes: number | null
          user_id: string
          version_number: number
        }
        Insert: {
          change_description?: string | null
          content: string
          created_at?: string | null
          file_id: string
          id?: string
          size_bytes?: number | null
          user_id: string
          version_number: number
        }
        Update: {
          change_description?: string | null
          content?: string
          created_at?: string | null
          file_id?: string
          id?: string
          size_bytes?: number | null
          user_id?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "file_history_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "file_system_items"
            referencedColumns: ["id"]
          },
        ]
      }
      file_sync_status: {
        Row: {
          created_at: string | null
          file_id: string | null
          id: string
          is_synced: boolean | null
          last_modified_at: string | null
          last_synced_at: string | null
          session_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          file_id?: string | null
          id?: string
          is_synced?: boolean | null
          last_modified_at?: string | null
          last_synced_at?: string | null
          session_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          file_id?: string | null
          id?: string
          is_synced?: boolean | null
          last_modified_at?: string | null
          last_synced_at?: string | null
          session_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "file_sync_status_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "file_sync_status_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      file_system_items: {
        Row: {
          content: string | null
          created_at: string | null
          encoding: string | null
          id: string
          is_binary: boolean | null
          is_hidden: boolean | null
          is_readonly: boolean | null
          language: string | null
          last_accessed_at: string | null
          name: string
          parent_id: string | null
          path: string
          project_id: string
          size_bytes: number | null
          sort_order: number | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          encoding?: string | null
          id?: string
          is_binary?: boolean | null
          is_hidden?: boolean | null
          is_readonly?: boolean | null
          language?: string | null
          last_accessed_at?: string | null
          name: string
          parent_id?: string | null
          path: string
          project_id: string
          size_bytes?: number | null
          sort_order?: number | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          encoding?: string | null
          id?: string
          is_binary?: boolean | null
          is_hidden?: boolean | null
          is_readonly?: boolean | null
          language?: string | null
          last_accessed_at?: string | null
          name?: string
          parent_id?: string | null
          path?: string
          project_id?: string
          size_bytes?: number | null
          sort_order?: number | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "file_system_items_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "file_system_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "file_system_items_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      personal_files: {
        Row: {
          created_at: string
          file_extension: string
          file_size_bytes: number
          id: string
          original_filename: string
          processed_md_content: string | null
          updated_at: string
          upload_status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_extension: string
          file_size_bytes: number
          id?: string
          original_filename: string
          processed_md_content?: string | null
          updated_at?: string
          upload_status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_extension?: string
          file_size_bytes?: number
          id?: string
          original_filename?: string
          processed_md_content?: string | null
          updated_at?: string
          upload_status?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          admin_level: number
          created_at: string
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          admin_level?: number
          created_at?: string
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          admin_level?: number
          created_at?: string
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      recent_files: {
        Row: {
          file_id: string
          id: string
          last_opened_at: string | null
          open_count: number | null
          user_id: string
        }
        Insert: {
          file_id: string
          id?: string
          last_opened_at?: string | null
          open_count?: number | null
          user_id: string
        }
        Update: {
          file_id?: string
          id?: string
          last_opened_at?: string | null
          open_count?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recent_files_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "file_system_items"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          last_activity: string | null
          pod_name: string
          session_id: string
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_activity?: string | null
          pod_name: string
          session_id: string
          status: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_activity?: string | null
          pod_name?: string
          session_id?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_codes: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_default_project_structure: {
        Args: { project_uuid: string }
        Returns: undefined
      }
      debug_rls_setup: {
        Args: Record<PropertyKey, never>
        Returns: {
          policy_check: string
          policy_cmd: string
          policy_name: string
          table_name: string
        }[]
      }
      get_file_tree: {
        Args: { project_uuid: string }
        Returns: {
          id: string
          name: string
          parent_id: string
          path: string
          size_bytes: number
          sort_order: number
          type: string
          updated_at: string
        }[]
      }
      test_authenticated_operations: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      test_rls_policies: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      user_owns_project: {
        Args: { project_uuid: string }
        Returns: boolean
      }
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
  public: {
    Enums: {},
  },
} as const