export type OrderStatus = "pending" | "preparing" | "served" | "paid" | "cancelled";
export type PaymentMethod = "airtel" | "moov" | "cash" | "card";
export type UserRole = "client" | "waiter" | "barman" | "manager" | "security";
export type TableStatus = "free" | "occupied" | "reserved" | "calling";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          phone: string | null;
          display_name: string;
          role: UserRole;
          avatar_url: string | null;
          loyalty_points: number;
          loyalty_tier: string;
          referral_code: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      establishments: {
        Row: {
          id: string;
          name: string;
          address: string;
          city: string;
          image_url: string | null;
          is_open: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["establishments"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["establishments"]["Insert"]>;
      };
      tables: {
        Row: {
          id: string;
          establishment_id: string;
          number: number;
          seats: number;
          status: TableStatus;
          zone: string;
        };
        Insert: Omit<Database["public"]["Tables"]["tables"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["tables"]["Insert"]>;
      };
      menu_items: {
        Row: {
          id: string;
          establishment_id: string;
          name: string;
          description: string;
          price: number;
          category: string;
          emoji: string;
          tag: string | null;
          available: boolean;
          stock: number | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["menu_items"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["menu_items"]["Insert"]>;
      };
      orders: {
        Row: {
          id: string;
          establishment_id: string;
          table_id: string;
          table_number: number;
          client_id: string | null;
          waiter_id: string | null;
          waiter_name: string;
          status: OrderStatus;
          total_amount: number;
          client_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          menu_item_id: string | null;
          name: string;
          emoji: string;
          quantity: number;
          unit_price: number;
        };
        Insert: Omit<Database["public"]["Tables"]["order_items"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["order_items"]["Insert"]>;
      };
      payments: {
        Row: {
          id: string;
          order_id: string;
          amount: number;
          method: PaymentMethod;
          phone: string | null;
          status: string;
          transaction_id: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["payments"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>;
      };
      chat_messages: {
        Row: {
          id: string;
          establishment_id: string;
          table_number: number;
          from_role: "client" | "staff";
          sender_name: string;
          text: string;
          read: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["chat_messages"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["chat_messages"]["Insert"]>;
      };
      referrals: {
        Row: {
          id: string;
          referrer_id: string;
          referred_name: string;
          status: string;
          points_earned: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["referrals"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["referrals"]["Insert"]>;
      };
      promos: {
        Row: {
          id: string;
          code: string;
          discount: number;
          discount_type: string;
          max_usage: number;
          usage_count: number;
          category: string;
          description: string;
          expires_at: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["promos"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["promos"]["Insert"]>;
      };
    };
  };
}
