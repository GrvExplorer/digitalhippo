export interface PaymentOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  image: string;
  handler: (response: any) => void;
  prefill: {
      name: string;
      email: string;
      contact: string;
  };
  notes: {
      address: string;
  };
  theme: {
      color: string;
  };
}