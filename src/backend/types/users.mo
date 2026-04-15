import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type UserProfile = {
    userId : Common.UserId;
    displayName : Text;
    username : Text;
    bio : Text;
    avatarStorageKey : ?Storage.ExternalBlob;
    var followerCount : Nat;
    var followingCount : Nat;
    isPrivate : Bool;
    createdAt : Common.Timestamp;
  };

  public type UserProfilePublic = {
    userId : Common.UserId;
    displayName : Text;
    username : Text;
    bio : Text;
    avatarStorageKey : ?Storage.ExternalBlob;
    followerCount : Nat;
    followingCount : Nat;
    isPrivate : Bool;
    createdAt : Common.Timestamp;
  };
};
