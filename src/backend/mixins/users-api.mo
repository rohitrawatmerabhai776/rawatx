import Map "mo:core/Map";
import Set "mo:core/Set";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Storage "mo:caffeineai-object-storage/Storage";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import UserTypes "../types/users";
import UserLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  profiles : Map.Map<Common.UserId, UserTypes.UserProfile>,
  follows : Set.Set<(Common.UserId, Common.UserId)>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?UserTypes.UserProfilePublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(
    displayName : Text,
    username : Text,
    bio : Text,
    isPrivate : Bool,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (profiles.get(caller)) {
      case (?_p) {
        ignore UserLib.updateProfile(profiles, caller, displayName, username, bio, isPrivate);
      };
      case null {
        ignore UserLib.createProfile(profiles, caller, displayName, username, bio, isPrivate, Time.now());
      };
    };
  };

  public shared ({ caller }) func updateCallerAvatar(avatar : Storage.ExternalBlob) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (profiles.get(caller)) {
      case (?p) {
        let updated : UserTypes.UserProfile = {
          userId = p.userId;
          displayName = p.displayName;
          username = p.username;
          bio = p.bio;
          avatarStorageKey = ?avatar;
          var followerCount = p.followerCount;
          var followingCount = p.followingCount;
          isPrivate = p.isPrivate;
          createdAt = p.createdAt;
        };
        profiles.add(caller, updated);
      };
      case null Runtime.trap("Profile not found");
    };
  };

  public query func getUserProfile(userId : Common.UserId) : async ?UserTypes.UserProfilePublic {
    UserLib.getProfile(profiles, userId);
  };

  public shared ({ caller }) func followUser(userId : Common.UserId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.follow(follows, profiles, caller, userId);
  };

  public shared ({ caller }) func unfollowUser(userId : Common.UserId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    UserLib.unfollow(follows, profiles, caller, userId);
  };

  public query ({ caller }) func isFollowing(userId : Common.UserId) : async Bool {
    UserLib.isFollowing(follows, caller, userId);
  };

  public query func getFollowers(userId : Common.UserId) : async [UserTypes.UserProfilePublic] {
    UserLib.getFollowers(follows, profiles, userId);
  };

  public query func getFollowing(userId : Common.UserId) : async [UserTypes.UserProfilePublic] {
    UserLib.getFollowing(follows, profiles, userId);
  };

  public query func searchUsers(searchTerm : Text) : async [UserTypes.UserProfilePublic] {
    UserLib.searchUsers(profiles, searchTerm);
  };
};
