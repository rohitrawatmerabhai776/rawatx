import Map "mo:core/Map";
import Set "mo:core/Set";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Common "types/common";
import UserTypes "types/users";
import VideoTypes "types/videos";
import EarnTypes "types/earn";
import UsersMixin "mixins/users-api";
import VideosMixin "mixins/videos-api";
import EarnMixin "mixins/earn-api";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage
  include MixinObjectStorage();

  // User profiles and follows
  let profiles = Map.empty<Common.UserId, UserTypes.UserProfile>();
  let follows = Set.empty<(Common.UserId, Common.UserId)>();
  include UsersMixin(accessControlState, profiles, follows);

  // Videos, likes, comments, hashtags
  let videos = Map.empty<Common.VideoId, VideoTypes.Video>();
  let videoCounter = [var 0 : Nat];
  let likes = Set.empty<(Common.VideoId, Common.UserId)>();
  let comments = Map.empty<Common.CommentId, VideoTypes.Comment>();
  let commentCounter = [var 0 : Nat];
  let hashtags = Map.empty<Text, Nat>();
  include VideosMixin(accessControlState, videos, videoCounter, likes, comments, commentCounter, hashtags);

  // Earn, wallet, withdrawals
  let coinBalances = Map.empty<Common.UserId, EarnTypes.CoinBalance>();
  let withdrawals = Map.empty<Common.WithdrawalId, EarnTypes.WithdrawalRequest>();
  let withdrawalCounter = [var 0 : Nat];
  let referralCodeIndex = Map.empty<Text, Common.UserId>();
  include EarnMixin(accessControlState, coinBalances, withdrawals, withdrawalCounter, referralCodeIndex);
};
