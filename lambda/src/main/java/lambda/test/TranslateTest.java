package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import lambda.Translator;
import model.request.AuthenticatedRequest;
import model.test.Test;
import util.Response;

public class TranslateTest extends Handler<AuthenticatedRequest<Test>> {

    @Override
    public Response handleRequest(AuthenticatedRequest<Test> input, Context context) {
        if (!input.isRecruiter() || input.getUserId() != input.getBody().getRecruiterId()) {
            return new Response(403, "Recruiter permissions required");
        }
        Test test = input.getBody();
        Translator translator = new Translator(test);
        test = translator.translateTest();
        return new Response(200, test);
    }
}
