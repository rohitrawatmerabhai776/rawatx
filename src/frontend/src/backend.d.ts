import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export type CommentId = bigint;
export interface Comment {
    id: CommentId;
    authorId: UserId;
    createdAt: Timestamp;
    text: string;
    videoId: VideoId;
}
export type WithdrawalId = bigint;
export interface UserProfilePublic {
    bio: string;
    username: string;
    displayName: string;
    userId: UserId;
    createdAt: Timestamp;
    avatarStorageKey?: ExternalBlob;
    isPrivate: boolean;
    followerCount: bigint;
    followingCount: bigint;
}
export type UserId = Principal;
export interface WithdrawalRequestPublic {
    id: WithdrawalId;
    status: WithdrawalStatus;
    userId: UserId;
    createdAt: Timestamp;
    rupeeAmount: bigint;
}
export interface VideoPublic {
    id: VideoId;
    isPublished: boolean;
    hashtags: Array<string>;
    createdAt: Timestamp;
    storageKey: ExternalBlob;
    caption: string;
    commentsCount: bigint;
    likesCount: bigint;
    viewsCount: bigint;
    uploaderId: UserId;
}
export type VideoId = bigint;
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum WithdrawalStatus {
    pending = "pending",
    completed = "completed"
}
export interface backendInterface {
    addComment(videoId: VideoId, text: string): Promise<Comment>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createWithdrawalRequest(rupeeAmount: bigint): Promise<WithdrawalRequestPublic>;
    followUser(userId: UserId): Promise<boolean>;
    getCallerUserProfile(): Promise<UserProfilePublic | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCoinBalance(): Promise<bigint>;
    getComments(videoId: VideoId): Promise<Array<Comment>>;
    getFeed(offset: bigint, limit: bigint): Promise<Array<VideoPublic>>;
    getFollowers(userId: UserId): Promise<Array<UserProfilePublic>>;
    getFollowing(userId: UserId): Promise<Array<UserProfilePublic>>;
    getLikeCount(videoId: VideoId): Promise<bigint>;
    getMyReferralCode(): Promise<string>;
    getRupeeEquivalent(coins: bigint): Promise<bigint>;
    getTrendingHashtags(limit: bigint): Promise<Array<[string, bigint]>>;
    getUserProfile(userId: UserId): Promise<UserProfilePublic | null>;
    getUserVideos(userId: UserId): Promise<Array<VideoPublic>>;
    getVideo(videoId: VideoId): Promise<VideoPublic | null>;
    getWithdrawalHistory(): Promise<Array<WithdrawalRequestPublic>>;
    isCallerAdmin(): Promise<boolean>;
    isFollowing(userId: UserId): Promise<boolean>;
    markWithdrawalCompleted(withdrawalId: WithdrawalId): Promise<boolean>;
    recordAdWatch(): Promise<bigint>;
    recordDailyLogin(): Promise<bigint>;
    recordReferralReward(referrerCode: string): Promise<boolean>;
    recordVideoView(videoId: VideoId): Promise<void>;
    saveCallerUserProfile(displayName: string, username: string, bio: string, isPrivate: boolean): Promise<void>;
    searchUsers(searchTerm: string): Promise<Array<UserProfilePublic>>;
    toggleLike(videoId: VideoId): Promise<boolean>;
    unfollowUser(userId: UserId): Promise<boolean>;
    updateCallerAvatar(avatar: ExternalBlob): Promise<void>;
    uploadVideo(storageKey: ExternalBlob, caption: string, videoHashtags: Array<string>): Promise<VideoPublic>;
}
