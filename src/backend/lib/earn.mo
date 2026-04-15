import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/earn";

module {
  // Conversion constants
  public let COINS_PER_AD : Nat = 2;
  public let MAX_AD_WATCHES_PER_DAY : Nat = 10;
  public let MIN_WITHDRAWAL_RUPEES : Nat = 50;
  public let COINS_PER_RUPEE : Nat = 200; // 1000 coins = 5 rupees => 200 coins per rupee

  let NANOS_PER_DAY : Int = 86_400_000_000_000;

  public func toPublic(req : Types.WithdrawalRequest) : Types.WithdrawalRequestPublic {
    {
      id = req.id;
      userId = req.userId;
      rupeeAmount = req.rupeeAmount;
      status = req.status;
      createdAt = req.createdAt;
    };
  };

  public func getOrCreateBalance(
    balances : Map.Map<Common.UserId, Types.CoinBalance>,
    userId : Common.UserId,
    referralCode : Text,
  ) : Types.CoinBalance {
    switch (balances.get(userId)) {
      case (?b) b;
      case null {
        let balance : Types.CoinBalance = {
          userId;
          var balance = 0;
          var dailyAdWatches = 0;
          var lastAdWatchDate = 0;
          var loginStreak = 0;
          var lastLoginDate = 0;
          referralCode;
        };
        balances.add(userId, balance);
        balance;
      };
    };
  };

  func isSameDay(t1 : Int, t2 : Int) : Bool {
    (t1 / NANOS_PER_DAY) == (t2 / NANOS_PER_DAY);
  };

  public func recordAdWatch(
    balances : Map.Map<Common.UserId, Types.CoinBalance>,
    userId : Common.UserId,
    now : Common.Timestamp,
  ) : Nat {
    let b = getOrCreateBalance(balances, userId, generateReferralCode(userId));
    // Reset daily count if new day
    if (not isSameDay(b.lastAdWatchDate, now)) {
      b.dailyAdWatches := 0;
      b.lastAdWatchDate := now;
    };
    if (b.dailyAdWatches >= MAX_AD_WATCHES_PER_DAY) {
      Runtime.trap("Daily ad watch limit reached");
    };
    b.dailyAdWatches += 1;
    b.balance += COINS_PER_AD;
    COINS_PER_AD;
  };

  public func recordDailyLogin(
    balances : Map.Map<Common.UserId, Types.CoinBalance>,
    userId : Common.UserId,
    now : Common.Timestamp,
  ) : Nat {
    let b = getOrCreateBalance(balances, userId, generateReferralCode(userId));
    if (isSameDay(b.lastLoginDate, now)) {
      return 0; // Already claimed today
    };
    let yesterday = now - NANOS_PER_DAY;
    if (b.lastLoginDate > 0 and isSameDay(b.lastLoginDate, yesterday)) {
      b.loginStreak += 1;
    } else {
      b.loginStreak := 1;
    };
    b.lastLoginDate := now;
    // Bonus: 5 coins base + 1 per streak day, max 20
    let bonus : Nat = Nat.min(5 + b.loginStreak, 20);
    b.balance += bonus;
    bonus;
  };

  public func recordReferralReward(
    balances : Map.Map<Common.UserId, Types.CoinBalance>,
    referrerCode : Text,
    referralCodeIndex : Map.Map<Text, Common.UserId>,
    referredUserId : Common.UserId,
  ) : Bool {
    switch (referralCodeIndex.get(referrerCode)) {
      case null false;
      case (?referrerId) {
        if (Principal.equal(referrerId, referredUserId)) return false;
        let referrerBalance = getOrCreateBalance(balances, referrerId, generateReferralCode(referrerId));
        referrerBalance.balance += 50; // 50 coins referral reward
        let referredBalance = getOrCreateBalance(balances, referredUserId, generateReferralCode(referredUserId));
        referredBalance.balance += 10; // 10 coins welcome bonus
        true;
      };
    };
  };

  public func getCoinBalance(
    balances : Map.Map<Common.UserId, Types.CoinBalance>,
    userId : Common.UserId,
  ) : Nat {
    switch (balances.get(userId)) {
      case (?b) b.balance;
      case null 0;
    };
  };

  public func getRupeeEquivalent(coins : Nat) : Nat {
    coins / COINS_PER_RUPEE;
  };

  public func createWithdrawalRequest(
    withdrawals : Map.Map<Common.WithdrawalId, Types.WithdrawalRequest>,
    balances : Map.Map<Common.UserId, Types.CoinBalance>,
    counter : [var Nat],
    userId : Common.UserId,
    rupeeAmount : Nat,
    createdAt : Common.Timestamp,
  ) : Types.WithdrawalRequestPublic {
    if (rupeeAmount < MIN_WITHDRAWAL_RUPEES) {
      Runtime.trap("Minimum withdrawal is ₹50");
    };
    let coinsRequired = rupeeAmount * COINS_PER_RUPEE;
    let b = getOrCreateBalance(balances, userId, generateReferralCode(userId));
    if (b.balance < coinsRequired) {
      Runtime.trap("Insufficient coin balance");
    };
    b.balance -= coinsRequired;
    let id = counter[0];
    counter[0] += 1;
    let req : Types.WithdrawalRequest = {
      id;
      userId;
      rupeeAmount;
      var status = #pending;
      createdAt;
    };
    withdrawals.add(id, req);
    toPublic(req);
  };

  public func getWithdrawalHistory(
    withdrawals : Map.Map<Common.WithdrawalId, Types.WithdrawalRequest>,
    userId : Common.UserId,
  ) : [Types.WithdrawalRequestPublic] {
    let result = List.empty<Types.WithdrawalRequestPublic>();
    withdrawals.forEach(func(_id, req) {
      if (Principal.equal(req.userId, userId)) {
        result.add(toPublic(req));
      };
    });
    result.toArray();
  };

  public func markWithdrawalCompleted(
    withdrawals : Map.Map<Common.WithdrawalId, Types.WithdrawalRequest>,
    withdrawalId : Common.WithdrawalId,
  ) : Bool {
    switch (withdrawals.get(withdrawalId)) {
      case (?req) {
        req.status := #completed;
        true;
      };
      case null false;
    };
  };

  public func generateReferralCode(userId : Common.UserId) : Text {
    let raw = userId.toText();
    // Take last 8 chars of principal text as referral code
    let size = raw.size();
    if (size <= 8) raw else Text.fromArray(raw.toArray().sliceToArray(size - 8, size));
  };
};
