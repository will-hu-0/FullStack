package assignment4;

import java.math.BigDecimal;

public abstract class AbstractSalary {

  protected static final BigDecimal HUNDRED = BigDecimal.valueOf(100);

  protected final BigDecimal startingSalary;

  public AbstractSalary(double startingSalary) {
    this.startingSalary = new BigDecimal(startingSalary).setScale(2, BigDecimal.ROUND_HALF_UP);
  }

  public BigDecimal getStartingSalary() {
    return startingSalary;
  }
}
