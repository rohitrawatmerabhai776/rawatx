import Map "mo:core/Map";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import VideoTypes "../types/videos";
import VideoLib "../lib/videos";

mixin (
  accessControlState : AccessControl.AccessControlState,
  videos : Map.Map<Common.VideoId, VideoTypes.Video>,
  videoCounter : [var Nat],
  likes : Set.Set<(Common.VideoId, Common.UserId)>,
  comments : Map.Map<Common.CommentId, VideoTypes.Comment>,
  commentCounter : [var Nat],
  hashtags : Map.Map<Text, Nat>,
) {
  public shared ({ caller }) func uploadVideo(
    storageKey : Storage.ExternalBlob,
    caption : Text,
    videoHashtags : [Text],
  ) : async VideoTypes.VideoPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VideoLib.recordHashtagUsage(hashtags, videoHashtags);
    VideoLib.uploadVideo(videos, videoCounter, caller, storageKey, caption, videoHashtags, Time.now());
  };

  public query func getVideo(videoId : Common.VideoId) : async ?VideoTypes.VideoPublic {
    VideoLib.getVideo(videos, videoId);
  };

  public query func getFeed(offset : Nat, limit : Nat) : async [VideoTypes.VideoPublic] {
    VideoLib.getFeed(videos, offset, limit);
  };

  public query func getUserVideos(userId : Common.UserId) : async [VideoTypes.VideoPublic] {
    VideoLib.getUserVideos(videos, userId);
  };

  public shared ({ caller }) func toggleLike(videoId : Common.VideoId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VideoLib.toggleLike(videos, likes, videoId, caller);
  };

  public query func getLikeCount(videoId : Common.VideoId) : async Nat {
    VideoLib.getLikeCount(videos, videoId);
  };

  public shared ({ caller }) func addComment(videoId : Common.VideoId, text : Text) : async VideoTypes.Comment {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VideoLib.addComment(comments, commentCounter, videos, videoId, caller, text, Time.now());
  };

  public query func getComments(videoId : Common.VideoId) : async [VideoTypes.Comment] {
    VideoLib.getComments(comments, videoId);
  };

  public shared ({ caller }) func recordVideoView(videoId : Common.VideoId) : async () {
    VideoLib.incrementViews(videos, videoId);
  };

  public query func getTrendingHashtags(limit : Nat) : async [(Text, Nat)] {
    VideoLib.getTrendingHashtags(hashtags, limit);
  };
};
