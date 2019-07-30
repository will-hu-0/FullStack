package assignment4;

import java.math.BigDecimal;

public class Prediction extends AbstractSalary {

  private BigDecimal incrementAmount;
  private BigDecimal deductionAmount;
  private BigDecimal salaryGrowth;

  public Prediction(double startingSalary, Increment increment, Deduction deduction) {
    super(startingSalary);
    incrementAmount = increment.getIncrementAmount();
    deductionAmount = deduction.getDeductionAmount().multiply(
            BigDecimal.valueOf(deduction.getNumberOfDeductions()));
    salaryGrowth = incrementAmount.subtract(deductionAmount);
  }

  public BigDecimal getIncrementAmount() {
    return incrementAmount;
  }

  public BigDecimal getDeductionAmount() {
    return deductionAmount;
  }

  public BigDecimal getSalaryGrowth() {
    return salaryGrowth;
  }
}
