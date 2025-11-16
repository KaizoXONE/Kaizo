export interface User {
  id: number;
  username: string;
  email: string;
  character_name: string | null;
  money: number;
  bank_money: number;
  level: number;
  exp: number;
  playtime: number;
  admin_level: number;
  vip_level: number;
  vip_expire: string | null;
  skin_id: number;
  health: number;
  armor: number;
  job: string;
  faction: string;
  phone_number: string | null;
  last_login: string | null;
  created_at: string;
}

export interface Vehicle {
  id: number;
  owner_id: number;
  model_id: number;
  vehicle_name: string | null;
  plate: string;
  color1: number;
  color2: number;
  fuel: number;
  health: number;
  locked: boolean;
  price: number;
  created_at: string;
}

export interface ShopItem {
  id: number;
  item_name: string;
  item_type: 'vip' | 'vehicle' | 'money' | 'item' | 'weapon';
  description: string | null;
  price_idr: number;
  game_value: number | null;
  duration_days: number | null;
  stock: number;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  item_id: number;
  transaction_type: 'purchase' | 'refund';
  amount_idr: number;
  payment_method: string | null;
  payment_status: 'pending' | 'success' | 'failed' | 'refunded';
  transaction_id: string;
  notes: string | null;
  created_at: string;
}

export interface LeaderboardEntry {
  id: number;
  username: string;
  character_name: string | null;
  money: number;
  level: number;
  playtime: number;
  vip_level: number;
}
