module {
  public type UserId = Principal;
  public type Timestamp = Int;
  public type VideoId = Nat;
  public type CommentId = Nat;
  public type WithdrawalId = Nat;

  public type WithdrawalStatus = {
    #pending;
    #completed;
  };
};
