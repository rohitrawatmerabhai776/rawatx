import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Video = {
    id : Common.VideoId;
    storageKey : Storage.ExternalBlob;
    uploaderId : Common.UserId;
    caption : Text;
    hashtags : [Text];
    var likesCount : Nat;
    var commentsCount : Nat;
    var viewsCount : Nat;
    isPublished : Bool;
    createdAt : Common.Timestamp;
  };

  public type VideoPublic = {
    id : Common.VideoId;
    storageKey : Storage.ExternalBlob;
    uploaderId : Common.UserId;
    caption : Text;
    hashtags : [Text];
    likesCount : Nat;
    commentsCount : Nat;
    viewsCount : Nat;
    isPublished : Bool;
    createdAt : Common.Timestamp;
  };

  public type Comment = {
    id : Common.CommentId;
    videoId : Common.VideoId;
    authorId : Common.UserId;
    text : Text;
    createdAt : Common.Timestamp;
  };
};
