import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import EarnTypes "../types/earn";
import EarnLib "../lib/earn";

mixin (
  accessControlState : AccessControl.AccessControlState,
  coinBalances : Map.Map<Common.UserId, EarnTypes.CoinBalance>,
  withdrawals : Map.Map<Common.WithdrawalId, EarnTypes.WithdrawalRequest>,
  withdrawalCounter : [var Nat],
  referralCodeIndex : Map.Map<Text, Common.UserId>,
) {
  public shared ({ caller }) func recordAdWatch() : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    EarnLib.recordAdWatch(coinBalances, caller, Time.now());
  };

  public shared ({ caller }) func recordDailyLogin() : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    EarnLib.recordDailyLogin(coinBalances, caller, Time.now());
  };

  public shared ({ caller }) func recordReferralReward(referrerCode : Text) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    EarnLib.recordReferralReward(coinBalances, referrerCode, referralCodeIndex, caller);
  };

  public query ({ caller }) func getCoinBalance() : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    EarnLib.getCoinBalance(coinBalances, caller);
  };

  public query func getRupeeEquivalent(coins : Nat) : async Nat {
    EarnLib.getRupeeEquivalent(coins);
  };

  public shared ({ caller }) func getMyReferralCode() : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let code = EarnLib.generateReferralCode(caller);
    // Register the code in the index if not already there
    switch (referralCodeIndex.get(code)) {
      case null { referralCodeIndex.add(code, caller) };
      case (?_) {};
    };
    code;
  };

  public shared ({ caller }) func createWithdrawalRequest(rupeeAmount : Nat) : async EarnTypes.WithdrawalRequestPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    EarnLib.createWithdrawalRequest(withdrawals, coinBalances, withdrawalCounter, caller, rupeeAmount, Time.now());
  };

  public query ({ caller }) func getWithdrawalHistory() : async [EarnTypes.WithdrawalRequestPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    EarnLib.getWithdrawalHistory(withdrawals, caller);
  };

  public shared ({ caller }) func markWithdrawalCompleted(withdrawalId : Common.WithdrawalId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Admin only");
    };
    EarnLib.markWithdrawalCompleted(withdrawals, withdrawalId);
  };
};
