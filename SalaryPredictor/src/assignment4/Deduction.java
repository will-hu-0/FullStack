package assignment4;

import java.math.BigDecimal;

public class Deduction extends AbstractSalary {

  private BigDecimal deductionAmount;
  private int numberOfDeductions;
  private BigDecimal deductionPercent;

  public Deduction(double startingSalary, double deductionAmount, int numberOfDeductions) {
    super(startingSalary);
    this.deductionAmount = new BigDecimal(deductionAmount).setScale(2, BigDecimal.ROUND_HALF_UP);
    this.numberOfDeductions = numberOfDeductions;
    calcDeductionPerc();
  }

  private void calcDeductionPerc() {
    deductionPercent = deductionAmount.multiply(HUNDRED).divide(startingSalary, 2, BigDecimal.ROUND_HALF_UP);
  }

  public int getNumberOfDeductions() {
    return numberOfDeductions;
  }

  public BigDecimal getDeductionPercent() {
    return deductionPercent;
  }

  public BigDecimal getDeductionAmount() {
    return deductionAmount;
  }
}
