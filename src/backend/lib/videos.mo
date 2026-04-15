import Map "mo:core/Map";
import List "mo:core/List";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Storage "mo:caffeineai-object-storage/Storage";
import Common "../types/common";
import Types "../types/videos";

module {

  func compareNatPrincipal(a : (Nat, Principal), b : (Nat, Principal)) : Order.Order {
    let c0 = Nat.compare(a.0, b.0);
    if (c0 != #equal) c0 else Principal.compare(a.1, b.1);
  };

  public func toPublic(video : Types.Video) : Types.VideoPublic {
    {
      id = video.id;
      storageKey = video.storageKey;
      uploaderId = video.uploaderId;
      caption = video.caption;
      hashtags = video.hashtags;
      likesCount = video.likesCount;
      commentsCount = video.commentsCount;
      viewsCount = video.viewsCount;
      isPublished = video.isPublished;
      createdAt = video.createdAt;
    };
  };

  public func uploadVideo(
    videos : Map.Map<Common.VideoId, Types.Video>,
    counter : [var Nat],
    uploaderId : Common.UserId,
    storageKey : Storage.ExternalBlob,
    caption : Text,
    hashtags : [Text],
    createdAt : Common.Timestamp,
  ) : Types.VideoPublic {
    let id = counter[0];
    counter[0] += 1;
    let video : Types.Video = {
      id;
      storageKey;
      uploaderId;
      caption;
      hashtags;
      var likesCount = 0;
      var commentsCount = 0;
      var viewsCount = 0;
      isPublished = true;
      createdAt;
    };
    videos.add(id, video);
    toPublic(video);
  };

  public func getVideo(
    videos : Map.Map<Common.VideoId, Types.Video>,
    videoId : Common.VideoId,
  ) : ?Types.VideoPublic {
    switch (videos.get(videoId)) {
      case (?v) ?toPublic(v);
      case null null;
    };
  };

  public func getFeed(
    videos : Map.Map<Common.VideoId, Types.Video>,
    offset : Nat,
    limit : Nat,
  ) : [Types.VideoPublic] {
    // Return published videos in reverse chronological order (newest first)
    let all = List.empty<Types.VideoPublic>();
    videos.forEach(func(_id, v) {
      if (v.isPublished) all.add(toPublic(v));
    });
    // Sort descending by createdAt
    let sorted = all.sort(func(a, b) {
      Int.compare(b.createdAt, a.createdAt);
    });
    sorted.sliceToArray(offset, offset + limit);
  };

  public func getUserVideos(
    videos : Map.Map<Common.VideoId, Types.Video>,
    userId : Common.UserId,
  ) : [Types.VideoPublic] {
    let result = List.empty<Types.VideoPublic>();
    videos.forEach(func(_id, v) {
      if (Principal.equal(v.uploaderId, userId) and v.isPublished) {
        result.add(toPublic(v));
      };
    });
    result.toArray();
  };

  public func toggleLike(
    videos : Map.Map<Common.VideoId, Types.Video>,
    likes : Set.Set<(Common.VideoId, Common.UserId)>,
    videoId : Common.VideoId,
    userId : Common.UserId,
  ) : Bool {
    let pair = (videoId, userId);
    let alreadyLiked = likes.contains(compareNatPrincipal, pair);
    if (alreadyLiked) {
      likes.remove(compareNatPrincipal, pair);
      switch (videos.get(videoId)) {
        case (?v) { if (v.likesCount > 0) v.likesCount -= 1; };
        case null {};
      };
      false; // unliked
    } else {
      likes.add(compareNatPrincipal, pair);
      switch (videos.get(videoId)) {
        case (?v) { v.likesCount += 1; };
        case null {};
      };
      true; // liked
    };
  };

  public func getLikeCount(
    videos : Map.Map<Common.VideoId, Types.Video>,
    videoId : Common.VideoId,
  ) : Nat {
    switch (videos.get(videoId)) {
      case (?v) v.likesCount;
      case null 0;
    };
  };

  public func addComment(
    comments : Map.Map<Common.CommentId, Types.Comment>,
    counter : [var Nat],
    videos : Map.Map<Common.VideoId, Types.Video>,
    videoId : Common.VideoId,
    authorId : Common.UserId,
    text : Text,
    createdAt : Common.Timestamp,
  ) : Types.Comment {
    let id = counter[0];
    counter[0] += 1;
    let comment : Types.Comment = { id; videoId; authorId; text; createdAt };
    comments.add(id, comment);
    switch (videos.get(videoId)) {
      case (?v) { v.commentsCount += 1; };
      case null {};
    };
    comment;
  };

  public func getComments(
    comments : Map.Map<Common.CommentId, Types.Comment>,
    videoId : Common.VideoId,
  ) : [Types.Comment] {
    let result = List.empty<Types.Comment>();
    comments.forEach(func(_id, c) {
      if (c.videoId == videoId) result.add(c);
    });
    result.toArray();
  };

  public func recordHashtagUsage(
    hashtags : Map.Map<Text, Nat>,
    tags : [Text],
  ) {
    for (tag in tags.values()) {
      let current = switch (hashtags.get(tag)) {
        case (?n) n;
        case null 0;
      };
      hashtags.add(tag, current + 1);
    };
  };

  public func getTrendingHashtags(
    hashtags : Map.Map<Text, Nat>,
    limit : Nat,
  ) : [(Text, Nat)] {
    let all = List.empty<(Text, Nat)>();
    hashtags.forEach(func(tag, count) {
      all.add((tag, count));
    });
    let sorted = all.sort(func(a, b) {
      Nat.compare(b.1, a.1);
    });
    sorted.sliceToArray(0, limit);
  };

  public func incrementViews(
    videos : Map.Map<Common.VideoId, Types.Video>,
    videoId : Common.VideoId,
  ) {
    switch (videos.get(videoId)) {
      case (?v) { v.viewsCount += 1; };
      case null {};
    };
  };
};
