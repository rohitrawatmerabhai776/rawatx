import type { Principal } from "@icp-sdk/core/principal";

export interface User {
  id: Principal;
  username: string;
  displayName: string;
  bio: string;
  profilePhoto: string;
  followersCount: bigint;
  followingCount: bigint;
  coinsBalance: bigint;
  createdAt: bigint;
}

export interface Video {
  id: string;
  userId: Principal;
  username: string;
  displayName: string;
  profilePhoto: string;
  videoUrl: string;
  thumbnailUrl: string;
  caption: string;
  hashtags: string[];
  likesCount: bigint;
  commentsCount: bigint;
  viewsCount: bigint;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: bigint;
}

export interface Comment {
  id: string;
  videoId: string;
  userId: Principal;
  username: string;
  profilePhoto: string;
  text: string;
  likesCount: bigint;
  createdAt: bigint;
}

export interface Coin {
  userId: Principal;
  balance: bigint;
  totalEarned: bigint;
  totalSpent: bigint;
  lastUpdated: bigint;
}

export interface Transaction {
  id: string;
  userId: Principal;
  type: "earn" | "spend" | "withdraw";
  amount: bigint;
  description: string;
  status: "pending" | "completed" | "failed";
  createdAt: bigint;
}

export interface WithdrawalRequest {
  id: string;
  userId: Principal;
  amountCoins: bigint;
  amountInr: number;
  upiId: string;
  status: "pending" | "processing" | "completed" | "rejected";
  createdAt: bigint;
  processedAt?: bigint;
}

export interface ChatMessage {
  id: string;
  senderId: Principal;
  receiverId: Principal;
  text: string;
  imageUrl?: string;
  seen: boolean;
  createdAt: bigint;
}

export interface EarnActivity {
  id: string;
  type: "watch_ad" | "daily_login" | "referral" | "video_views";
  coinsEarned: bigint;
  description: string;
  completedAt: bigint;
}

export type NavTab = "home" | "search" | "create" | "earn" | "profile";
