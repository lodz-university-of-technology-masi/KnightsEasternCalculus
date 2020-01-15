package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.request.TestRequest;
import model.test.Test;
import util.Response;

public class DeleteTest extends Handler<TestRequest> {

    @Override
    public Response handleRequest(TestRequest input, Context context) {
        Test test = new Test();
        test.setRecruiterId(input.getOwnerId());
        test.setTestId(input.getTestId());
        getMapper().delete(test);
        return new Response(204, "");
    }
}
