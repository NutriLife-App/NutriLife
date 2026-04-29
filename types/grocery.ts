export type GroceryCategoryKey = 'produce' | 'protein' | 'pantry' | 'dairy' | 'extras';

export interface GroceryCategory {
  key: GroceryCategoryKey;
  label: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  categoryKey: GroceryCategoryKey;

  unitLabel: string; // e.g. "portion", "bag", "bottle"
  estimatedPrice: number; // mock-only, major currency units

  cheapestOfferLabel: string; // placeholder
  purchased: boolean;
}

