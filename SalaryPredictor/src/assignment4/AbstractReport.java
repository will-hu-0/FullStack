package assignment4;

import java.util.ArrayList;
import java.util.List;

import static assignment4.PrintUtil.*;

public abstract class AbstractReport {

  private final List<String> headers = new ArrayList<>();

  protected final int year;

  public AbstractReport(int year) {
    this.year = year;
    addToHeader("Year");
    addToHeader("Starting Salary");
  }

  protected final void addToHeader(String col) {
    headers.add(col);
  }

  protected final void printHeader() {
    String[] hdrs = new String[headers.size()];
    headers.toArray(hdrs);
    System.out.println(drawLine(hdrs));
  }

  protected final void printLine(int year, String[] vals) {
    System.out.print(SEPARATOR);
    System.out.print(paddingRight(String.valueOf(year)));
    System.out.println(drawLine(vals));
  }

  protected final void printDivider() {
    System.out.println(drawDivider(headers.size()));
  }

}
