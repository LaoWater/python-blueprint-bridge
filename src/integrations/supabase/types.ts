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
            referencedRelation: "file_system_items"
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
      group_projects: {
        Row: {
          created_at: string | null
          created_by: string | null
          current_participants: number | null
          description: string | null
          difficulty_level: number
          end_date: string | null
          id: string
          max_participants: number | null
          name: string
          project_data: Json | null
          project_type: string
          start_date: string | null
          status: string
          updated_at: string | null
          vote_score: number | null
          votes_down: number | null
          votes_up: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          current_participants?: number | null
          description?: string | null
          difficulty_level: number
          end_date?: string | null
          id?: string
          max_participants?: number | null
          name: string
          project_data?: Json | null
          project_type?: string
          start_date?: string | null
          status?: string
          updated_at?: string | null
          vote_score?: number | null
          votes_down?: number | null
          votes_up?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          current_participants?: number | null
          description?: string | null
          difficulty_level?: number
          end_date?: string | null
          id?: string
          max_participants?: number | null
          name?: string
          project_data?: Json | null
          project_type?: string
          start_date?: string | null
          status?: string
          updated_at?: string | null
          vote_score?: number | null
          votes_down?: number | null
          votes_up?: number | null
        }
        Relationships: []
      }
      personal_files: {
        Row: {
          created_at: string
          file_extension: string
          file_size_bytes: number
          id: string
          last_password_attempt: string | null
          original_filename: string
          password_hash: string | null
          password_protected: boolean | null
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
          last_password_attempt?: string | null
          original_filename: string
          password_hash?: string | null
          password_protected?: boolean | null
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
          last_password_attempt?: string | null
          original_filename?: string
          password_hash?: string | null
          password_protected?: boolean | null
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
          avatar_url: string | null
          created_at: string
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          admin_level?: number
          avatar_url?: string | null
          created_at?: string
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          admin_level?: number
          avatar_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      project_participants: {
        Row: {
          contribution_score: number | null
          experience_level: number | null
          id: string
          joined_at: string | null
          last_activity_at: string | null
          preferred_skills: Json | null
          project_id: string
          role: string | null
          status: string
          team_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          contribution_score?: number | null
          experience_level?: number | null
          id?: string
          joined_at?: string | null
          last_activity_at?: string | null
          preferred_skills?: Json | null
          project_id: string
          role?: string | null
          status?: string
          team_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          contribution_score?: number | null
          experience_level?: number | null
          id?: string
          joined_at?: string | null
          last_activity_at?: string | null
          preferred_skills?: Json | null
          project_id?: string
          role?: string | null
          status?: string
          team_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_participants_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "group_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_participants_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "project_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tasks: {
        Row: {
          actual_hours: number | null
          assigned_to: string | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          deliverables: Json | null
          depends_on: Json | null
          description: string | null
          due_date: string | null
          estimated_hours: number | null
          id: string
          priority: string | null
          progress_percentage: number | null
          project_id: string
          required_skills: Json | null
          started_at: string | null
          status: string
          task_type: string | null
          team_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          actual_hours?: number | null
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          deliverables?: Json | null
          depends_on?: Json | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: string | null
          progress_percentage?: number | null
          project_id: string
          required_skills?: Json | null
          started_at?: string | null
          status?: string
          task_type?: string | null
          team_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          actual_hours?: number | null
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          deliverables?: Json | null
          depends_on?: Json | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          priority?: string | null
          progress_percentage?: number | null
          project_id?: string
          required_skills?: Json | null
          started_at?: string | null
          status?: string
          task_type?: string | null
          team_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "group_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tasks_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "project_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      project_teams: {
        Row: {
          color_scheme: string | null
          created_at: string | null
          current_members: number | null
          deliverables: Json | null
          description: string | null
          difficulty_stars: number
          icon: string | null
          id: string
          max_members: number | null
          mission: string
          name: string
          project_id: string
          required_skills: Json | null
          sort_order: number | null
          tasks: Json | null
          team_vibe: string | null
          updated_at: string | null
        }
        Insert: {
          color_scheme?: string | null
          created_at?: string | null
          current_members?: number | null
          deliverables?: Json | null
          description?: string | null
          difficulty_stars: number
          icon?: string | null
          id?: string
          max_members?: number | null
          mission: string
          name: string
          project_id: string
          required_skills?: Json | null
          sort_order?: number | null
          tasks?: Json | null
          team_vibe?: string | null
          updated_at?: string | null
        }
        Update: {
          color_scheme?: string | null
          created_at?: string | null
          current_members?: number | null
          deliverables?: Json | null
          description?: string | null
          difficulty_stars?: number
          icon?: string | null
          id?: string
          max_members?: number | null
          mission?: string
          name?: string
          project_id?: string
          required_skills?: Json | null
          sort_order?: number | null
          tasks?: Json | null
          team_vibe?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_teams_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "group_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_votes: {
        Row: {
          created_at: string | null
          id: string
          project_id: string | null
          updated_at: string | null
          user_id: string | null
          vote_type: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          project_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          vote_type: string
        }
        Update: {
          created_at?: string | null
          id?: string
          project_id?: string | null
          updated_at?: string | null
          user_id?: string | null
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_votes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "group_projects"
            referencedColumns: ["id"]
          },
        ]
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
      quiz_attempts: {
        Row: {
          completed_at: string | null
          correct_answers: number | null
          created_at: string | null
          id: string
          is_completed: boolean | null
          passed: boolean | null
          quiz_id: string
          score: number | null
          started_at: string | null
          time_spent_seconds: number | null
          total_questions: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          correct_answers?: number | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          passed?: boolean | null
          quiz_id: string
          score?: number | null
          started_at?: string | null
          time_spent_seconds?: number | null
          total_questions?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          correct_answers?: number | null
          created_at?: string | null
          id?: string
          is_completed?: boolean | null
          passed?: boolean | null
          quiz_id?: string
          score?: number | null
          started_at?: string | null
          time_spent_seconds?: number | null
          total_questions?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          chapter: string | null
          code_snippet: string | null
          correct_answer: string
          created_at: string | null
          difficulty: string | null
          explanation: string | null
          id: string
          options: Json
          order_index: number | null
          points: number | null
          question_text: string
          question_type: string
          quiz_id: string
          updated_at: string | null
        }
        Insert: {
          chapter?: string | null
          code_snippet?: string | null
          correct_answer: string
          created_at?: string | null
          difficulty?: string | null
          explanation?: string | null
          id?: string
          options: Json
          order_index?: number | null
          points?: number | null
          question_text: string
          question_type: string
          quiz_id: string
          updated_at?: string | null
        }
        Update: {
          chapter?: string | null
          code_snippet?: string | null
          correct_answer?: string
          created_at?: string | null
          difficulty?: string | null
          explanation?: string | null
          id?: string
          options?: Json
          order_index?: number | null
          points?: number | null
          question_text?: string
          question_type?: string
          quiz_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_responses: {
        Row: {
          answered_at: string | null
          attempt_id: string
          created_at: string | null
          id: string
          is_correct: boolean
          question_id: string
          time_spent_seconds: number | null
          user_answer: string
        }
        Insert: {
          answered_at?: string | null
          attempt_id: string
          created_at?: string | null
          id?: string
          is_correct: boolean
          question_id: string
          time_spent_seconds?: number | null
          user_answer: string
        }
        Update: {
          answered_at?: string | null
          attempt_id?: string
          created_at?: string | null
          id?: string
          is_correct?: boolean
          question_id?: string
          time_spent_seconds?: number | null
          user_answer?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_responses_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "quiz_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          chapters: string[] | null
          created_at: string | null
          description: string | null
          difficulty: string | null
          id: string
          is_active: boolean | null
          passing_score: number | null
          time_limit_minutes: number | null
          title: string
          total_questions: number | null
          updated_at: string | null
        }
        Insert: {
          chapters?: string[] | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          is_active?: boolean | null
          passing_score?: number | null
          time_limit_minutes?: number | null
          title: string
          total_questions?: number | null
          updated_at?: string | null
        }
        Update: {
          chapters?: string[] | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          is_active?: boolean | null
          passing_score?: number | null
          time_limit_minutes?: number | null
          title?: string
          total_questions?: number | null
          updated_at?: string | null
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
      test_admin_interventions: {
        Row: {
          acknowledged_at: string | null
          admin_id: string
          content: string
          created_at: string | null
          id: string
          intervention_type: string
          student_acknowledged: boolean | null
          student_code_snapshot: string | null
          student_id: string
          test_id: string
        }
        Insert: {
          acknowledged_at?: string | null
          admin_id: string
          content: string
          created_at?: string | null
          id?: string
          intervention_type: string
          student_acknowledged?: boolean | null
          student_code_snapshot?: string | null
          student_id: string
          test_id: string
        }
        Update: {
          acknowledged_at?: string | null
          admin_id?: string
          content?: string
          created_at?: string | null
          id?: string
          intervention_type?: string
          student_acknowledged?: boolean | null
          student_code_snapshot?: string | null
          student_id?: string
          test_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_admin_interventions_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_admin_interventions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_admin_interventions_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
      }
      test_editor_sessions: {
        Row: {
          admin_intervention: Json | null
          admin_viewing: boolean | null
          created_at: string | null
          current_code: string | null
          cursor_position: Json | null
          disconnection_count: number | null
          id: string
          is_active: boolean | null
          keystrokes_count: number | null
          last_activity: string | null
          session_end: string | null
          session_start: string | null
          student_id: string
          submission_id: string | null
          test_id: string
          updated_at: string | null
        }
        Insert: {
          admin_intervention?: Json | null
          admin_viewing?: boolean | null
          created_at?: string | null
          current_code?: string | null
          cursor_position?: Json | null
          disconnection_count?: number | null
          id?: string
          is_active?: boolean | null
          keystrokes_count?: number | null
          last_activity?: string | null
          session_end?: string | null
          session_start?: string | null
          student_id: string
          submission_id?: string | null
          test_id: string
          updated_at?: string | null
        }
        Update: {
          admin_intervention?: Json | null
          admin_viewing?: boolean | null
          created_at?: string | null
          current_code?: string | null
          cursor_position?: Json | null
          disconnection_count?: number | null
          id?: string
          is_active?: boolean | null
          keystrokes_count?: number | null
          last_activity?: string | null
          session_end?: string | null
          session_start?: string | null
          student_id?: string
          submission_id?: string | null
          test_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "test_editor_sessions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_editor_sessions_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "test_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_editor_sessions_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
      }
      test_submissions: {
        Row: {
          alt_tab_count: number | null
          auto_graded_score: number | null
          code_content: string
          created_at: string | null
          feedback: string | null
          final_score: number | null
          graded_at: string | null
          graded_by: string | null
          id: string
          manual_graded_score: number | null
          paste_attempt_count: number | null
          started_at: string
          status: string | null
          student_id: string
          submitted_at: string | null
          suspicious_activity_log: Json | null
          test_id: string
          updated_at: string | null
        }
        Insert: {
          alt_tab_count?: number | null
          auto_graded_score?: number | null
          code_content: string
          created_at?: string | null
          feedback?: string | null
          final_score?: number | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          manual_graded_score?: number | null
          paste_attempt_count?: number | null
          started_at?: string
          status?: string | null
          student_id: string
          submitted_at?: string | null
          suspicious_activity_log?: Json | null
          test_id: string
          updated_at?: string | null
        }
        Update: {
          alt_tab_count?: number | null
          auto_graded_score?: number | null
          code_content?: string
          created_at?: string | null
          feedback?: string | null
          final_score?: number | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          manual_graded_score?: number | null
          paste_attempt_count?: number | null
          started_at?: string
          status?: string | null
          student_id?: string
          submitted_at?: string | null
          suspicious_activity_log?: Json | null
          test_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "test_submissions_graded_by_fkey"
            columns: ["graded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_submissions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_submissions_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "tests"
            referencedColumns: ["id"]
          },
        ]
      }
      tests: {
        Row: {
          allow_partial_submission: boolean | null
          closes_at: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          instructions: string
          max_alt_tab_warnings: number | null
          opens_at: string | null
          starter_code: string | null
          status: string | null
          test_cases: Json | null
          time_limit_minutes: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          allow_partial_submission?: boolean | null
          closes_at?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          instructions: string
          max_alt_tab_warnings?: number | null
          opens_at?: string | null
          starter_code?: string | null
          status?: string | null
          test_cases?: Json | null
          time_limit_minutes?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          allow_partial_submission?: boolean | null
          closes_at?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          instructions?: string
          max_alt_tab_warnings?: number | null
          opens_at?: string | null
          starter_code?: string | null
          status?: string | null
          test_cases?: Json | null
          time_limit_minutes?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tests_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      admin_cleanup_duplicate_attempts: {
        Args: { p_quiz_id: string; p_user_id: string }
        Returns: {
          deleted_count: number
        }[]
      }
      auto_close_expired_tests: { Args: never; Returns: undefined }
      cast_project_vote: {
        Args: { p_project_id: string; p_vote_type: string }
        Returns: Json
      }
      check_password_attempt_rate_limit: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      cleanup_expired_codes: { Args: never; Returns: undefined }
      create_default_project_structure: {
        Args: { project_uuid: string }
        Returns: undefined
      }
      debug_rls_setup: {
        Args: never
        Returns: {
          policy_check: string
          policy_cmd: string
          policy_name: string
          table_name: string
        }[]
      }
      get_active_test_for_student: {
        Args: { student_uuid: string }
        Returns: {
          submission_id: string
          test_id: string
          test_title: string
          time_remaining_minutes: number
        }[]
      }
      get_available_users: {
        Args: never
        Returns: {
          admin_level: number
          created_at: string
          id: string
          username: string
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
      get_live_test_monitoring: {
        Args: { test_uuid: string }
        Returns: {
          alt_tab_count: number
          current_code: string
          is_active: boolean
          keystrokes_count: number
          last_activity: string
          student_id: string
          student_username: string
          submission_status: string
        }[]
      }
      get_project_details: {
        Args: { project_uuid: string }
        Returns: {
          current_members: number
          difficulty_stars: number
          max_members: number
          project_description: string
          project_id: string
          project_name: string
          project_status: string
          sort_order: number
          team_color_scheme: string
          team_description: string
          team_icon: string
          team_id: string
          team_mission: string
          team_name: string
          team_tasks: Json
          team_vibe: string
        }[]
      }
      get_project_teams_with_members: {
        Args: { p_project_id: string }
        Returns: {
          members: Json
          team_color_scheme: string
          team_current_members: number
          team_deliverables: Json
          team_description: string
          team_difficulty_stars: number
          team_icon: string
          team_id: string
          team_max_members: number
          team_mission: string
          team_name: string
          team_required_skills: Json
          team_sort_order: number
          team_tasks: Json
          team_vibe: string
        }[]
      }
      get_team_members: {
        Args: { p_team_id: string }
        Returns: {
          admin_level: number
          avatar_data: Json
          avatar_url: string
          contribution_score: number
          joined_at: string
          role: string
          user_id: string
          username: string
        }[]
      }
      get_user_all_team_memberships: {
        Args: { p_project_id: string }
        Returns: {
          contribution_score: number
          joined_at: string
          role: string
          team_color_scheme: string
          team_icon: string
          team_id: string
          team_name: string
        }[]
      }
      get_user_avatar_data: {
        Args: { p_avatar_url: string; p_username: string }
        Returns: Json
      }
      get_user_project_vote: {
        Args: { p_project_id: string }
        Returns: {
          vote_type: string
          voted_at: string
        }[]
      }
      get_user_teams: {
        Args: { p_project_id: string }
        Returns: {
          joined_at: string
          team_color_scheme: string
          team_icon: string
          team_id: string
          team_name: string
        }[]
      }
      get_users_with_duplicate_attempts: {
        Args: never
        Returns: {
          attempt_count: number
          has_completed: boolean
          latest_attempt_at: string
          quiz_id: string
          quiz_title: string
          user_id: string
          username: string
        }[]
      }
      join_project_team: {
        Args: { p_project_id: string; p_team_id?: string }
        Returns: Json
      }
      leave_project_team: {
        Args: { p_project_id: string; p_team_id: string }
        Returns: Json
      }
      remove_project_vote: { Args: { p_project_id: string }; Returns: Json }
      test_authenticated_operations: { Args: never; Returns: string }
      test_rls_policies: { Args: never; Returns: string }
      user_owns_project: { Args: { project_uuid: string }; Returns: boolean }
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
