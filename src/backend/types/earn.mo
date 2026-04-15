import Common "common";

module {
  public type CoinBalance = {
    userId : Common.UserId;
    var balance : Nat;
    var dailyAdWatches : Nat;
    var lastAdWatchDate : Common.Timestamp;
    var loginStreak : Nat;
    var lastLoginDate : Common.Timestamp;
    referralCode : Text;
  };

  public type WithdrawalRequest = {
    id : Common.WithdrawalId;
    userId : Common.UserId;
    rupeeAmount : Nat;
    var status : Common.WithdrawalStatus;
    createdAt : Common.Timestamp;
  };

  public type WithdrawalRequestPublic = {
    id : Common.WithdrawalId;
    userId : Common.UserId;
    rupeeAmount : Nat;
    status : Common.WithdrawalStatus;
    createdAt : Common.Timestamp;
  };
};
