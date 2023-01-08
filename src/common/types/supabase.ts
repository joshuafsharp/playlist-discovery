export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // eslint-disable-next-line no-unused-vars
      [_ in never]: never;
    };
    Views: {
      // eslint-disable-next-line no-unused-vars
      [_ in never]: never;
    };
    Functions: {
      // eslint-disable-next-line no-unused-vars
      [_ in never]: never;
    };
    Enums: {
      // eslint-disable-next-line no-unused-vars
      [_ in never]: never;
    };
  };
}
