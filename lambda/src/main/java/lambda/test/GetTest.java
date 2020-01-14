package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.request.TestRequest;
import model.test.Test;
import util.Response;

public class GetTest extends Handler<TestRequest> {
    @Override
    public Response handleRequest(TestRequest input, Context context) {
        Test test = getMapper().load(Test.class, input.getOwnerId(), input.getTestId());
        if(test == null)
            return new Response(404, "Test was not found");

        else
            return new Response(200, test);
    }
}
