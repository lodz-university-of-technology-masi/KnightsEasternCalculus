package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.SolvableTest;
import model.test.TestInstance;
import util.Response;

public class AddTestInstance extends Handler<SolvableTest> {
    @Override
    public Response handleRequest(SolvableTest input, Context context) {
        if (input != null) {
            if (input.getApplicantID() != null && input.getTimestamp() != 0) {
                TestInstance test = new TestInstance(input.getApplicantID(), input.getTimestamp(), input.getTitle(),
                        input.getCloseQuestions(), input.getOpenQuestions(), input.getMaxScore(), input.getReceivedScore(), input.getStatus());
                return new Response(200, "TestInstance added successfully");
            } else {
                return new Response(400, input);
            }
        } else {
            return new Response(500, "Input can't be empty");
        }
    }
}
