import org.junit.Assert;
import org.junit.Test;
import util.Utils;

public class LambdaTests  {

    @Test
    public void capitalize() {
        String testString = "abcd";

        String newString = Utils.capitalize(testString);
        Assert.assertEquals("Abcd", newString);
    }

    @Test
    public void dontCapitalize() {
        String testString = "ABCD";

        String newString = Utils.capitalize(testString);
        Assert.assertEquals("ABCD", newString);
    }

}
