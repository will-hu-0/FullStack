package assignment4;

import java.math.BigDecimal;
import java.util.List;
import java.util.Scanner;

public class Main {

  public static void main(String[] args) {
    double initSalary = 20000;
    double incrPrec = 13;
    // twice a year
    int numOfIncr = 2;
    double dedtAmt = 350;
    // twice a year
    int numOfDedt = 2;
    int predictionYears = 3;

    Scanner scan = new Scanner(System.in);

    System.out.print("Please input initial salary (default: 20000): ");
    if (scan.hasNextLine()) {
      String s = scan.nextLine();
      if (s != null && s.length() > 0) {
        try {
          initSalary = Double.valueOf(s);
          if (initSalary < 1) {
            System.out.println("initial salary must be greater than 1.");
            System.exit(1);
          }
        } catch (Exception e) {
          System.out.println("Invalid initSalary salary.");
          System.exit(1);
        }
      }
    }

    System.out.print("Please input increment percent (default: 13%): ");
    if (scan.hasNextLine()) {
      String s = scan.nextLine();
      if (s != null && s.length() > 0) {
        try {
          incrPrec = Double.valueOf(s);
          if (incrPrec < 0) {
            System.out.println("Increment percent must be greater than 0.");
            System.exit(1);
          }
        } catch (Exception e) {
          System.out.println("Invalid increment percent.");
          System.exit(1);
        }
      }
    }

    System.out.print("Please input number of increments (default: 2): ");
    if (scan.hasNextLine()) {
      String s = scan.nextLine();
      if (s != null && s.length() > 0) {
        try {
          numOfIncr = Integer.valueOf(s);
          if (numOfIncr < 1) {
            System.out.println("number of increments must be greater than 1.");
            System.exit(1);
          }
        } catch (Exception e) {
          System.out.println("Invalid number of increments.");
          System.exit(1);
        }
      }
    }

    System.out.print("Please input deduction amount (default: 350): ");
    if (scan.hasNextLine()) {
      String s = scan.nextLine();
      if (s != null && s.length() > 0) {
        try {
          dedtAmt = Double.valueOf(s);
          if (dedtAmt < 0) {
            System.out.println("Deduction amount must be greater than 0.");
            System.exit(1);
          }
        } catch (Exception e) {
          System.out.println("Invalid deduction amount.");
          System.exit(1);
        }
      }
    }

    System.out.print("Please input number of deductions (default: 2): ");
    if (scan.hasNextLine()) {
      String s = scan.nextLine();
      if (s != null && s.length() > 0) {
        try {
          numOfDedt = Integer.valueOf(s);
          if (numOfDedt < 1) {
            System.out.println("Number of deductions must be greater than 1.");
            System.exit(1);
          }
        } catch (Exception e) {
          System.out.println("Invalid number of deductions.");
          System.exit(1);
        }
      }
    }

    System.out.print("Please input years of prediction (default: 3): ");
    if (scan.hasNextLine()) {
      String s = scan.nextLine();
      if (s != null && s.length() > 0) {
        try {
          predictionYears = Integer.valueOf(s);
          if (predictionYears < 2) {
            System.out.println("Years of prediction must be greater than 2.");
            System.exit(1);
          }
        } catch (Exception e) {
          System.out.println("Invalid years of prediction.");
          System.exit(1);
        }
      }
    }

    scan.close();

    Increment inc = new Increment(initSalary, incrPrec, numOfIncr);
    IncrementReport report1 = new IncrementReport(inc, predictionYears);
    report1.print();

    Deduction dec = new Deduction(initSalary, dedtAmt, numOfDedt);
    DeductionReport report2 = new DeductionReport(dec, predictionYears);
    report2.print();

    Prediction[] predictions = new Prediction[predictionYears];
    List<Increment> incrementList = report1.getIncrements();
    List<Deduction> deductionList = report2.getDeductions();

    for (int i = 0; i < predictionYears; i++) {
      Increment incr = incrementList.get(i);
      Deduction dedt = deductionList.get(i);
      double sal = (i == 0) ? incr.getStartingSalary().doubleValue() :
          incr.getStartingSalary().subtract(
              dedt.getDeductionAmount()
                  .multiply(BigDecimal.valueOf(dedt.getNumberOfDeductions()))).doubleValue();
      predictions[i] = new Prediction(sal, incrementList.get(i), deductionList.get(i));
    }
    PredictionReport report3 = new PredictionReport(predictions);
    report3.print();
  }
}
