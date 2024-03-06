export interface ICategory {
  categoryName: string;
  createdBy: {
    _id: string;
    userName: string;
    id: string;
  };
  deletedBy?: {
    _id: string | null;
    userName: string | null;
    id: string | null;
  };
  id: string;
  image: string;
  updatedBy?: {
    _id: string | null;
    userName: string | null;
    id: string | null;
  };
  _id: string;
}
