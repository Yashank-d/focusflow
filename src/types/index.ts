export interface Client {
  id: string;
  email: string | null;
  name: string | null;
  userId: string;
}

export interface ProjectWithClient {
  id: string;
  title: string;
  status: string;
  invoiceAmount: number;
  clientId: string;
  client: Client;
  deliveryLink: string;
  sampleImageUrls: string;
}
