package assignment4;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class DeductionReport extends AbstractReport {

  private static final String NUMBER_OF_DEDUCTIONS = "Number of Deductions";
  private static final String DEDUCTION_PERCENT = "Deduction %";
  private static final String DEDUCTION_AMOUNT = "Deduction Amount";

  private Deduction deduction;

  public DeductionReport(Deduction deduction, int year) {
    super(year);
    this.deduction = deduction;
    addToHeader(NUMBER_OF_DEDUCTIONS);
    addToHeader(DEDUCTION_PERCENT);
    addToHeader(DEDUCTION_AMOUNT);
  }

  public void print() {
    dedtLst.clear();
    printDivider();
    printHeader();
    printDivider();
    Deduction currDedt = deduction;
    for (int i = 0; i < year; i++) {
      printLine(i + 1, currDedt);
      printDivider();
      BigDecimal annualDeduction = currDedt.getDeductionAmount()
          .multiply(BigDecimal.valueOf(currDedt.getNumberOfDeductions()));
      double sal = currDedt.getStartingSalary().subtract(annualDeduction).doubleValue();
      currDedt = new Deduction(sal,
          currDedt.getDeductionAmount().doubleValue(),
          currDedt.getNumberOfDeductions());
    }
  }

  private void printLine(int year, Deduction dedt) {
    dedtLst.add(dedt);
    printLine(year, new String[]{
        dedt.getStartingSalary().toPlainString(),
        String.valueOf(dedt.getNumberOfDeductions()),
        dedt.getDeductionPercent().toPlainString(),
        dedt.getDeductionAmount()
            .multiply(BigDecimal.valueOf(deduction.getNumberOfDeductions())).toPlainString(),
    });
  }

  private List<Deduction> dedtLst = new ArrayList<>();

  public List<Deduction> getDeductions() {
    return dedtLst;
  }
}
