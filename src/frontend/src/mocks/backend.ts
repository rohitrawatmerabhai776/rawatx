import type { backendInterface, UserProfilePublic, VideoPublic, WithdrawalRequestPublic, Comment, ExternalBlob } from "../backend";
import { UserRole, WithdrawalStatus } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const mockPrincipal = { toString: () => "aaaaa-aa", toText: () => "aaaaa-aa", toUint8Array: () => new Uint8Array(0), isAnonymous: () => false, compareTo: () => 0 } as unknown as Principal;

const mockStorageKey = {
  getDirectURL: () => "https://picsum.photos/seed/video1/400/700",
  getBytes: async () => new Uint8Array(0),
  withUploadProgress: () => mockStorageKey,
} as unknown as ExternalBlob;

const mockAvatar = {
  getDirectURL: () => "https://picsum.photos/seed/user1/100/100",
  getBytes: async () => new Uint8Array(0),
  withUploadProgress: () => mockAvatar,
} as unknown as ExternalBlob;

const mockUser: UserProfilePublic = {
  bio: "Short video creator 🎬 | Student | RawatX",
  username: "rawat_creator",
  displayName: "Arjun Rawat",
  userId: mockPrincipal,
  createdAt: BigInt(Date.now()) * BigInt(1_000_000),
  avatarStorageKey: mockAvatar,
  isPrivate: false,
  followerCount: BigInt(1240),
  followingCount: BigInt(320),
};

const mockUser2: UserProfilePublic = {
  bio: "Dance & vibes 💃",
  username: "priya_dances",
  displayName: "Priya Sharma",
  userId: mockPrincipal,
  createdAt: BigInt(Date.now()) * BigInt(1_000_000),
  avatarStorageKey: undefined,
  isPrivate: false,
  followerCount: BigInt(8900),
  followingCount: BigInt(210),
};

const mockVideos: VideoPublic[] = [
  {
    id: BigInt(1),
    isPublished: true,
    hashtags: ["#trending", "#student", "#rawatx"],
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    storageKey: mockStorageKey,
    caption: "My first reel on RawatX! 🔥 #trending #student",
    commentsCount: BigInt(24),
    likesCount: BigInt(342),
    viewsCount: BigInt(1890),
    uploaderId: mockPrincipal,
  },
  {
    id: BigInt(2),
    isPublished: true,
    hashtags: ["#dance", "#viral"],
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    storageKey: {
      getDirectURL: () => "https://picsum.photos/seed/video2/400/700",
      getBytes: async () => new Uint8Array(0),
      withUploadProgress: () => mockStorageKey,
    } as unknown as ExternalBlob,
    caption: "Dance vibes only 💃 #dance #viral",
    commentsCount: BigInt(57),
    likesCount: BigInt(920),
    viewsCount: BigInt(5400),
    uploaderId: mockPrincipal,
  },
];

const mockWithdrawals: WithdrawalRequestPublic[] = [
  {
    id: BigInt(1),
    status: WithdrawalStatus.completed,
    userId: mockPrincipal,
    createdAt: BigInt(Date.now() - 7 * 24 * 3600 * 1000) * BigInt(1_000_000),
    rupeeAmount: BigInt(50),
  },
  {
    id: BigInt(2),
    status: WithdrawalStatus.pending,
    userId: mockPrincipal,
    createdAt: BigInt(Date.now() - 1 * 24 * 3600 * 1000) * BigInt(1_000_000),
    rupeeAmount: BigInt(75),
  },
];

const mockComment: Comment = {
  id: BigInt(1),
  authorId: mockPrincipal,
  createdAt: BigInt(Date.now()) * BigInt(1_000_000),
  text: "Great video! 🔥",
  videoId: BigInt(1),
};

export const mockBackend: backendInterface = {
  _immutableObjectStorageBlobsAreLive: async () => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async () => undefined,
  _immutableObjectStorageCreateCertificate: async () => ({ method: "PUT", blob_hash: "abc123" }),
  _immutableObjectStorageRefillCashier: async () => ({ success: true, topped_up_amount: BigInt(0) }),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,

  addComment: async () => mockComment,
  assignCallerUserRole: async () => undefined,
  createWithdrawalRequest: async (rupeeAmount) => ({
    id: BigInt(3),
    status: WithdrawalStatus.pending,
    userId: mockPrincipal,
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    rupeeAmount,
  }),
  followUser: async () => true,
  getCallerUserProfile: async () => mockUser,
  getCallerUserRole: async () => UserRole.user,
  getCoinBalance: async () => BigInt(2450),
  getComments: async () => [mockComment],
  getFeed: async () => mockVideos,
  getFollowers: async () => [mockUser2],
  getFollowing: async () => [mockUser2],
  getLikeCount: async () => BigInt(342),
  getMyReferralCode: async () => "RAWAT-XYZ123",
  getRupeeEquivalent: async (coins) => coins / BigInt(200),
  getTrendingHashtags: async () => [
    ["#trending", BigInt(4500)],
    ["#student", BigInt(3200)],
    ["#rawatx", BigInt(2800)],
    ["#dance", BigInt(2100)],
    ["#viral", BigInt(1900)],
  ],
  getUserProfile: async () => mockUser,
  getUserVideos: async () => mockVideos,
  getVideo: async () => mockVideos[0],
  getWithdrawalHistory: async () => mockWithdrawals,
  isCallerAdmin: async () => false,
  isFollowing: async () => false,
  markWithdrawalCompleted: async () => true,
  recordAdWatch: async () => BigInt(2452),
  recordDailyLogin: async () => BigInt(2465),
  recordReferralReward: async () => true,
  recordVideoView: async () => undefined,
  saveCallerUserProfile: async () => undefined,
  searchUsers: async () => [mockUser, mockUser2],
  toggleLike: async () => true,
  unfollowUser: async () => true,
  updateCallerAvatar: async () => undefined,
  uploadVideo: async (_storageKey, caption, videoHashtags) => ({
    id: BigInt(3),
    isPublished: true,
    hashtags: videoHashtags,
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    storageKey: mockStorageKey,
    caption,
    commentsCount: BigInt(0),
    likesCount: BigInt(0),
    viewsCount: BigInt(0),
    uploaderId: mockPrincipal,
  }),
};
