interface Review {
  review_id: number;
  ip_name: string;
  ip_id: string;
  ip_type?: string;
  content: string;
  created_at: Date;
}

interface Argument {
  argument_id?: number;
  topic: string;
  ip_name: string;
  ip_type?: string;
  ip_id: string;
  created_at: Date;
  author_id?: string;
  profile_image?: string;
}

interface ArgumentComment {
  argument_id: number;
  topic: string;
  ip_name: string;
  ip_type?: string;
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

interface SavedClips {
  ip_id: string;
  ip_name: string;
  ip_type?: "season" | "episode" | "movie";
  poster_path: string;
  summary?: string;
  upstream_ip_name?: string | null;
}

// interface IdentityData {
//   avatar_url: string;
//   email: string;
//   email_verified: boolean;
//   full_name: string;
//   iss: string;
//   name?: string;
//   phone_verified?: boolean;
//   picture?: string;
//   preferred_username?: string;
//   provider_id?: string;
//   sub?: string;
// }

// interface Identity {
//   identity_id: string;
//   id: string;
//   user_id: string;
//   identity_data: IdentityData;
//   provider: string;
//   created_at: string;
//   last_sign_in_at: string;
//   updated_at: string;
// }

// interface AppMetadata {
//   provider: string;
//   providers: string[];
// }

// interface User {
//   id: string;
//   aud: string;
//   role: string;
//   email: string;
//   email_confirmed_at: string;
//   phone: string;
//   confirmed_at: string;
//   created_at: string;
//   updated_at: string;
//   last_sign_in_at: string;
//   is_anonymous: boolean;
//   app_metadata: AppMetadata;
//   identities: Identity[];
//   user_metadata: UserMetadata;
// }

interface MySavedCounts {
  reviewCount: number | null;
  discussCount: number | null;
  clipCount: number | null;
}

interface Notification {
  id: number;
  user_id: string;
  ip_id: string;
  ip_type: "movie" | "episode" | "season";
  ip_name: string;
  event_type: string;
  message: string;
  created_at: Date;
  is_read: boolean;
}
