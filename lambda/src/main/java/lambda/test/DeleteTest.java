package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.request.AuthenticatedRequest;
import model.request.TestRequest;
import model.test.Test;
import util.Response;

public class DeleteTest extends Handler<AuthenticatedRequest<TestRequest>> {

    @Override
    public Response handleRequest(AuthenticatedRequest<TestRequest> authenticatedRequest, Context context) {
        if(!authenticatedRequest.isRecruiter())
            return new Response(403, "Recruiter permissions required");
        if(!authenticatedRequest.getUserId().equals(authenticatedRequest.getBody().getOwnerId()))
            return new Response(403, "Insufficient permissions");

        Test test = new Test();
        test.setRecruiterId(authenticatedRequest.getBody().getOwnerId());
        test.setTestId(authenticatedRequest.getBody().getTestId());
        getMapper().delete(test);
        return new Response(204, "");
    }
}
