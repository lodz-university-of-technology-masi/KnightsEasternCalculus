package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.SolvableTest;
import model.test.TestInstance;
import util.Response;

public class GetSolvableTest extends Handler<String> {
    @Override
    public Response handleRequest(String input, Context context) {
        TestInstance test = getMapper().load(TestInstance.class, input);
        if (test == null) {
            return new Response(404, "Test not found");
        } else {
            return new Response(200, new SolvableTest(test));
        }
    }
}
