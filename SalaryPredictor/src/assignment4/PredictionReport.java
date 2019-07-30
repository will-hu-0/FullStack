package assignment4;

public class PredictionReport extends AbstractReport {

  private static final String INCREMENT_AMOUNT = "Increment Amount";
  private static final String DEDUCTION_AMOUNT = "Deduction Amount";
  private static final String SALARY_GROWTH = "Salary Growth";

  private Prediction[] predictions;

  public PredictionReport(Prediction[] predictions) {
    super(predictions.length);
    this.predictions = predictions;
    addToHeader(INCREMENT_AMOUNT);
    addToHeader(DEDUCTION_AMOUNT);
    addToHeader(SALARY_GROWTH);
  }

  public void print() {
    printDivider();
    printHeader();
    printDivider();
    for (int i = 0; i < year; i++) {
      printLine(i + 1, predictions[i]);
      printDivider();
    }
  }

  private void printLine(int year, Prediction pred) {
    printLine(year, new String[]{
        pred.getStartingSalary().toPlainString(),
        pred.getIncrementAmount().toPlainString(),
        pred.getDeductionAmount().toPlainString(),
        pred.getSalaryGrowth().toPlainString(),
    });
  }
}
