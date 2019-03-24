export type UserType = {
  email: string;
};

export type TipType = {
  user: UserType;
  id: string;
  slug: string;
  title: string;
  description: string;
};
