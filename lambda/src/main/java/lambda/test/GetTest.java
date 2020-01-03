package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.Test;
import util.Response;

public class GetTest extends Handler<String> {
    @Override
    public Response handleRequest(String input, Context context) {
        Test test = getMapper().load(Test.class, input);
        if(test == null)
            return new Response(404, "Test was not found");
        else
            return new Response(200, test);
    }
}