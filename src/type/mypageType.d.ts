interface Review {
  review_id: number;
  ip_name: string;
  ip_id: string;
  ip_type: string;
  content: string;
  created_at: Date;
}


interface Argument {
  argument_id: number;
  topic: string;
  ip_name: string;
  ip_type: string;
  ip_id: string;
  created_at: Date;
  author_id: string;
  profile_image: string;
}

interface ArgumentComment {
  argument_id: number;
  topic: string;
  ip_name: string;
  ip_type: string;
  ip_id: string;
  comment: string;
  comment_created_at: Date;
  comment_author_id: string;
}

interface ArgumentComment {
  argument_id: number;
  topic: string;
  ip_name: string;
  ip_type: string;
  ip_id: string;
  comment: string;
  comment_created_at: Date;
  comment_author_id: string;
}