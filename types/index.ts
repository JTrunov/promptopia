export interface PromptType {
  _id: string;
  creator: UserType;
  prompt: string;
  tag: string;
  __v: number;
}

export interface UserType {
  _id: string;
  email: string;
  username: string;
  image: string;
  __v: number;
}

export interface PromptCardListProps {
  data: PromptType[];
  handleTagClick: (post: PromptType) => void;
}

export interface PromptCardProps {
  post: PromptType;
  handleTagClick?: (post: PromptType) => void;
  handleEdit?: () => void;
  handleDelete?: () => Promise<void>;
}

export interface FormProps {
  type: string;
  post: PromptType;
  setPost: any;
  submitting: boolean;
  handleSubmit: any;
}

export interface ProfileProps {
  name: string;
  desc: string;
  data: PromptType[];
  handleEdit: (post: PromptType) => void;
  handleDelete: (post: PromptType) => Promise<void>;
}
