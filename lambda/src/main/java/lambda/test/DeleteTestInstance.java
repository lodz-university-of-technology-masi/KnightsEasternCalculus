package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.request.TestRequest;
import model.test.TestInstance;
import util.Response;

public class DeleteTestInstance extends Handler<TestRequest> {
    @Override
    public Response handleRequest(TestRequest input, Context context) {
        TestInstance test = getMapper().load(TestInstance.class, input.getOwnerId(), input.getTestId());
        if(test == null)
            return new Response(404, "Test not found");

        getMapper().delete(test);
        return new Response(204, null);
    }
}
