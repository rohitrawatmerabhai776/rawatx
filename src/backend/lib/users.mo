import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Common "../types/common";
import Types "../types/users";

module {

  func comparePrincipal(a : Principal, b : Principal) : Order.Order {
    Principal.compare(a, b);
  };

  func comparePair(a : (Principal, Principal), b : (Principal, Principal)) : Order.Order {
    let c0 = comparePrincipal(a.0, b.0);
    if (c0 != #equal) c0 else comparePrincipal(a.1, b.1);
  };

  public func toPublic(profile : Types.UserProfile) : Types.UserProfilePublic {
    {
      userId = profile.userId;
      displayName = profile.displayName;
      username = profile.username;
      bio = profile.bio;
      avatarStorageKey = profile.avatarStorageKey;
      followerCount = profile.followerCount;
      followingCount = profile.followingCount;
      isPrivate = profile.isPrivate;
      createdAt = profile.createdAt;
    };
  };

  public func createProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    displayName : Text,
    username : Text,
    bio : Text,
    isPrivate : Bool,
    createdAt : Common.Timestamp,
  ) : Types.UserProfile {
    let profile : Types.UserProfile = {
      userId;
      displayName;
      username;
      bio;
      avatarStorageKey = null;
      var followerCount = 0;
      var followingCount = 0;
      isPrivate;
      createdAt;
    };
    profiles.add(userId, profile);
    profile;
  };

  public func getProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : ?Types.UserProfilePublic {
    switch (profiles.get(userId)) {
      case (?p) ?toPublic(p);
      case null null;
    };
  };

  public func updateProfile(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
    displayName : Text,
    username : Text,
    bio : Text,
    isPrivate : Bool,
  ) : Bool {
    switch (profiles.get(userId)) {
      case (?p) {
        // Mutate in place — var fields on the existing record
        let updated : Types.UserProfile = {
          userId = p.userId;
          displayName;
          username;
          bio;
          avatarStorageKey = p.avatarStorageKey;
          var followerCount = p.followerCount;
          var followingCount = p.followingCount;
          isPrivate;
          createdAt = p.createdAt;
        };
        profiles.add(userId, updated);
        true;
      };
      case null false;
    };
  };

  public func follow(
    follows : Set.Set<(Common.UserId, Common.UserId)>,
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    follower : Common.UserId,
    following : Common.UserId,
  ) : Bool {
    let pair = (follower, following);
    if (follows.contains(comparePair, pair)) return false;
    follows.add(comparePair, pair);
    // update follower count
    switch (profiles.get(follower)) {
      case (?p) {
        p.followingCount += 1;
      };
      case null {};
    };
    // update following count
    switch (profiles.get(following)) {
      case (?p) {
        p.followerCount += 1;
      };
      case null {};
    };
    true;
  };

  public func unfollow(
    follows : Set.Set<(Common.UserId, Common.UserId)>,
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    follower : Common.UserId,
    following : Common.UserId,
  ) : Bool {
    let pair = (follower, following);
    if (not follows.contains(comparePair, pair)) return false;
    follows.remove(comparePair, pair);
    switch (profiles.get(follower)) {
      case (?p) {
        if (p.followingCount > 0) p.followingCount -= 1;
      };
      case null {};
    };
    switch (profiles.get(following)) {
      case (?p) {
        if (p.followerCount > 0) p.followerCount -= 1;
      };
      case null {};
    };
    true;
  };

  public func isFollowing(
    follows : Set.Set<(Common.UserId, Common.UserId)>,
    follower : Common.UserId,
    following : Common.UserId,
  ) : Bool {
    follows.contains(comparePair, (follower, following));
  };

  public func getFollowers(
    follows : Set.Set<(Common.UserId, Common.UserId)>,
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : [Types.UserProfilePublic] {
    let result = List.empty<Types.UserProfilePublic>();
    follows.forEach(func((follower, following)) {
      if (Principal.equal(following, userId)) {
        switch (profiles.get(follower)) {
          case (?p) result.add(toPublic(p));
          case null {};
        };
      };
    });
    result.toArray();
  };

  public func getFollowing(
    follows : Set.Set<(Common.UserId, Common.UserId)>,
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    userId : Common.UserId,
  ) : [Types.UserProfilePublic] {
    let result = List.empty<Types.UserProfilePublic>();
    follows.forEach(func((follower, following)) {
      if (Principal.equal(follower, userId)) {
        switch (profiles.get(following)) {
          case (?p) result.add(toPublic(p));
          case null {};
        };
      };
    });
    result.toArray();
  };

  public func searchUsers(
    profiles : Map.Map<Common.UserId, Types.UserProfile>,
    searchTerm : Text,
  ) : [Types.UserProfilePublic] {
    let lower = searchTerm.toLower();
    let result = List.empty<Types.UserProfilePublic>();
    profiles.forEach(func(_userId, profile) {
      if (
        profile.displayName.toLower().contains(#text lower) or
        profile.username.toLower().contains(#text lower)
      ) {
        result.add(toPublic(profile));
      };
    });
    result.toArray();
  };
};
