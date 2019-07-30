package assignment4;


public class PrintUtil {

  private PrintUtil() {}

  public static final int DEFAULT_WIDTH = 20;
  public static final String SEPARATOR = "|";
  public static final String DIVIDER = "-";

  public static String drawLine(String[] vals) {
    StringBuilder line = new StringBuilder(SEPARATOR);
    for(String val : vals) {
      line.append(paddingRight(val)).append(SEPARATOR);
    }
    return line.toString();
  }

  public static String drawDivider(int numOfCols) {
    StringBuilder div = new StringBuilder(DIVIDER);
    for (int i = 0; i < numOfCols; i++) {
      div.append(paddingRight("", DIVIDER)).append(DIVIDER);
    }
    return div.toString();
  }

  public static String paddingRight(String s) {
    return paddingRight(s, DEFAULT_WIDTH);
  }

  public static String paddingRight(String s, int width) {
    return paddingRight(s, " ", width);
  }

  public static String paddingRight(String s, String adder) {
    return paddingRight(s, adder, DEFAULT_WIDTH);
  }

  public static String paddingRight(String s, String adder, int width) {
    if (s.length() > width) {
      return s.substring(0, width);
    } else {
      StringBuilder sb = new StringBuilder(s);
      while (sb.length() < width) {
        sb.append(adder);
      }
      return sb.toString();
    }
  }
}
