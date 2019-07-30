package assignment4;

import java.math.BigDecimal;

public class Increment extends AbstractSalary {

  private int numberOfIncrements;
  private BigDecimal incrementPercent;
  private BigDecimal incrementAmount;

  public Increment(double startingSalary, double incrementPercent, int numberOfIncrements) {
    super(startingSalary);
    this.incrementPercent = new BigDecimal(incrementPercent).setScale(2, BigDecimal.ROUND_HALF_UP);
    this.numberOfIncrements = numberOfIncrements;
    this.incrementAmount = BigDecimal.ZERO;
    calcDeltaAmount();
  }

  private void calcDeltaAmount() {
    BigDecimal currSal = startingSalary;
    for (int i = 0; i<numberOfIncrements; i++) {
      currSal = currSal.multiply(incrementPercent.add(HUNDRED).divide(HUNDRED));
    }
    this.incrementAmount = currSal.subtract(startingSalary).setScale(2, BigDecimal.ROUND_HALF_UP);
  }

  public int getNumberOfIncrements() {
    return numberOfIncrements;
  }

  public BigDecimal getIncrementPercent() {
    return incrementPercent;
  }

  public BigDecimal getIncrementAmount() {
    return incrementAmount;
  }
}
