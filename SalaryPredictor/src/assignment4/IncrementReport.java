package assignment4;

import java.util.ArrayList;
import java.util.List;

public class IncrementReport extends AbstractReport {

  private Increment increment;

  public IncrementReport(Increment increment, int year) {
    super(year);
    this.increment = increment;
    addToHeader("Number of Increments");
    addToHeader("Increment %");
    addToHeader("Increment Amount");
  }

  public void print() {
    incrLst.clear();
    printDivider();
    printHeader();
    printDivider();
    Increment currInc = increment;
    for (int i = 0; i < year; i++) {
      printLine(i + 1, currInc);
      printDivider();
      double nextSal = currInc.getStartingSalary().add(currInc.getIncrementAmount()).doubleValue();
      currInc = new Increment(nextSal,
          currInc.getIncrementPercent().doubleValue(),
          currInc.getNumberOfIncrements());
    }
  }

  private void printLine(int year, Increment incr) {
    incrLst.add(incr);
    printLine(year, new String[] {
        incr.getStartingSalary().toString(),
        String.valueOf(incr.getNumberOfIncrements()),
        incr.getIncrementPercent().toPlainString(),
        incr.getIncrementAmount().toPlainString(),
    });
  }

  private List<Increment> incrLst = new ArrayList<>();

  public List<Increment> getIncrements() {
    return incrLst;
  }
}
