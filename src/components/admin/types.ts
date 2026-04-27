export interface Message {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  companyType: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Portfolio {
  id: number;
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
  content: { type: string; src: string }[];
  createdAt: string;
}

export interface ContentItem {
  type: string;
  src: string;
}
